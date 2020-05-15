import React, { Component} from 'react'
import axois from 'axios'
import ChatWindow from './ChatWindow'
// import Ws from '@adonisjs/websocket-client'
// import { SimpleDB } from 'aws-sdk'

export default class Messenger extends Component {
  constructor () {
    super()
    this.state = { 
      users: [],
      open: false, 
      connected: false,
      chatUser: null
    }

    this.chat = null
    this.chatRef = React.createRef()

    this.pingTimeout = setTimeout(() => {
      this.props.ws.close();
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
    this.props.ws.close()
  }

  disconnect = () => {
    this.props.ws.close()
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
    this.props.ws.connect()
    this.chat = this.props.ws.getSubscription('chat') || this.props.ws.subscribe('chat')

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
      self.handleMsg(message)
    })

    this.props.ws.on('error', (error) => {
      console.log(error)
      self.props.ws.close()
    })
    
    this.props.ws.on('close', () => {
      clearTimeout(this.pingTimeout);
      self.setState({
        ...self.state,
        connected: false,
        chatUser: null
      })
    })

    this.props.ws.on('open', () => {
      clearTimeout(this.pingTimeout);
    });
    this.props.ws.on('ping', () => {
      clearTimeout(this.pingTimeout);
    });
  }


  // handle incomming messages
  handleMsg = async (message) => {
    if (message.from != undefined) {
        console.log('message to us!: ' + message.body)
        this.openChat(message.from)
        console.log(message.body)
        setTimeout(this.chatRef.current.addMsg(message.body), 500)
     }
  }


  // open chat window / switch to a different one
  openChat = (user) => {
    const self = this

    if (this.connected == false) {
      this.startChat()
      return
    }
    // send login
    this.setState({
      ...this.state,
      connected: true,
      chatUser: user,
      open: false       // should just be for mobile, but whatever
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