import React, { Component } from 'react'
import axios from 'axios'
import PostArea from './PostArea'
import Compose from './Compose'
import Post from './Post'
import { throttle } from 'lodash';
import { toast } from 'react-toastify';

// Handles updating the postarea when its sibling compose adds a post to the database

export default class Home extends Component {
  constructor () {
    super()
    this.state = {
    }

    this.postAreaRef = React.createRef()
    this._isMounted = false
  }

  componentDidMount() {
    const self = this
    this._isMounted = true

    if (this.props.single) {
      this.getPost()
    }

    this.chat = this.props.ws.getSubscription('chat') || this.props.ws.subscribe('chat')
    this.chat.on('delete', function(message) {
      console.log('someone deleted post ' + message) 
      self.postAreaRef.current && self.postAreaRef.current.removePost(message)
    })
    this.chat.on('update', throttle(function(message) {                       // throttled 3 seconds
      console.log('new post')
      // toast.info(self.displayMsg(message), {
      //   toastId: new Date().getTime()
      // })
      self.postAreaRef.current && self.postAreaRef.current.getNew()
    }, 2000))
  }

  displayMsg = (message, closeToast) => {
    console.log(message.from.fname + " " + message.from.lname + " made a new post!")
    const self = this
    return (
      <div className="toast-body-custom">
        <div className="msg">
          <span className="msg-usr">{`${message.from.fname}${message.from.lname ? " " + message.from.lname : ""} `}</span>
          <span className="msg-body">made a new post!</span>
        </div>
        <div className="buttons">
          <button className="go" onClick={this.msgClick.bind(null, message)}>Go <i className="ayn-right"></i></button>
          {/* <button className="close" onClick={closeToast}>Close</button> */}
        </div>
      </div>
    )
  }

  msgClick = () => {
    console.log('click')
  }

  // if this is a single post page, get the data for the post and the poster
  getPost = async () => {
    const p_id = this.props.routeProps.match.params.id
    const postData = await axios.get(`/posts/${p_id}`)
    // console.log(postData)

    this._isMounted && this.setState({
      post: postData.data[0]
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }


  // pass down function to pass down to compose so it can update the whole area
  // update = () => {
  //   this.postAreaRef.current.getNew()
  // }

  search = (query) => {
    this.postAreaRef.current && this.postAreaRef.current.updateQuery(query)
  }

  render () {
    if (this.props.user == undefined) {
      return (
        <div class='load'>
          <i className="ayn-spin3" />
        </div>
      )
    } else {
      
      if (this.props.single && (this.state.post != undefined)) {
        return (
          <div className="content-area">
            <video className="bg-video" loop muted autoPlay playsInline>
              <source src="/img/tronloop1080.mp4" type='video/mp4'/>
            </video>
            <section id="all-posts">
                <div className="post-container">
                  <Post post={this.state.post} ws={this.props.ws} curuser={this.props.user} update={this.update}/>
                </div>
            </section>
          </div>
        )
      } else {
        return (
          <div className="content-area" id="scroll-this">

              <video className="bg-video" loop muted autoPlay playsInline>
                <source src="/img/tronloop1080.mp4" type='video/mp4'/>
              </video>
            
              <Compose user={this.props.user} ws={this.props.ws}/>
              <PostArea routeProps={this.props.routeProps} user={this.props.user} ws={this.props.ws} ref={this.postAreaRef}/>
  
          </div>
        )
      }
    }
  }
}