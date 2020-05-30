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
      posts: []
    }
    this._isMounted = false
    this._isFetching = false
  }

  componentDidMount() {
    const self = this
    this._isMounted = true
    this._isFetching = true
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
          this._isFetching = false
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

    this._isFetching = true
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
        this._isFetching = false
      })
    } catch (error) {
      console.log("error fetching next page: " + error)
    }
  }

  // gets all new posts when someone else posts
  getNew = () => {
    const self = this

    if (this._isFetching) {     // deal with race condition
      return
    }
    
    this._isFetching = true
    try {
      axios.get(`/posts/new/${this.state.posts[0].id}`)
      .then((res) => {
        console.log(res.data)
        let diff = res.data.length
        let newTotal = this.state.total + diff
        let newLast = Math.ceil(newTotal / this.state.perPage)
        let newPage = Math.round(diff / this.state.perPage) + this.state.page

        self.setState({
          total: newTotal,
          lastPage: newLast,
          posts: res.data.concat(this.state.posts),
          page: newPage
        })
        this._isFetching = false
      })
    } catch (error) {
      console.log("error fetching next page: " + error)
    }
  }

  // trackPos = () => {
  //   var dy = document.getElementById("scroll-this").scrollTop
  //   var total = document.getElementById("scroll-this").scrollHeight
  //   var visible = document.getElementById("scroll-this").clientHeight
  //   var page = Math.ceil()
  //   console.log(postNum)
  //   // var newPage = 
  // }

  showMyPosts = () => {
    if (this.state.posts.length > 0) {
      return (
        <InfiniteScroll
          dataLength={this.state.posts.length}
          next={this.getNextPage}
          hasMore={!(this.state.page == this.state.lastPage)}
          loader={<h4>Loading...</h4>}
          scrollableTarget={"scroll-this"}
          endMessage={<p><b>No more posts</b></p>}
          pullDownToRefresh
          refreshFunction={this.getNew}
        >
          {this.state.posts.map((post) => {
  
            return <Post post={post} ws={this.props.ws} curuser={this.props.user} update={this.getNew} key={post.id}/>

          })}
        </InfiniteScroll>
      )
    }
  }

  render () {
    if (this.state.posts == undefined) {
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




