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
        update: false
    }
    // this.commentArea = React.createRef()
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
      console.log(this.state)
    })
  }

  // triggers child to refresh
  refreshComments = () => {
    this.setState({
        ...this.state, 
        update: !this.state.update
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
            
              // should use the ref commented out in the constructor
              // to update the comment area, but in react 15 this 
              // way makes more sense
              //   this.commentArea.current.getComments()
              self.refreshComments()
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
    try {
      const response = await axios.get(`/posts/${self.props.post.id}/delete`)
        .then(function(response) {
          console.log('post deleted: ' + response)
          self.props.update()
        })
    } catch (error) {
      console.log('error deleting post: ' + error)
    }
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
 
  like = () => {
    console.log('liked')
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
                        <div className="like-btn" onClick={this.like}>
                          <i className="fa fa-thumbs-up" />
                        </div>
                        {/* <div className="share-btn">
                          <i className="fa fa-share" />
                        </div> */}
                    </div>
                    <span className="text">Sarah Jane and 23 others liked this post.</span>
                    {this.getCommentCount()}
                    {/* <div className="comment-count">4 comments</div> */}
                </div>
                <div className="c-section">
                  <textarea name="comment" cols={30} rows={2} placeholder="write a comment..." value={this.state.comment} onChange={this.handleChange} onKeyUp={this.checkSubmit}/>
                </div>
                <div className="buttons">

                    {/* <Comments ref={this.commentArea} post={this.props.post} /> */}
                    <Comments post={this.props.post} update={this.state.update} sendUp={this.sendUp}/>

                    <div className="send-btn" onClick={this.submitComment}>
                        <i className="fa fa-arrow-right" />
                    </div>
                    
                </div>
            </div>
        )
    }
  }
}




