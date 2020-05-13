import React, { Component} from 'react'
import axois from 'axios'

export default class Messenger extends Component {
  constructor () {
    super()
    this.state = { 
      users: [],
      open: false
    }
  }

  componentDidMount() {
    this.populate()
    if (window.innerWidth > 1200) {
      this.setState({
        ...this.state,
        open: true
      })
    }
  }

  clickedOpen = () => {
    this.setState({
      ...this.state,
      open: !this.state.open
    })
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
    if (this.state.users == undefined) {
      return (
        <div className='load'>
          <i className="ayn-spin3" />
        </div>
      )
    } else {
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
  }

  render () {
    if (this.state.users == undefined) {
      this.populate()
    }
    return (
      <section id="messenger" className={this.state.open ? "open" : "closed"}>
        <div className="messenger-header">
          <div className="messenger-icon">
            {/* <i className="ayn-paper-plane" /> */}
            <span> </span>
          </div>
          <div className="title">
            [:   connect   :]
          </div>
          <div className="options-icon">
            <span> </span>
          </div>
        </div>
        <div className="users">
          {this.displayUsers()}
        </div>

        <div className="open-btn" onClick={this.clickedOpen}><i className={`ayn-right-open ${this.state.open ? '' : 'closed'}`}></i></div>

        <div className="search">
          <i className="ayn-search" />
          <input type="text" name="friendSearch" placeholder="search..." />
        </div>
      </section>
    )
  }
}