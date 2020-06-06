import React, { Component} from 'react'

export default class LeftMenu extends Component {
  constructor () {
    super()
    this.state = {
      open: false
    }
  }

  componentDidMount() {
    if (window.innerWidth > 800) {
      this.setState({open: true})
    }
  }
  
  clickedOpen = () => {
    this.setState({open: !this.state.open})
    if (window.innerWidth <= 800) {
      this.props.open()
    }
  }

  close = () => {
    this.setState({open: false})
  }

  logout = () => {
    this.chat = this.props.ws.getSubscription('chat') || this.props.ws.subscribe('chat')
    this.chat.emit('message', {
      offline: this.props.user
    })
    this.props.ws.close()

    window.location.href = '/logout'
  }

  render () {
    if (this.props.user == undefined) {
      return (
        <div className='load'>
          <i className="ayn-spin3" />
        </div>
      )
    } else {
      const {fname, lname} = this.props.user
      return (
        <section id="left-menu" className={this.state.open ? "open" : "closed"}>
          <a className="account-dropdown" href={`/profile/${this.props.user.id}`}>
            <div className="username">
              {`${fname} ${lname}`}
            </div>
          </a>
  
          <div className="groups">
            <div className="title">you</div>
            <ul>
              <li>bio</li>
              <li>work</li>
              <li>media</li>
            </ul>
          </div>
          <div className="groups">
            <div className="title">groups</div>
            <ul>
              <li>software</li>
              <li>photography</li>
              <li>design</li>
            </ul>
          </div>

          <div className="open-btn" onClick={this.clickedOpen}><i className={`ayn-left-open ${this.state.open ? '' : 'closed'}`}></i></div>

          <div className="logout" onClick={this.logout}>
            logout <i className="ayn-trash" />
          </div>
        </section>
      )
    }
  }
}
