import React, { Component} from 'react'
import axois from 'axios'
import ChatWindow from './ChatWindow'
import Ws from '@adonisjs/websocket-client'

export default class Messenger extends Component {
  constructor () {
    super()
    this.state = { 
      users: [],
      open: false, 
      connected: false,
      chatUser: null
    }

    this.ws = Ws()
    this.chat = null
    this.chatRef = React.createRef()
  }

  // check if user is on mobile and connect to chat
  componentDidMount() {
    this.populate()
    if (window.innerWidth > 1200) {
      this.setState({
        ...this.state,
        open: true
      })
    }

    this.startChat()
  }

  //open messenger sidebar
  clickedOpen = () => {
    this.setState({
      ...this.state,
      open: !this.state.open
    })
  }

  // connect and configure websocket client
  startChat = () => {
    // connect to main chat
    this.ws.connect()
    this.chat = this.ws.subscribe('chat')

    // send login
    this.chat.on('ready', () => {
      this.setState({
        ...this.state,
        connected: true
      })
      console.log('connected')
    })

    this.chat.on('error', (error) => {
      console.log(error)
    })
    
    this.chat.on('close', () => {
      this.setState({
        ...this.state,
        connected: false
      })
      console.log('disconnected')
    })

    this.chat.on('message', function(message) {
      console.log(message)
    })
    // console.log(this.ws)
  }

  
  // open chat window / switch to a different one
  openChat = (user) => {
    this.setState({
      ...this.state,
      chatUser: user
    })
    this.chatRef.current.switchUser(user)
  }


  // instantiate chatwindow
  displayChat = () => {
    if (this.state.chatUser != null) {
      return (
        <ChatWindow ref={this.chatRef} chat={this.chat} to={this.state.chatUser} from={this.props.initialData.userData}></ChatWindow>
      )
    }
  }

  // fill messenger sidebar with users
  // fix to be only online users
  populate = async () => {
    const self = this
    try {
      const allUsers = await axois.get('/api/users')
      // console.log("users: ")
      // console.log(allUsers)
      self.setState({
        users: allUsers.data
      })
    } catch(error) {
      console.log("error fetching users: " + error)
    }
  }

  // render online users
  displayUsers = () => {
    if (this.state.users == undefined) {
      return (
        <div className='load'>
          <i className="ayn-spin3" />
        </div>
      )
    } else {
      return (
        this.state.users.map((user) => {
          return (
            <div className="user" key={user.id} onClick={this.openChat.bind(null, user)}>
              <div className="user-img" style={{
                backgroundImage: `url("${user.profile_img}")`, 
                backgroundPosition: 'center center', 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover'}} />
              <div className="username">
                {user.fname} {user.lname}
              </div>
              <div className="message-icon">
                <i className="ayn-comment-1" />
              </div>
            </div>
          )
        })
      )
    }
  }


  render () {
    if (this.state.users == undefined) {
      this.populate()
    }
    return (
      <section id="messenger" className={this.state.open ? "open" : "closed"}>
        <div className="messenger-header">
          <div className="messenger-icon">
            {/* <i className="ayn-paper-plane" /> */}
            <span> </span>
          </div>
          <div className="title">
            [:   connect   :]
          </div>
          <div className="options-icon">
            <span> </span>
          </div>
        </div>
        <div className="users">
          {this.displayUsers()}
        </div>

        <div className="open-btn" onClick={this.clickedOpen}><i className={`ayn-right-open ${this.state.open ? '' : 'closed'}`}></i></div>

        <div className="search">
          <i className="ayn-search" />
          <input type="text" name="friendSearch" placeholder="search..." />
        </div>

        {this.displayChat()}

      </section>
    )
  }
}