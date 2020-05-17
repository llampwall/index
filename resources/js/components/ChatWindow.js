import React, { Component } from 'react'


export default class ChatWindow extends Component {
  constructor () {
    super()
    this.state = { 
      from: null,
      to: null,
      chat: null, 
      message: '', 
      messages: []
    }
  }

  componentDidMount() {
    const self = this
    this.setState({
        from: this.props.from,
        to: this.props.to,
        chat: this.props.chat
    }, () => {
        console.log(this.state)
    })
  }

  switchUser = (user) => {
    this.setState({
        to: user
    }, () => {
        console.log('changed user: ' + this.state.to.fname)
    })
  }

  addMsg = (message) => {
    let newMessages = this.state.messages
    newMessages.push(message)
    this.setState({
      ...this.state,
      messages: newMessages
    })

  }

  displayMessages = () => {
    return (
      this.state.messages.map((msg, i) => {
        return (
          <div className='message' key={i}>
              <p>{msg}</p>   
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
    this.addMsg(this.state.message)
    this.setState({
      ...this.state,
      message: ''
    })
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