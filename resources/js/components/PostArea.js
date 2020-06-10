import React, { Component } from 'react'
import Post from '../components/Post'
import axios from 'axios'

export default class PostArea extends Component {
  constructor () {
    super()
    this.state = { 
      start: 0,
      last: false,
      posts: [],
      prevY: 0,
      showBtn: false,
      query: ""
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
      axios.get(`/posts/from/${self.state.start}`, {
        params: {
          q: self.state.query
        }
      })
      .then((res) => {
        // console.log(res)
        if (self._isMounted) {
          self.setState({
            posts: res.data
          })
          self._isFetching = false
        }
      })
    } catch (error) {
      console.log("error fetching next page: " + error)
    }

    // intersection observer setup
    var options = {
      root: document.querySelector("#scroll-this"),
      rootMargin: '0px 0px 200px 0px',
      threshold: 1.0
    }
    // make observer
    this.observer = new IntersectionObserver(
      this.handleObserver, //callback
      options
    )
    // observe the `loadingRef`
    if (this._isMounted && this.loadingRef.current) {
      this.observer.observe(this.loadingRef.current)
      // console.log('observing')
    }
  }

  // observer code to fetch more stuff
  handleObserver = (entities, observer) => {
    if (this.state.last) {return}

    const y = entities[0].boundingClientRect.y
    if (this.state.prevY > y) {
      // console.log('bottom')
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
      axios.get(`/posts/from/${self.state.posts.length}`, {
        params: {
          q: self.state.query
        }
      })
      .then((res) => {
        var isLast = (res.data.length == 0)
        if (self._isMounted) {
          self.setState({
            start: self.state.posts.length,
            last: isLast,
            posts: [...self.state.posts, ...res.data],
            showBtn: true
          })
          self._isFetching = false
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
    
    if (this.state.posts.length == 0) {
      return
    }
    
    this._isFetching = true
    try {
      axios.get(`/posts/new/${self.state.posts[0].id}`)
      .then((res) => {
        // console.log(res)
        let diff = res.data.length

        self._isMounted && self.setState({
          start: self.state.start + diff,
          posts: [...res.data, ...self.state.posts],
          // page: newPage
        })
        self._isFetching = false
      })
    } catch (error) {
      console.log("error fetching next page: " + error)
    }
  }

  // search for a query as user types
  updateQuery = (query) => {
    const self = this

    // if (this._isFetching && query != "") {              // rate limiting requests, but not if query is empty
    //   if (self.fetchDelay) {
    //     clearTimeout(self.fetchDelay)
    //     self.fetchDelay = null
    //     self.fetchDelay = setTimeout(() => {self.updateQuery(query)}, 500)
    //   }
    //   return
    // }
    this._isMounted && this.setState({query}, () => {
      self._isFetching = true
      try {
        axios.get(`/posts/from/0`, {
          params: {
            q: self.state.query
          }
        })
        .then((res) => {
          // console.log(res)
          if (self._isMounted) {
            self.setState({
              posts: res.data
            })
            // setTimeout(() => {self._isFetching = false}, 500)   // rate limiting fetch requests to every half second
          }
        })
      } catch (error) {
        console.log("error fetching next page: " + error)
      }
    })
    self._isFetching = false
  }

  // for when a post is deleted
  removePost = (id) => {
    let newPosts = this.state.posts.filter(post => {return post.id != id})
    let diff = newPosts.length - this.state.posts.length
    // let newTotal = this.state.total - 1
    // let newLast = Math.ceil(newTotal / this.state.perPage)
    this._isMounted && this.setState({
      // total: this.state.total - 1,
      // lastPage: newLast,
      start: this.state.start + diff,
      posts: newPosts
    })
  }

  // scroll to top
  scrollUp = () => {
    document.querySelector('#scroll-this').scrollTop = 0;
    // this.setState({showBtn: false})
  }

  // make sure posts have sa
  // uniqueId = () => {
  //   return (Math.random().toString(36) + '00000000000000000').slice(2, 10);
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
                <div className={`scrollUpBtn ${this.state.showBtn ? 'active' : ''}`} onClick={this.scrollUp}>top</div>
                {this.state.posts.map((post) => {
        
                    return <Post post={post} ws={this.props.ws} curuser={this.props.user} update={this.getNew} removePost={this.removePost} key={post.id}/>

                })}
                <div ref={this.loadingRef} style={{ height: '100px', margin: '30px', color: '#94c4d4'}} >
                  <span style={{ display: this._isFetching ? 'block' : 'none' }}>Loading...</span>
                </div>
              </div>
          </section>
      )
    }
  }
}




