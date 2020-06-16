import React, { Component } from 'react'
import axios from 'axios'
import { Transition } from 'react-transition-group';
import Post from '../components/Post'


export default class Profile extends Component {
  constructor () {
    super()
    this.state = {
      user: "",
      edit: false,
      image: "",
      posts: []
    }
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    this._isMounted && this.getUser()
      .then(() => this.getPosts())
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getUser = async () => {
    const { match, history, location } = this.props.routeProps
    const self = this;
    let user = ''
    try {
      user = await axios.get(`/api/user/${match.params.id}`)
      // console.log(user)
    } catch(error) {
      console.log(error)
    }

    var image = user.data[0].profile_img
    if (image.slice(-6) == 'normal') {
      image = image.replace('normal', 'large')
    }

    this._isMounted && this.setState({
      ...this.state,
      user: user.data[0],
      image: image
    }, () => {
      // console.log(this.state)
    })
  }
  
  editBio = () => {
    this._isMounted && this.setState({
      ...this.state,
      edit: true
    }, () => {
      // console.log(this.state)
    })
  }

  // fetch latest posts
  getPosts = () => {
      const self = this
      try {
        axios.get(`/posts/user/${this.state.user.id}`)
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
  }

  // value={this.state.comment} onChange={this.handleChange} onKeyUp={this.checkSubmit}

  displayBio = () => {
    if (this.state.user == undefined) {
      return <div>bio loading...</div>
    } else {

      //   // console.log(this.state.user)
      //   if (this.state.user.info == "") {
      //     return (
      //       <div className="bio">
      //         <textarea className={`bio-text ${this.state.edit ? 'active' : ''} `} ></textarea>
      //         <div className='bio-btn' onClick={this.editBio}> Add a bio </div>
      //       </div>
      //     )
      //   } else {
      //     return (
      //       <p>{this.state.user.info}</p>
      //     )
      //   }
      // }
      return
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
      // home
      // job
      // education
      // website
      // email
      // about
      // phone?
      // music
      // resume?
      
      return (
        <div className="content-area profile-page">
          <video className="bg-video" loop muted autoPlay playsInline>
            <source src="/img/tronloop1080.mp4" type='video/mp4'/>
          </video>
          <div className='cover'>
            <div className="user-img">
              <img src={this.state.image} />
              <div className="follow-btn">follow <i className='ayn-bell'></i></div>
              <div className='lower-5th'>
                <h1>{this.state.user.fname} {this.state.user.lname}</h1>
              </div>
            </div>
          </div>
          <div className="lower-half">
            <div className="info">
              <ul>
                <li><span>30</span></li>
                <li><span>Web Developer</span></li>
                <li><span>Los Angeles</span></li>
              </ul>
              <ul>
                <li><a href="#"><i className='ayn-mail-1'></i> email</a></li>
                <li><a href="#"><i className='ayn-globe'></i> website</a></li>
                <li><a href="#"><i className='ayn-facebook-official'></i> facebook</a></li>
                <li><a href="#"><i className='ayn-instagram'></i> instagram</a></li>
                <li><a href="#"><i className='ayn-linkedin'></i> linkedin</a></li>
              </ul>
            </div>
            <section id="all-posts">
              <h2 className="posts-title">[ recent posts ]</h2>
              <div className="post-container">
                {this.state.posts.map((post) => {
      
                    return <Post post={post} ws={this.props.ws} curuser={this.props.user} update={this.getNew} removePost={this.removePost} key={post.id}/>

                })}
              </div>
          </section>
          </div>
        </div>
      )
    }
  }
}