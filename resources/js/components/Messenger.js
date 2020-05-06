import React, { Component} from 'react'
import axois from 'axios'

export default class Messenger extends Component {
  constructor () {
    super()
    this.state = { 
      users: []
    }
  }

  componentWillMount() {
    this.populate()
  }

  populate = async () => {
    const self = this
    try {
      const allUsers = await axois.get('/api/users')
      console.log("users: ")
      console.log(allUsers)
      self.setState({
        users: allUsers.data
      })
    } catch(error) {
      console.log("error fetching users: " + error)
    }
  }

  displayUsers = () => {
    return (
      this.state.users.map((user) => {
        return (
          <div className="user" key={user.id}>
            <div className="user-img" />
            <div className="username">
              {user.fname} {user.lname}
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
        )
      })
    )
  }

  render () {
    if (this.state.users == undefined) {
      this.populate()
    }
    return (
      <section id="messenger">
        <div className="messenger-header">
          <div className="messenger-icon">
            <i className="fa fa-paper-plane" />
          </div>
          <div className="title">
            \connect
          </div>
          <div className="options-icon">
            <i className="fa fa-ellipsis-v" />
          </div>
        </div>
        <div className="users">
          {this.displayUsers()}
        </div>

        <div className="search">
          <i className="fa fa-search" />
          <input type="text" name="friendSearch" placeholder="search..." />
        </div>
      </section>
    )
  }
}