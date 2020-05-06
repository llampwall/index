import React, { Component} from 'react'
import axios from 'axios'

export default class Comments extends Component {
  constructor () {
    super()
    this.state = { 
        comments: []
    }
  }

  // this wont work in react 16, but i didn't feel like upgrading
  componentWillReceiveProps(props) {
    const {post, update} = this.props
    if (props.update !== update) {
      this.getComments()
    }
  }

  componentDidMount() {
    this.getComments()
  }

  getComments = async function() {
    const self = this;
    // console.log(this.props)
    try {

      const comments = await axios.get(`/posts/${self.props.post.id}/comments`)
    //   console.log(comments.data.commentData)

      self.setState({
        comments: comments.data.commentData
      }, () => {
      //   console.log(self.state)
      })
    } catch (error) {
      console.log("Initialization error: " + error)
    }
    
    this.props.sendUp(this.state.comments.length)
  }

  // delete the comment only if you posted it
  deleteComment = async (id) => {
    const self = this
    console.log("comment id: " + id)
    try {
      await axios.get(`/comments/${id}/delete`)
        .then(function(response) {
          console.log('comment deleted: ' + response)
          self.getComments()
        })
    } catch (error) {
      console.log('error deleting comment: ' + error)
    }
  }


  showComments = () => {
    return (
        this.state.comments.map((item) => {
            let comment = item.comments
            let user = item.users
            let id = comment.id
            return (
                <div className='single-comment' key={id}>
                  <a href={`/profile/${user.id}`} className='user'>
                    <div className='comment-pic' style={{
                          backgroundImage: `url("${user.profile_img}")`, 
                          backgroundPosition: 'center center', 
                          backgroundRepeat: 'no-repeat', 
                          backgroundSize: 'cover'}}>
                    </div>
                    <h2>{`${user.fname}${(user.lname == null) ? "" : " "}${(user.lname == null) ? "" : user.lname}: `}</h2>
                  </a>
                  <p>{comment.content}</p>
                  <div className={`del-btn ${user.id == this.props.curuser.id ? 'active' : ''}`} onClick={this.deleteComment.bind(null, id)}><i className="fa fa-trash"></i></div>
                </div>
            )}
        )
    )
  }

  render() {
    if (this.props.post == undefined) {
        return (
            <div>Loading...</div>
        )
    } else {
        if (this.state.comments.length > 0) {
            return (
              <div className="comments"> 
                  {this.showComments()}
              </div>
            )
        } else {
            return null
        }
    }
  }

}