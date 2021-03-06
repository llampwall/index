import React, { Component} from 'react'
import ChatWindow from './ChatWindow'
import axios from 'axios'
import { debounce } from 'lodash'
import { toast } from 'react-toastify';

export default class Messenger extends Component {
  constructor () {
    super()
    this.state = { 
      users_on: [],
      users_off: [],
      open: false, 
      tron: false,
      connected: false,
      chatUser: null, 
      blinkIds: new Set(),
      unread: new Set(),
      search: ""
    }

    this.chat = null
    this.chatRef = React.createRef()

    this.pingTimeout = setTimeout(() => {
      this.props.ws.close();
    }, 32000);

    this.keepUp = setInterval(() => {
      if (!this.state.connected) {
        this.startChat()
      } else {
        this.populate()
      }
    }, 30000);

    this.blinkInt = null
    this.blinkTo = null
  }

  componentDidMount() {
    this.startChat()
    if (window.innerWidth > 800) {
      this.setState({open: true})
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
    this.setState({open: !this.state.open})
    if (window.innerWidth <= 800) {
      this.props.open()
    }
  }

  tron = (on) => {
    this.setState({tron: on})
  }

  close = () => {
    this.setState({open: false})
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
        connected: true
      })
      // display online users
      this.populate()
    })

    // update users online
    this.chat.on('login', function(message) {
      clearTimeout(self.pingTimeout)
      self.populate()
    })

    this.chat.on('message', function(message) {
      clearTimeout(self.pingTimeout)
      self.handleMsg(message)
    })

    this.props.ws.on('error', (error) => {
      console.log(error)
      clearTimeout(this.pingTimeout)
      self.props.ws.close()
      self.setState({
        connected: false,
        chatUser: null
      })
    })
    
    this.props.ws.on('close', () => {
      clearTimeout(this.pingTimeout);
      self.setState({
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

        // toast.info(this.displayMsg(message), {
        //   toastId: new Date().getTime()
        // })
        

        if (!this.state.blinkIds.has(message.from.id)) {
          this.blink(message.from.id, 5000)    // blink this users name for 5 seconds, then add it to unread
        }

        if (this.state.chatUser == null) {      // open the chat window if it isnt open
          await this.openChat(message.from, false)
        }

        if (this.chatRef != null && this.state.chatUser.id != message.from.id)  {
          toast.info(this.displayMsg(message), {
            toastId: new Date().getTime()
          })
        }

        if (this.chatRef != null)  {
          this.chatRef.current.getMessages()
        }
        
     }
  }

  displayMsg = (message, closeToast) => {
    const self = this
    return (
      <div className="toast-body-custom">
        <div className="msg">
          <span className="msg-usr">{`${message.from.fname}${message.from.lname ? " " + message.from.lname : ""}: `}</span>
          <span className="msg-body">{message.body.substring(0, 50)}{(message.body.length > 50) ? "..." : ""}</span>
        </div>
        <div className="buttons">
          <button className="go" onClick={this.msgClick.bind(null, message)}>Reply <i className="ayn-right"></i></button>
          {/* <button className="close" onClick={closeToast}>Close</button> */}
        </div>
      </div>
    )
  }

  msgClick = (message) => {
    if (!this.state.chatUser || (this.state.chatUser.id != message.from.id)) {
      this.openChat(message.from, true)
      toast.dismiss()
    } else {
      toast.dismiss()
    }
  }

  // blink username color change when message received
  blink = (u_id, ms) => {
    const self = this

    let oldBlink = new Set(self.state.blinkIds)
    if (oldBlink.has(u_id)) {oldBlink.delete(u_id)}   // deal with already blinking
    let newBlink = new Set(oldBlink)
    newBlink.add(u_id)
    let blinking = false
    
    if (this.blinkInt) {                            // deal with already blinking
      clearInterval(this.blinkInt)
      this.blinkInt = null
    }
    this.blinkInt = setInterval(function() {        // blink every .5 seconds
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
    this.blinkTo = setTimeout(function() {        // stop blinking after ms milliseconds
      clearInterval(self.blinkInt)
      let isUnread = new Set(self.state.unread)
      if (self.state.chatUser != null && self.state.chatUser.id != u_id && !self.state.unread.has(u_id)) {
        isUnread.add(u_id)
      }
      self.setState({
        ...self.state,
        blinkIds: oldBlink,
        unread: isUnread
      })
    }, ms)
  }


  // open chat window / switch to a different one
  openChat = async (user, clicked) => {
    const self = this

    if (this.state.open && (window.innerWidth < 600)) {     // close on small devices
      this.setState({open: false})
    }
    // console.log('clicked: ' + clicked)

    // do nothing if clicking your own name
    if (user.id == this.props.user.id) {
      return
    }

    if (this.state.connected == false) {
      await this.props.ws.connect()
      this.chat = this.props.ws.getSubscription('chat') || this.props.ws.subscribe('chat')
    }
    // send login
    this.setState({
      connected: true,
      // open: isDesktop  //close on small devices
    })

    // if blinking, stop blinking
    if (this.state.blinkIds.has(user.id)) {
      let newBlink = new Set(this.state.blinkIds)
      newBlink.delete(user.id)
      this.setState({
        connected: true,
        // open: isDesktop, 
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
        // ...this.state,
        connected: true,
        // open: isDesktop, 
        unread: newUnread
      })
    }

    if (clicked == true || this.state.chatUser == null) {
      this.setState({
        // ...this.state,
        connected: true,
        // open: isDesktop, 
        chatUser: user
      })
    }

    // if (isDesktop) {
    //   this.props.open()
    // }

    if (this.chatRef.current != null && clicked == true) {
      this.chatRef.current.switchUser(user)
    }

    if (this.state.chatUser != null && user != this.state.chatUser && clicked == true) {
      this.chatRef.current.switchUser(user)
    }
  }


  // instantiate chatwindow
  displayChat = () => {
    if (this.state.chatUser != null) {
      return (
        <ChatWindow ref={this.chatRef} 
          from={this.props.user} 
          to={this.state.chatUser} 
          ws={this.props.ws}
          chat={this.chat} 
          disconnect={this.disconnect}
          close={this.closeChatWindow}
          blink={this.state.blinkIds.has(this.state.chatUser.id)}
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
      
      let allOffline = await axios.get('/api/offline')
      // let allOnline = await axios.get('/api/online')

      // console.log("users: ")
      // console.log(allUsers)

      if (self.state.search != "") {            // searching for users
        // console.log('searching for ' + self.state.search)
        let allOnline = await axios.get(`/api/online/search`, {
          params: {
            q: self.state.search
          }
        })
        // console.log(allOnline)
        self.setState({
          users_on: allOnline.data,
          users_off: allOffline.data
        })
      } else {
        let allOnline = await axios.get('/api/online')
        self.setState({
          users_on: allOnline.data,
          users_off: allOffline.data
        })
      }

      // self.setState({
      //   users_on: allOnline.data,
      //   users_off: allOffline.data
      // })
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

          <div className="user self">
            <div className="user-img" style={{
              backgroundImage: `url("${this.props.user.profile_img}")`, 
              backgroundPosition: 'center center', 
              backgroundRepeat: 'no-repeat', 
              backgroundSize: 'cover'}} />
            <div className='username'>
              {this.props.user.fname} {this.props.user.lname}
            </div>
            <div className="message-icon">
              <i className="ayn-comment-1" />
            </div>
          </div>

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

  // allow users to search by name in chat
  search = (event) => {
    event.persist()

    if (!this.debouncedFn) {
      this.debouncedFn = debounce(() => {

        const value = event.target.value

        this.setState({
          search: value
        }, () => {
          this.populate()
        })

      }, 500);
    }
    this.debouncedFn()
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
      <section id="messenger" className={
        `${this.state.open ? "open" : "closed"} ${this.state.tron ? "tron" : ""}`
      }>
        <div className="messenger-header">
          <div className="messenger-icon">
            {/* <i className="ayn-paper-plane" /> */}
            <span> </span>
          </div>
          <div className="title">
            connect
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
          <input type="text" name="friendSearch" placeholder="search..." onChange={this.search}/>
        </div>

        {this.displayChat()}

      </section>
    )
  }
}