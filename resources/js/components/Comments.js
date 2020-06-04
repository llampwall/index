import React, { Component} from 'react'
import axios from 'axios'

export default class Comments extends Component {
  constructor () {
    super()
    this.state = { 
        comments: []
    }
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    this._isMounted && this.getComments()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getComments = async function() {
    const self = this;
    try {

      const comments = await axios.get(`/posts/${self.props.post.id}/comments`)

      if(this._isMounted) {
        self.setState({
          comments: comments.data.commentData
        })
      }
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

        //update everyone else's comments
        self.props.deleteComment()
    } catch (error) {
      console.log('error deleting comment: ' + error)
    }
  }

  // only show for logged in user
  showDelBtn = (user, id) => {
    if (user.id == this.props.curuser.id) {
      return (
        <div className={`del-btn active`} onClick={this.deleteComment.bind(null, id)}><i className="ayn-trash"></i></div>
      )
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
                  {this.showDelBtn(user, id)}
                </div>
            )}
        )
    )
  }

  render() {
    if (this.props.post == undefined) {
        return (
          <div className='load'>
            <i className="ayn-spin3" />
          </div>
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