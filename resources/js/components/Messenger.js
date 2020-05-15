import React, { Component} from 'react'
import axois from 'axios'
import ChatWindow from './ChatWindow'
import Ws from '@adonisjs/websocket-client'
import { SimpleDB } from 'aws-sdk'

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

    this.pingTimeout = setTimeout(() => {
      this.ws.close();
    }, 30000);
  }

  componentDidMount() {
    this.populate()
    if (window.innerWidth > 1200) {
      this.setState({
        ...this.state,
        open: true,
      })
    }
    this.startChat()
  }

  componentWillUnmount() {
    this.ws.close()
  }

  disconnect = () => {
    this.ws.close()
  }

  //open messenger sidebar
  clickedOpen = () => {
    this.setState({
      ...this.state,
      open: !this.state.open
    })
  }

  // connect messenger
  startChat = () => {
    const self = this
    // connect to main chat
    this.ws = Ws()
    this.ws.connect()
    this.chat = this.ws.getSubscription('chat') || this.ws.subscribe('chat')

    // send login
    this.chat.on('ready', () => {
      self.setState({
        ...self.state,
        connected: true
      })
      // this.chat.emit('message', {
      //   body: 'login',
      //   from: this.state.me,
      //   to: this.state.user
      // })
    })

    this.chat.on('message', function(message) {
      console.log('message received')
      // console.log(message.to)
      if (message.to != undefined) {
        // console.log(message.to)
        // console.log(self.props.initialData.userData)
        if (message.to.id == self.props.initialData.userData.id) {
          console.log('MESSAGE TO US!')
          self.openChat(message.from)
          setTimeout(self.chatRef.current.addMsg(message), 500)
        }
        
      }
    })

    this.ws.on('error', (error) => {
      console.log(error)
      self.ws.unsubscribe('chat')
      self.ws.terminate()
    })
    
    this.ws.on('close', () => {
      clearTimeout(this.pingTimeout);
      self.setState({
        ...self.state,
        connected: false,
        chatUser: null
      })
    })

    this.ws.on('open', () => {
      clearTimeout(this.pingTimeout);
    });
    this.ws.on('ping', () => {
      clearTimeout(this.pingTimeout);
    });
  }

  // open chat window / switch to a different one
  openChat = (user) => {
    const self = this

    // if (this.connected == false) {
    //   this.ws = Ws()
    //   this.ws.connect()
    //   this.chat = this.ws.getSubscription('chat') || this.ws.subscribe('chat')
    //   this.chatRef = React.createRef()
    // }
    // send login
    this.setState({
      ...this.state,
      connected: true,
      chatUser: user
    })
    if (this.state.chatUser != null && user != this.state.chatUser) {
      this.chatRef.current.switchUser(user)
    }
  }


  // instantiate chatwindow
  displayChat = () => {
    if (this.state.chatUser != null) {
      return (
        <ChatWindow ref={this.chatRef} 
          from={this.props.initialData.userData} 
          to={this.state.chatUser} 
          chat={this.chat} 
          disconnect={this.disconnect}
        ></ChatWindow>
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