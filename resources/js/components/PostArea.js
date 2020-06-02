import React, { Component } from 'react'
import Post from '../components/Post'
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
      prevY: 0
    }
    this._isMounted = false
    this._isFetching = false
    this.loadingRef = React.createRef()
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

    // intersection observer setup
    var options = {
      root: document.querySelector("#scroll-this"),
      rootMargin: '0px',
      threshold: 1.0
    }
    // make observer
    this.observer = new IntersectionObserver(
      this.handleObserver, //callback
      options
    )
    // observe the `loadingRef`
    if (this.loadingRef.current) {
      this.observer.observe(this.loadingRef.current)
      console.log('observing')
    }
  }

  // observer code to fetch more stuff
  handleObserver = (entities, observer) => {
    if (this.state.page == this.state.lastPage) {
      return
    }
    const y = entities[0].boundingClientRect.y
    if (this.state.prevY > y) {
      console.log('bottom')
      this.getNextPage()
    }
    this._isMounted && this.setState({ prevY: y })
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
        if (self._isMounted) {
          self.setState({
            total: res.data.total,
            perPage: res.data.perPage,
            lastPage: res.data.lastPage,
            posts: [...this.state.posts, ...res.data.data],
            page: this.state.page + 1
          })
          this._isFetching = false
        }
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
          posts: [...res.data, ...this.state.posts],
          page: newPage
        })
        this._isFetching = false
      })
    } catch (error) {
      console.log("error fetching next page: " + error)
    }
  }

  // showMyPosts = () => {
  //   if (this.state.posts.length > 0) {
  //     return (
  //       <div className="post-container">
  //         {this.state.posts.map((post) => {
  
  //             return <Post post={post} ws={this.props.ws} curuser={this.props.user} update={this.getNew} key={post.id}/>

  //         })}
  //         <div ref={this.loadingRef} style={{ height: '100px', margin: '30px'}} >
  //           <span style={{ display: this._isFetching  ? 'block' : 'none' }}>Loading...</span>
  //         </div>
  //       </div>
  //     )
  //   }
  // }

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
                {this.state.posts.map((post) => {
        
                    return <Post post={post} ws={this.props.ws} curuser={this.props.user} update={this.getNew} key={post.id}/>

                })}
                <div ref={this.loadingRef} style={{ height: '100px', margin: '30px', color: '#94c4d4'}} >
                  <span style={{ display: this._isFetching ? 'block' : 'none' }}>
                    {this.state.page != this.state.lastPage ? 'Loading...' : 'No more posts!' }</span>
                </div>
              </div>
          </section>
      )
    }
  }
}




