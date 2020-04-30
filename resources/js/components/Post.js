import React, { Component} from 'react'

export default class Post extends Component {
  constructor () {
    super()
    this.state = { 
    }
  }

  render () {
    return (
        <div className="post">
            <div className="post-header">
                <div className="author">
                    <div className="user-img" style={{background: `url("${this.props.user.profile_img}")`, backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} />
                    <a href="#" className="username">{this.props.user.fname} {this.props.user.lname}</a>
                    <span className="text">shared an article</span>
                </div>
                <div className="time">43 min</div>
            </div>
            <div className="post-media">
                <img src="img/webdesign.jpg" />
            </div>
            <div className="post-info">
                <h3 className="title">How to Become a Web Developer in 2020</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit accusantium vero impedit, dolor earum error doloribus delectus deleniti rerum quis, voluptas debitis nesciunt perspiciatis voluptatibus ipsum sapiente necessitatibus laboriosam amet.</p>
            </div>
            <div className="post-stats">
                <div className="icons">
                    <i className="fa fa-grin-alt" />
                    <i className="fa fa-thumbs-up" />
                </div>
                <span className="text">Sarah Jane and 23 others liked this post.</span>
                <div className="comment-count">4 comments</div>
            </div>
            <textarea name="comment" cols={30} rows={2} placeholder="write a comment..." defaultValue={""} />
            <div className="buttons">
                <div className="send-btn">
                    <i className="fa fa-arrow-right" />
                </div>
                <div className="share-btn">
                    <i className="fa fa-share" />
                </div>
                <div className="like-btn">
                    <i className="fa fa-thumbs-up" />
                </div>
            </div>
        </div>
    )
  }
}




