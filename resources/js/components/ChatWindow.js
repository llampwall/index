import React, { Component } from 'react'
import axios from 'axios'
import Ws from '@adonisjs/websocket-client'


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
        // this.props.chat.emit('message', {
        //   from: this.state.from,
        //   to: this.state.to, 
        //   body: 'sup homie'
        // })
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
              <p>{msg.body}</p>   
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

  sendMsg = () => {
    console.log('sending message to ' + this.state.to.fname)
    this.state.chat.emit('message', {
      from: this.state.from,
      to: this.state.to,
      body: this.state.message
    })
  }

  // for now we will have this disconnect the client
  closeChat = () => {
    // this.props.disconnect()
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
                    <input type='text' name='message' value={this.state.message} onChange={this.changeText} placeholder='enter a message'/>
                    <div className='send-btn' onClick={this.sendMsg}><i className='ayn-paper-plane-1'></i></div> 
                </div>
          </div>
      )
    }
  }
}