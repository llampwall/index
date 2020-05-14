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
      message: ''
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
    this.props.chat.on('message', function(message) {
      console.log('message received')
      // console.log(message.to)
      if (message.to != undefined) {
        console.log(message.to)
        console.log(self.state.from)
        if (message.to.id == self.state.from.id) {
          console.log('MESSAGE TO US!')
        }
        
      }
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
                </div>
                <div className='chat-body'>
                    <div className='message'>
                        {/* <span className='message-user'>{this.state.user.fname}</span> */}
                        <p>this is a message. </p>   
                    </div>
                    <div className='message self'>
                        {/* <span className='message-user'>user</span> */}
                        <p>this is a message. </p>   
                    </div>
                    <div className='message'>
                        {/* <span className='message-user'>user</span> */}
                        <p>this is a message. </p>   
                    </div>
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