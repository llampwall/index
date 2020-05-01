import React, { Component } from 'react'
import Post from '../components/Post'

export default class PostArea extends Component {
  constructor () {
    super()
    this.state = { 
      posts: []
    }
  }

  // componentDidMount() {
  //   this.setState({
  //     posts: this.props.posts
  //   })
  // }

  // must be async so it must be moved to componentwillmount or useeffect
  // also must be modified so it shows the posts of you and all of your friends
  // showLatestPostFeed() {
  //   const latestPosts = await Database
  //     .from('posts').where('user_id', auth.user.id).forPage(1,10)

  //   return (
  //     latestPosts.map((post, i) => {
  //       return <Post post={post} /> 
  //     })
  //   )
  // }

  showMyPosts = () => {
    // console.log(this.props.initialData.postData)
    return (
      this.props.initialData.postData.map((item) => {
        let post = item.posts
        let user = item.users
        return <Post post={post} user={user} key={post.id}/>
      })
    )
  }

  render () {
    if (this.props.initialData.userData == undefined) {
      return (
        <div>Loading...</div>
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




