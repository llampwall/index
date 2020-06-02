'use strict'

const Online = use('App/Models/Online')
const Database = use('Database')
const Message = use('App/Models/Message')
const Ws = use('Ws')

class ChatController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth
    console.log(auth.user.fname + ' ' + auth.user.lname + ' has connected to the server.')

    this.store(auth.user.id, socket.id)
    this.updateChat()


    // UNCOMMENT THIS TO SET A 10 minute connection timeout.
    // something is wrong with the logic - heartbeat doesn't work
    // connection will close 10 minutes from the time it starts
    // regardless of activity.

    // this.isAlive = true;
    // this.socket.on('ping', function() {
    //   this.heartbeat()
    // })

    // const self = this
    // const interval = setInterval(function ping() {
    //   Ws._wsServer.clients.forEach(function each(ws) {
    //     if (ws.isAlive === false) return ws.close();
    
    //     ws.isAlive = false;
    //     ws.ping();
    //   });
    // }, 600000); 

  }

  // heartbeat() {
  //   this.isAlive = true;
  // }
  

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

  // get messages and send them to the right users
  async onMessage (message) {

    // this.heartbeat()

    // update everyone's feed
    if (message.update != null) {
      console.log('update')
      this.updateFeeds()
      return
    }

    if (message.new != null) {
      console.log('new post')
      this.sendNewPost()
      return
    }

    if (message.delete != null) {
      console.log('delete ' + message.delete)
      this.deletePost(message.delete)
      return
    }

    // update comments for a post
    if (message.comments != null) {
      console.log('comments')
      this.updateComments()
      return
    }

    // update comments for a post
    if (message.likes != null) {
      console.log('likes')
      this.updateLikes()
      return
    }

    if (message.to != null) {
      console.log('new message from: ')
      console.log(this.auth.user.fname)
      console.log('to')
      console.log(message.to.fname)
      console.log(message.body)

      try {
        // get the sockets to send to
        const ids = await this.getUserSockets(message.to.id)
        if (ids.length == 0) {
          console.log('no connections found for user ' + message.to.fname)
          return
        }
        // strip the to data
        let newMsg = {
          from: this.auth.user,
          body: message.body
        }
        
        // add message to database
        const msg = await Message.create({
          sender_id: this.auth.user.id,
          receiver_id: message.to.id,
          content: message.body,
          read_at: null,
        })
        console.log('message saved')

        this.socket.emitTo('message', newMsg, ids)

        return

      } catch (error) {
        console.log('error: ' + error)
      }
    }

    console.log('not a private message: broadcasting')
    this.socket.broadcast('message', message)
  }

  // gets all open sockets associated with a user id
  async getUserSockets(u_id) {
    try {
      const target = await Database.select('socket_id')
                        .from('onlines')
                        .where('user_id', u_id)
      let ids = []
      for (var i = 0; i < target.length; i++) {
        ids.push(target[i].socket_id)
      }
      console.log(ids)
      return ids
    } catch (error) {
      console.log(error)
    }
  }

  async updateFeeds() {
    this.socket.broadcast('update', 'refresh')
  }

  async deletePost(id) {
    this.socket.broadcast('delete', id)
  }

  async updateChat() {
    this.socket.broadcast('login', 'refresh')
  }

  async updateComments() {
    this.socket.broadcast('comments', 'refresh')
  }

  async updateLikes() {
    this.socket.broadcast('likes', 'refresh')
  }

  // handle client leaving
  async onClose () {
    console.log(this.socket.id + ' is disconnecting from a device.')
    // clearInterval(interval);
    // this.updateChat()
    try {
        const target = await Online.query().where('socket_id', this.socket.id).delete()
    } catch {
        console.log("error disconnecting")
    }
    
    console.log("done")
  }

  async onError () {
    console.log('error')
    console.log(this.socket.id + ' had an error - disconnecting')
    // this.updateChat()
    try {
        const target = await Online.query().where('socket_id', this.socket.id).delete()
    } catch {
        console.log("error disconnecting")
    }
    // console.log("done")
  }
}

module.exports = ChatController
