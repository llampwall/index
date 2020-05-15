'use strict'

const Online = use('App/Models/Online')

class ChatController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth
    console.log(auth.user.fname + ' ' + auth.user.lname + ' has connected to the server.')

    this.store(auth.user.id, socket.id)
  }

  // store socket in database
  async store (u_id, s_id) {

    try {
      const newSocket = await Online.create({
          user_id: u_id,
          socket_id: s_id
      })
    } catch (error) {
        console.log(error)
    }
    console.log('connection saved');

    this.socket.emit('message', 'new connection')
  }

  onMessage (message) {

    if (message.to != null) {
      console.log('new message from: ')
      console.log(this.auth.user.fname)
      console.log('to')
      console.log(message.to.fname)
      console.log(message.body)
    }
    
    // console.log(this.socket.id)
    this.socket.broadcast('message', message)
  }

  async onClose () {
    console.log(this.socket.id + ' is disconnecting from a device.')
    try {
        const target = await Online.query().where('socket_id', this.socket.id).delete()
    } catch {
        console.log("error disconnecting")
    }
    // this.socket.close()
    console.log("done")
  }

  onError () {
    console.log('error')
    // this.socket.close()
  }
}

module.exports = ChatController
