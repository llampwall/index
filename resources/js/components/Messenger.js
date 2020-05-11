import React, { Component} from 'react'
import axois from 'axios'

export default class Messenger extends Component {
  constructor () {
    super()
    this.state = { 
      users: []
    }
  }

  componentDidMount() {
    this.populate()
  }

  populate = async () => {
    const self = this
    try {
      const allUsers = await axois.get('/api/users')
      // console.log("users: ")
      // console.log(allUsers)
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
            {/* <i className="ayn-paper-plane" /> */}
            <span> </span>
          </div>
          <div className="title">
            [:-- connect --:]
          </div>
          <div className="options-icon">
            <span> </span>
          </div>
        </div>
        <div className="users">
          {this.displayUsers()}
        </div>

        <div className="search">
          <i className="ayn-search" />
          <input type="text" name="friendSearch" placeholder="search..." />
        </div>
      </section>
    )
  }
}