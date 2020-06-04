import React, { Component} from 'react'
import Comments from "./Comments"
import axios from 'axios'
import Modal from './Modal'

export default class Post extends Component {
  constructor () {
    super()
    this.state = { 
        post: {},
        user: {}, 
        comment: "",
        numComments: 0,
        liked: false, 
        likes: 0,
        lastLike: "",
        link: false,
        showModal: false,
        height: 0
    }
    
    this.commentArea = React.createRef()  // ref for updating comments
    this._isMounted = false
  }


  componentDidMount() {
    const self = this

    this._isMounted = true

    this._isMounted && this.getPoster()
    this._isMounted && this.getLikes()

    if (this._isMounted && this.props.post.link_url != '') {
      this.setState({
        link: true
      })
    }

    // chat setup
    this.chat = this.props.ws.getSubscription('chat') || this.props.ws.subscribe('chat')
    // update comments whenever someone comments
    this.chat.on('comments', function() {
      console.log('new comment')
      if (self.commentArea.current) {
        self.commentArea.current.getComments()
      }
    })
    this.chat.on('likes', function() {
      console.log('new likes')
      self.getLikes()
    })

    // get height for lazy loading
    const height = this.getHeight()
    this._isMounted && this.setState({ height })
  }

  getHeight = () => {
    var height = 192
    if ( (window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) ) {
      if (this.props.post.content != " ") {
        height += 40
      }
      if (this.props.post.link_url != '') {
        height += 100
      }
      if (this.props.post.type != "text") {
        height += 250
      }
      height += (this.state.numComments * 28)
    } else {
      if (this.props.post.content != " ") {
        height += 52
      }
      if (this.props.post.link_url != '') {
        height += 100
      }
      if (this.props.post.type != "text") {
        height += 400
      }
      height += (this.state.numComments * 41)
    }
    return height
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  // get the user data for the person who posted this post
  getPoster = async () => {
    let user = ''
    try {
      user = await axios.get(`/api/user/${this.props.post.user_id}`)
      // console.log(user)
    } catch(error) {
      console.log(error)
    }

    if (this._isMounted) {
      this.setState({
        user: user.data[0],
      })
    }
  }

  displayMedia = () => {
    if (this.props.post.type == 'image') {
        return (
            <div className="post-media" onClick={() => {this.setState({showModal: true})}} style={{
                backgroundImage: `url("${this.props.post.image_url}")`, 
                backgroundPosition: 'center center', 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover'}}>
            </div>
        )
    } else if (this.props.post.type == 'video') {
        return (
            <video className="post-media" controls muted autoPlay playsInline>
              <source src={this.props.post.image_url} type='video/mp4'/>
              Your browser does not support html5 videos.
            </video>
        )
    } else {
      return null
    }
  }

  // dont really need this because we are just lying and saying its mp4 anyway
  // because it wont work on chrome if we call it a quicktime file
  getFileType = (filename) => {
    let ext = filename.split('.').pop();
    if (ext == 'mov' || ext == 'MOV') {
      return 'video/quicktime'
    }
    if (ext == 'mp4') {
      return 'video/mp4'
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = (event.target.type == 'checkbox') ? event.target.checked : event.target.value

    this.setState({
      [name]: value
    }, () => {
      // console.log(this.state)
    })
  }

  submitComment = async () => {
      const self = this
      if (this.state.comment.length > 0) {
          try {
            const response = await axios.post('/comments', {
              post_id: self.props.post.id,
              user_id: self.props.curuser.id,
              content: self.state.comment
            }).then (function(response) {
              self.setState({
                ...self.state,
                comment: "",
                height: self.state.height + 35
              })

              //update everyone else's comments
              self.chat.emit('message', {
                comments: 'all'
              })
            
              self.commentArea.current.getComments()
              return 'comment saved'
            })
          } catch (error) {
            console.log("axios didnt work: " + error)
          }
      }
  }

  // fix to avoid double submits on mobile
  touchSubmitComment = (event) => {
    // event.preventDefault()
    event.stopPropagation()
    this.submitComment()
  }

  // this lets us get the comments from the child
  sendUp = (num) => {
    if (this._isMounted) {
      this.setState({
        numComments: num
      })
    }
  }

  // allows comments to be submitted with the enter key
  checkSubmit = (event) => {

    if (event.keyCode == 13) {
      event.preventDefault()
      this.submitComment()
    }
  }

  // delete the post only if you posted it
  deletePost = async () => {
    const self = this
    // console.log("post id: " + self.props.post.id)
    try {
      let deleted = await axios.get(`/posts/${self.props.post.id}/delete`)
        .then(function(response) {
          console.log(response)
          // self.props.removePost(self.props.post.id)
          // //update everyone else's comments
          // self.chat.emit('message', {
          //   delete: self.props.post.id
          // })
        })
    } catch (error) {
      console.log('error deleting post: ' + error)
    }
    self.props.removePost(self.props.post.id)
    //update everyone else's comments
    self.chat.emit('message', {
      delete: self.props.post.id
    })
}


  // displays the current post comments
  getCommentCount = () => {
    if (this.state.numComments == 0) {
      return (
        <div className="comment-count"></div>
      )
    } else {
      return (
        <div className="comment-count">{this.state.numComments} comments</div>
      )
    }
  }
 
  // like or unlike a post
  like = async (u_id, p_id) => {
    const self = this
    if (!this.state.liked) {
      try {
        await axios.post('/likes', {
          user_id: u_id,
          post_id: p_id
        }).then(function() {
          console.log('post liked')
        })
      } catch (error) {
        console.log("error liking post: " + error)
      }
    } else {
      try {
        await axios.post('/likes/delete', {
          user_id: u_id,
          post_id: p_id
        })
      } catch (error) {
        console.log("error liking post: " + error)
      }
    }
    // this.setState({
    //   ...this.state,
    //   liked: !this.state.liked
    // })
    this.getLikes()
    //update everyone elses feed
    self.chat.emit('message', {
      likes: 'all'
    })
  }


  // get the like stats
  getLikes = async () => {
    const self = this;
    try {
      axios.get(`/posts/${self.props.post.id}/likes`)
      .then(function(response) {
        // console.log(response.data.likeData)
        const like_d = response.data.likeData
        const numLikes = like_d.length
        let last = ""
        let newLiked
        if (like_d.length > 0) {
          newLiked = (like_d.filter(item => item.users.id == self.props.curuser.id)).length > 0
          // console.log(like_d[0].users)
          last = (like_d[0].users.id == self.props.curuser.id) ? "You" : `${like_d[0].users.fname} ${like_d[0].users.lname}`
        }

        if (self._isMounted) {
          self.setState({
            likes: numLikes,
            lastLike: last,
            liked: newLiked
          })
        }
      })
      
    } catch (error) {
      console.log("error getting likes: " + error)
    }
  }

  deleteComment = () => {
    // console.log('deleting comment')
    this.chat.emit('message', {
      comments: 'all'
    })
  }


  // display the post stats
  displayStats = () => {
    
    if (this.state.liked) {
      if (this.state.likes > 2) {
        return `You and ${this.state.likes - 1} other people like this.`
      } else if (this.state.likes == 2) {
        return `You and 1 other person like this.`
      } else {
        return `You like this.`
      }
    } else {
      if (this.state.likes > 2) {
        return `${this.state.lastLike} and ${this.state.likes - 1} other people like this.`
      } else if (this.state.likes == 2) {
        return `${this.state.lastLike} and 1 other person like this.`
      } else if (this.state.likes == 1) {
        return `${this.state.lastLike} likes this.`
      } else {
        return `Be the first to like this.`
      }
    }
  }

  getType = () => {
    if (this.props.post.type == 'image') {
      return 'an image'
    } else if (this.props.post.type == 'video') {
      return 'a video'
    }
    else {
      return 'something'
    }
  }

  // display link area if there is a link
  displayLink = () => {
    if (!this.state.link) {
      return
    }
    return (
      <a href={this.props.post.link_url} target="_blank" alt="external link" className='post-link'>
        <div className='link-image'>
          <img src={this.props.post.link_img} alt="no image"/>
        </div>
        <div className='link-info'>
          <div className='link-title'>
            <h2>{this.props.post.link_title}</h2>
          </div>
          <div className='link-desc'>
            <h5>{this.props.post.link_desc}</h5>
          </div>
        </div> 
      </a>
    )
  }

  showPostInfo = () => {
    if (this.props.post.content.length == 0 || this.props.post.content == " ") {
      return
    } else {
      return (
        <div className="post-info">
            <p>{this.props.post.content}</p>
        </div>
      )
    }
  }

  render () {

    if (this.props.post == undefined || this.props.curuser == undefined) {
        return (
          <div className='load'>
            <i className="ayn-spin3" />
          </div>
        )
    } else {
      // console.log("current user: " + this.props.curuser)
      // console.log("posted by " + this.props.user.id)
        return (
            <div className="post" >
                <div className="post-header">
                    <a href={`/profile/${this.state.user.id}`} className="author">
                        <div className="user-img" style={{
                        backgroundImage: `url("${this.state.user.profile_img}")`, 
                        backgroundPosition: 'center center', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundSize: 'cover'}} />
                        <div className="username">{this.state.user.fname} {this.state.user.lname}</div>
                    </a>

                    <a href={`/post/${this.props.post.id}`} className="text">shared {this.getType()} <i className="ayn-link"></i></a>
                      
                    <div className="time">{new Date(this.props.post.created_at).toLocaleString()}</div>
                    <div className={`del-btn ${this.state.user.id == this.props.curuser.id ? 'active' : ''}`} onClick={this.deletePost}><i className="ayn-trash"></i></div>
                </div>

                {this.displayMedia()}
                {this.displayLink()}

                <Modal show={this.state.showModal} onClose={() => {this.setState({showModal: false})}}>
                  <img src={this.props.post.image_url} />
                </Modal>

                {this.showPostInfo()}
                
                <div className="post-stats">
                    <div className="icons">
                        <div className={`like-btn ${this.state.liked ? 'active' : ''}`}  onClick={this.like.bind(null, this.props.curuser.id, this.props.post.id)}>
                          <i className="ayn-thumbs-up-1" />
                        </div>
                        {/* <div className="share-btn">
                          <i className="ayn-share" />
                        </div> */}
                    </div>
                    <span className="text">{this.displayStats()}</span>
                    {this.getCommentCount()}
                </div>
                <div className="c-section">
                  <textarea name="comment" cols={30} rows={2} placeholder="write a comment..." value={this.state.comment} onChange={this.handleChange} onKeyUp={this.checkSubmit}/>
                </div>
                <div className="buttons">

                    <Comments ref={this.commentArea} post={this.props.post} sendUp={this.sendUp} deleteComment={this.deleteComment} curuser={this.props.curuser}/>

                    <div className="send-btn" onClick={this.submitComment}>
                        <i className="ayn-right" />
                    </div>
                    
                </div>
            </div>

        )
    }
  }
}


{/* <div className="send-btn" onTouchStart={this.touchSubmitComment.bind(null, {passive: false})} onMouseUp={this.submitComment}></div> */}