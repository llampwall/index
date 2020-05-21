import React, { Component} from 'react'
import axois from 'axios'
import ChatWindow from './ChatWindow'
import Axios from 'axios'
// import Ws from '@adonisjs/websocket-client'
// import { SimpleDB } from 'aws-sdk'

export default class Messenger extends Component {
  constructor () {
    super()
    this.state = { 
      users_on: [],
      users_off: [],
      open: false, 
      connected: false,
      chatUser: null, 
      blinkIds: new Set(),
      unread: new Set()
    }

    this.chat = null
    this.chatRef = React.createRef()

    this.pingTimeout = setTimeout(() => {
      this.props.ws.close();
    }, 32000);

    this.blinkInt = null
    this.blinkTo = null
  }

  componentDidMount() {
    this.startChat()
    if (window.innerWidth > 1200) {
      this.setState({
        ...this.state,
        open: true,
      })
    }

    // var pageVisibility = document.visibilityState
    // document.addEventListener('visibilitychange', this.wakeUp)
  }


  // wakeUp = () => {
  //   const self = this
  
  //   if (document.visibilityState == 'hidden') {
  //     document.title = 'hidden'
  //     self.props.ws.close()
  //     self.setState({
  //       ...self.state,
  //       connected: false
  //     })
  //   }

  //   if (document.visibilityState == 'visible') {
  //     self.startChat()
  //   }
  // }

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
    // this.props.ws.connect()
    this.chat = this.props.ws.getSubscription('chat') || this.props.ws.subscribe('chat')

    // send login
    this.chat.on('ready', () => {
      self.setState({
        ...self.state,
        connected: true
      })
      // display online users
      this.populate()
    })

    // update users online
    this.chat.on('login', function(message) {
      self.populate()
    })

    this.chat.on('message', function(message) {
      self.handleMsg(message)
    })

    this.props.ws.on('error', (error) => {
      console.log(error)
      self.props.ws.close()
      self.setState({
        ...self.state,
        connected: false,
        chatUser: null
      })
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
    })
    
    this.props.ws.on('ping', () => {
      clearTimeout(this.pingTimeout)
      console.log('ping');
      self.populate()
    });
  }


  // handle incomming messages
  handleMsg = async (message) => {
    if (message.from != undefined) {
        console.log('message to us!: ' + message.body)

        if (!this.state.blinkIds.has(message.from.id)) {
          this.blink(message.from.id, 3000)    // blink this users name for 4 seconds, then add it to unread
        }

        if (this.state.chatUser == null) {
          await this.openChat(message.from, false)
        }

        if(this.chatRef != null)  {
          this.chatRef.current.getMessages()
        }
        
     }
  }

  // blink username color change when message received
  blink = (u_id, ms) => {
    const self = this

    let oldBlink = new Set(self.state.blinkIds)
    if (oldBlink.has(u_id)) {oldBlink.delete(u_id)}   // deal with already blinking
    let newBlink = new Set(oldBlink).add(u_id)
    let blinking = false
    
    // if (this.blinkInt) {                            // deal with already blinking
    //   clearInterval(this.blinkInt)
    //   this.blinkInt = null
    // }
    this.blinkInt = setInterval(function() { 
      if (blinking == false) {
        self.setState({
          blinkIds: newBlink
        })
        blinking = true
      } else {
        self.setState({
          blinkIds: oldBlink
        })
        blinking = false
      }
    }, 500)

    if (this.blinkTo) {                            // deal with already blinking
      clearTimeout(this.blinkTo)
      this.blinkTo = null
    }
    this.blinkTo = setTimeout(function() {
      clearInterval(self.blinkInt)
      self.setState({
        ...self.state,
        blinkIds: oldBlink,
        unread: (self.state.chatUser != null && self.state.chatUser.id != u_id) ? self.state.unread.add(u_id) : self.state.unread     // mark it as unread
      })
    }, ms)
  }


  // open chat window / switch to a different one
  openChat = async (user, clicked) => {
    const self = this
    console.log('clicked: ' + clicked)

    // do nothing if clicking your own name
    if (user.id == this.props.initialData.userData.id) {
      return
    }

    if (this.state.connected == false) {
      await this.props.ws.connect()
      this.chat = await this.props.ws.getSubscription('chat') || this.props.ws.subscribe('chat')
      // return
    }
    // send login
    this.setState({
      ...this.state,
      connected: true,
      open: (window.innerWidth > 600)  //close on small devices
    })

    if (clicked || this.state.chatUser == null) {
      console.log('setting state')
      this.setState({
        ...this.state,
        chatUser: user
      })
    }

    // if blinking, stop blinking
    if (this.state.blinkIds.has(user.id)) {
      let newBlink = new Set(this.state.blinkIds)
      newBlink.delete(user.id)
      this.setState({
        ...this.state,
        blinkIds: newBlink
      })
      clearInterval(this.blinkInt)
      this.blinkInt = null
      clearTimeout(this.blinkTo)
      this.blinkTo = null
    }

    // if unread, dont make it unread
    if (this.state.unread.has(user.id)) {
      let newUnread = new Set(this.state.unread)
      newUnread.delete(user.id)
      this.setState({
        ...this.state,
        unread: newUnread
      })
    }

    if (this.chatRef.current != null && clicked) {
      this.chatRef.current.switchUser(user)
    }

    if (this.state.chatUser != null && user != this.state.chatUser && clicked) {
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
          ws={this.props.ws}
          chat={this.chat} 
          disconnect={this.disconnect}
          close={this.closeChatWindow}
          blink={this.state.blinkIds.has(this.state.chatUser.id)}     // this doesnt work because if one chatuser is blinking it will pass true down to all the chatwindows
        ></ChatWindow>
      )
    }
  }

  closeChatWindow = () => {
    this.setState({
      chatUser: null
    })
  }

  // fill messenger sidebar with users
  // fix to be only online users
  populate = async () => {
    const self = this
    try {
      const allOnline = await axois.get('/api/online')
      const allOffline = await Axios.get('/api/offline')
      // console.log("users: ")
      // console.log(allUsers)
      self.setState({
        users_on: allOnline.data,
        users_off: allOffline.data
      })
    } catch(error) {
      console.log("error fetching users: " + error)
    }
  }

  // render online users
  displayUsers = () => {
    const self = this
    if (this.state.users_off == undefined) {
      return (
        <div className='load'>
          <i className="ayn-spin3" />
        </div>
      )
    } else {
      return (
        <div>
          {this.state.users_on.map((user) => {
            return (
              <div className={`user ${(self.state.blinkIds.has(user.id) && self.state.chatUser != null && self.state.chatUser.id != user.id) ? 'blink' : ''}`} key={user.id} onClick={this.openChat.bind(null, user, true)}>
                <div className="user-img" style={{
                  backgroundImage: `url("${user.profile_img}")`, 
                  backgroundPosition: 'center center', 
                  backgroundRepeat: 'no-repeat', 
                  backgroundSize: 'cover'}} />
                <div className='username'>
                  {user.fname} {user.lname}
                </div>
                <div className="message-icon">
                  <i className={`ayn-comment${self.state.unread.has(user.id) ? '' : '-1'}`} />
                </div>
              </div>
            )
          })}
          <div className="divider">- offline -</div>
          {this.state.users_off.map((user) => {
            return (
              <div className="user off" key={user.id}>
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
          })}
        </div>
      )
    }
  }


  render () {
    if (this.state.users_off == undefined) {
      this.populate()
      return (
        <div className='load'>
          <i className="ayn-spin3" />
        </div>
      )
    }
    return (
      <section id="messenger" className={this.state.open ? "open" : "closed"}>
        <div className="messenger-header">
          <div className="messenger-icon">
            {/* <i className="ayn-paper-plane" /> */}
            <span> </span>
          </div>
          <div className="title">
            [ connect ]
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