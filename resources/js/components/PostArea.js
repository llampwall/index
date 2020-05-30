import React, { Component } from 'react'
import Post from '../components/Post'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'

export default class PostArea extends Component {
  constructor () {
    super()
    this.state = { 
      total: 0,
      perPage: 20,
      lastPage: 100,
      page: 1,
      posts: [],
      user: {id: 1, fname: 'Jordan', lname: 'Hewitt', profile_img: '/img/user.jpg', email: 'hewitj2@gmail.com', password: 'asdkajndajnd', login_source: 'register', info: '', token: '', created_at: '2020-05-26 21:22:04', updated_at: '2020-05-26 21:22:04'}
    }
    this._isMounted = false
  }

  componentDidMount() {
    const self = this
    this._isMounted = true
    try {
      axios.get(`/posts/page/1`)
      .then((res) => {
        if (self._isMounted) {
          self.setState({
            total: res.data.total,
            perPage: res.data.perPage,
            lastPage: res.data.lastPage,
            posts: res.data.data
          })
        }
      })
    } catch (error) {
      console.log("error fetching next page: " + error)
    }
  }
  
  componentWillUnmount() {
    this._isMounted = false
  }

  // fetch next page of results
  getNextPage = () => {
    const self = this
    // debugger;
    try {
      axios.get(`/posts/page/${this.state.page + 1}`)
      .then((res) => {
        self.setState({
          total: res.data.total,
          perPage: res.data.perPage,
          lastPage: res.data.lastPage,
          posts: this.state.posts.concat(res.data.data),
          page: this.state.page + 1
        })
      })
    } catch (error) {
      console.log("error fetching next page: " + error)
    }
  }

  // gets all new posts when someone else posts
  getNew = () => {
    const self = this
    // debugger;
    try {
      axios.get(`/posts/new/${this.state.posts[0].id}`)
      .then((res) => {
        self.setState({
          posts: res.data.data.concat(this.state.posts)
        })
      })
    } catch (error) {
      console.log("error fetching next page: " + error)
    }
  }

  showMyPosts = () => {
    // console.log(this.props.initialData.postData)
    if (this.state.posts.length > 0) {
      return (
        <InfiniteScroll
          dataLength={this.state.posts.length}
          next={this.getNextPage}
          hasMore={!(this.state.page == this.state.lastPage)}
          loader={<h4>Loading...</h4>}
          scrollableTarget={"scroll-this"}
          endMessage={<p><b>No more posts</b></p>}
        >
          {this.state.posts.map((post) => {
            
            // FIGURE THIS OUT
            // let user = item.users
            // const u_id = post.user_id
            // const user = await axios.get(`/api/user/${u_id}`)
            // console.log(userData)
  
            return <Post post={post} user={this.state.user} ws={this.props.ws} curuser={this.props.initialData.userData} update={this.props.update} key={post.id}/>
          })}
        </InfiniteScroll>
      )
    }
  }

  render () {
    if (this.state.user == undefined) {
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




