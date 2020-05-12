import React, { Component } from 'react'
import Post from '../components/Post'

export default class PostArea extends Component {
  constructor () {
    super()
    this.state = { 
      posts: []
    }
  }

  showMyPosts = () => {
    // console.log(this.props.initialData.postData)
    return (
      this.props.initialData.postData.map((item) => {
        let post = item.posts
        let user = item.users
        return <Post post={post} user={user} curuser={this.props.initialData.userData} update={this.props.update} key={post.id}/>
      })
    )
  }

  render () {
    if (this.props.initialData.userData == undefined) {
      return (
        <div className='load'>
          <i className="ayn-spin3" />
        </div>
      )
    } else {
      return (
          <section id="all-posts">
                <div className="post-container">
                    {this.showMyPosts()}
                </div>
          </section>
      )
    }
  }
}




