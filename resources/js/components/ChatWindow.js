import React, { Component } from 'react'
import axios from 'axios'


export default class ChatWindow extends Component {
  constructor () {
    super()
    this.state = { 
      user: null
    }
  }

  componentDidMount() {
    this.setState({
        user: this.props.user
    }, () => {
        console.log(this.state)
    })
  }

  switchUser = (user) => {
    this.setState({
        user: user
    }, () => {
        console.log(this.state)
    })
  }


  render() {
    if (this.state.user == undefined) {
        return (
          <div className='load'>
            <i className="ayn-spin3" />
          </div>
        )
    } else {
      return (
          <div className='chat'>
                <div className='chat-header'>
                  <span className='chat-user'>{this.state.user.fname} {this.state.user.lname}</span>
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
                    <input type='text' name='newmessage' placeholder='enter a message' />
                    <div className='send-btn'><i className='ayn-paper-plane-1'></i></div> 
                </div>
          </div>
      )
    }
  }
}