import React, { Component} from 'react'
import Comments from "./Comments"
import axios from 'axios'

export default class Post extends Component {
  constructor () {
    super()
    this.state = { 
        post: {},
        poster: {}, 
        comment: "",
        numComments: 0,
        update: false,
        liked: false, 
        likes: 0,
        lastLike: ""
    }
    this.commentArea = React.createRef()  // ref for updating comments
  }


  componentDidMount() {
    this.getLikes()
  }

  displayMedia = () => {
    if (this.props.post.type == 'image') {
        return (
            <div className="post-media" style={{
                backgroundImage: `url("${this.props.post.image_url}")`, 
                backgroundPosition: 'center center', 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover'}}>
            </div>
        )
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
                comment: ""
              })
            
              self.commentArea.current.getComments()
              return 'comment saved'
            })
          } catch (error) {
            console.log("axios didnt work: " + error)
          }
      }
  }

  // this lets us get the comments from the child
  sendUp = (num) => {
    this.setState({
      ...this.state,
      numComments: num
    })
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
      await axios.get(`/posts/${self.props.post.id}/delete`)
        .then(function(response) {
          console.log('post deleted: ' + response)
          self.props.update()
        })
    } catch (error) {
      console.log('error deleting post: ' + error)
    }
    console.log('post deleted')
    self.props.update()
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
    this.setState({
      ...this.state,
      liked: !this.state.liked
    })
    this.getLikes()
  }


  // get the like stats
  getLikes = async () => {
    const self = this;
    try {
      const likes = await axios.get(`/posts/${self.props.post.id}/likes`)
      .then(function(response) {
        // console.log(response.data.likeData)
        const like_d = response.data.likeData
        if (like_d.length > 0) {
          self.setState({
            ...self.state,
            likes: like_d.length,
            lastLike: `${like_d[0].users.fname} ${like_d[0].users.lname}`
          }, () => {
            // console.log(self.state)
          })
        } else {
          self.setState({
            ...self.state,
            likes: 0,
            lastLike: ""
          }, () => {
            // console.log(self.state)
          })
        }
      })
      
    } catch (error) {
      console.log("error getting likes: " + error)
    }
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



  render () {

    if (this.props.post == undefined || this.props.curuser == undefined) {
        return (
            <div>Loading...</div>
        )
    } else {
      // console.log("current user: " + this.props.curuser)
      // console.log("posted by " + this.props.user.id)
        return (
            <div className="post">
                <div className="post-header">
                    <a href={`/profile/${this.props.user.id}`} className="author">
                        <div className="user-img" style={{
                        backgroundImage: `url("${this.props.user.profile_img}")`, 
                        backgroundPosition: 'center center', 
                        backgroundRepeat: 'no-repeat', 
                        backgroundSize: 'cover'}} />
                        <div className="username">{this.props.user.fname} {this.props.user.lname}</div>
                        <span className="text">shared {(this.props.post.type == 'image') ? 'an image' : 'something'}</span>
                    </a>
                    <div className="time">{new Date(this.props.post.created_at).toLocaleString()}</div>
                    <div className={`del-btn ${this.props.user.id == this.props.curuser.id ? 'active' : ''}`} onClick={this.deletePost}><i className="fa fa-trash"></i></div>
                </div>

                {this.displayMedia()}
                <div className="post-info">
                    {/* <h3 className="title">How to Become a Web Developer in 2020</h3> */}
                    <p>{this.props.post.content}</p>
                </div>
                <div className="post-stats">
                    <div className="icons">
                        <div className={`like-btn ${this.state.liked ? 'active' : ''}`}  onClick={this.like.bind(null, this.props.curuser.id, this.props.post.id)}>
                          <i className="fa fa-thumbs-up" />
                        </div>
                        {/* <div className="share-btn">
                          <i className="fa fa-share" />
                        </div> */}
                    </div>
                    <span className="text">{this.displayStats()}</span>
                    {this.getCommentCount()}
                </div>
                <div className="c-section">
                  <textarea name="comment" cols={30} rows={2} placeholder="write a comment..." value={this.state.comment} onChange={this.handleChange} onKeyUp={this.checkSubmit}/>
                </div>
                <div className="buttons">

                    <Comments ref={this.commentArea} post={this.props.post} update={this.state.update} sendUp={this.sendUp} curuser={this.props.curuser}/>

                    <div className="send-btn" onClick={this.submitComment}>
                        <i className="fa fa-arrow-right" />
                    </div>
                    
                </div>
            </div>
        )
    }
  }
}




