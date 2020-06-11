import React, { Component} from 'react'

export default class LeftMenu extends Component {
  constructor () {
    super()
    this.state = {
      open: false,
      tron: false
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

  // tron mode enable/disable
  handleChange = (event) => {
    const self = this;
    this.setState({
      tron: event.target.checked
    }, () => {
      if (this.state.tron) {
        // document.documentElement.style.setProperty('--tron', 1)
        document.body.classList.add("tron");
        document.getElementById("left-menu").classList.add("tron");
        document.getElementById("messenger").classList.add("tron");
        document.getElementById("content").classList.add("tron");
        document.getElementById("scroll-this").classList.add("tron");
        var posts = document.querySelectorAll(".post");
        posts.forEach((p) => p.classList.add("tron"));
      } else {
        // document.documentElement.style.setProperty('--tron', 0)
        document.body.classList.remove("tron");
        document.getElementById("left-menu").classList.remove("tron");
        document.getElementById("messenger").classList.remove("tron");
        document.getElementById("content").classList.remove("tron");
        document.getElementById("scroll-this").classList.remove("tron");
        var posts = document.querySelectorAll(".post");
        posts.forEach((p) => p.classList.remove("tron"));
      }
      self.props.tron(self.state.tron)
    })
  }

  close = () => {
    this.setState({open: false})
    document.getElementById("left-menu").classList.remove("open");
    document.getElementById("left-menu").classList.add("closed");
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
        <section id="left-menu" className={
          `${this.state.open ? "open" : "closed"} ${this.state.tron ? "tron" : ""}`
        }>
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

          <div className="troncheck">
              <label htmlFor="tron">
                <input type="checkbox" 
                  name="tron" 
                  id="tron" 
                  value={this.state.tron} 
                  onChange={this.handleChange}>
                </input>
                tron mode
              </label>
          </div>

          <div className="logout" onClick={this.logout}>
            logout <i className="ayn-trash" />
          </div>
        </section>
      )
    }
  }
}
