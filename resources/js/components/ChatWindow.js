import React, { Component } from 'react'
import Axios from 'axios'


export default class ChatWindow extends Component {
  constructor () {
    super()
    this.state = { 
      from: null,
      to: null,
      chat: null, 
      message: '', 
      messages: [],
      new: false
    }

    this.msgEndRef = React.createRef()
  }

  componentDidMount() {
    const self = this
    this.setState({
        from: this.props.from,
        to: this.props.to,
        chat: this.props.chat
    }, () => {
        // console.log(this.state)
        self.getMessages()
    })
  }


  switchUser = (user) => {
    this.setState({
        to: user
    }, () => {
        console.log('changed user: ' + this.state.to.fname)
        this.getMessages()
    })
  }


  getMessages = async () => {
    const messages  = await Axios.get('/api/convo', { 
      params: { 
        from: this.state.from.id,
        to: this.state.to.id
      }
    }).then((response) => {
      // console.log(response.data.messages)
      this.setState({
        ...this.state,
        messages: response.data.messages
      })
      this.scrollToBottom()
    })
  }

  // keeps the chat window always at the bottom
  scrollToBottom = () => {
    this.msgEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  displayMessages = () => {
    const self = this
    return (
      this.state.messages.map((msg, i) => {
        return (
          <div className={`message ${(msg.sender_id == self.props.from.id) ? 'self' : ''}`} key={msg.id}>
              <p>{msg.content}</p>   
          </div>
        )
      })
    )
  }

  changeText = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState({
      [name]: value
    }, () => {
      // console.log(this.state)
    })
  }

  // allows posts to be submit with the enter key
  checkSubmit = (event) => {
    if (event.keyCode == 13) {
      event.preventDefault()
      this.sendMsg()
    }
  }

  // sends message, adds message to window, and clears message box
  sendMsg = () => {
    if (this.state.message == '\n') {
      this.setState({
        ...this.state, 
        postContent: ''
      })
      return
    }
    if (this.state.message.length == 0) {
      return
    }

    

    console.log('sending message to ' + this.state.to.fname)
    this.state.chat.emit('message', {
      to: this.state.to,
      body: this.state.message
    })
    // this.addMsg(this.state.message)
    this.setState({
      ...this.state,
      message: ''
    })

    this.getMessages()
  }

  // for now this doesn't do much
  closeChat = () => {
    this.setState({
      ...this.state,
      to: undefined 
    })
  }

  render() {
    if (this.state.to == undefined) {
        return (
          <div className='load'>
            <i className="ayn-spin3" />
          </div>
        )
    } else {
      return (
          <div className='chat'>
                <div className='chat-header'>
                  <span className='chat-user'>{this.state.to.fname} {this.state.to.lname}</span>
                  <div className='close-btn' onClick={this.closeChat}><i className='ayn-cancel'></i></div>
                </div>
                <div className='chat-body'>
                    {this.displayMessages()}
                    <div ref={this.msgEndRef}></div>
                </div>
                <div className='chat-compose'>
                    <input type='text' name='message' value={this.state.message} onKeyUp={this.checkSubmit} onChange={this.changeText} placeholder='enter a message'/>
                    <div className='send-btn' onTouchStart={this.sendMsg} onClick={this.sendMsg}><i className='ayn-paper-plane-1'></i></div> 
                </div>
          </div>
      )
    }
  }
}