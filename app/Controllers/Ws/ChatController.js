'use strict'

const Ws = use('Ws')
const Online = use('App/Models/Online')

class ChatController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.user = auth.user
    console.log(auth.user.fname + ' ' + auth.user.lname + ' has connected to the server.')

    socket.emit('hello')
}

  onMessage (message) {

    // console.log('new message from: ')
    // console.log(this.auth.user.fname)
    // console.log('to')
    // console.log(message.to.fname)
    // console.log(message.body)
    console.log(this.socket.id)
    console.log(Ws._connections)
    this.socket.broadcastToAll('message', message.body)
  }

  onClose () {
  }

  onError () {
    // same as: socket.on('error')
  }
}

module.exports = ChatController
