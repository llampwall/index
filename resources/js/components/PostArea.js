import React, { Component } from 'react'
import Post from '../components/Post'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'

export default class PostArea extends Component {
  constructor () {
    super()
    this._isMounted = false;
    this.state = { 
      total: 0,
      perPage: 10,
      lastPage: 100,
      page: 1,
      posts: [],
      user: {id: 1, fname: 'Jordan', lname: 'Hewitt', profile_img: '/img/user.jpg', email: 'hewitj2@gmail.com', password: 'asdkajndajnd', login_source: 'register', info: '', token: '', created_at: '2020-05-26 21:22:04', updated_at: '2020-05-26 21:22:04'}
    }
  }

  componentDidMount = () => {
    this._isMounted = true;
    try {
      axios.get(`/posts/page/1`)
      .then((res) => {
        this.setState({
          posts: res.data
        })
      })
    } catch (error) {
      console.log("error fetching next page: " + error)
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // fetch next page of results
  getNextPage = () => {
    if(this._isMounted) {
      this.setState({
        page: this.state.page + 1
      })

      try {
        axios.get(`/posts/page/${this.state.page}`)
          .then((res) => {
            console.log(posts)
            this.setState({
              total: res.total,
              perPage: res.perPage,
              lastPage: res.lastPage,
              posts: this.state.posts.concat(res.data)
            })
          })
      } catch (error) {
        console.log("error fetching next page: " + error)
      }
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
          scrollableTarget={"all-posts"}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b>No more posts</b>
            </p>
          }
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




