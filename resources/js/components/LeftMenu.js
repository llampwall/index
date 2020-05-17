import React, { Component} from 'react'

export default class LeftMenu extends Component {
  constructor () {
    super()
    this.state = { 
      dropdown: false,
      open: false
    }
  }

  componentDidMount() {
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

  clickedDropDown = () => {
    this.setState({
      ...this.state,
      dropdown: !this.state.dropdown
    })
  }

  render () {
    if (this.props.initialData.userData == undefined) {
      return (
        <div className='load'>
          <i className="ayn-spin3" />
        </div>
      )
    } else {
      // console.log(this.props.initialData.userData)
      const {fname, lname} = this.props.initialData.userData
      return (
        <section id="left-menu" className={this.state.open ? "open" : "closed"}>
          <div className="account-dropdown" onClick={this.clickedDropDown}>
            <div className="username">
              {`[: ${fname} ${lname} :]`}
            </div>
          </div>
  
          <div className={`dropdown ${this.state.dropdown ? 'active' : ''}`}>
            <nav>
              <a href={`/profile/${this.props.initialData.userData.id}`}>+ profile +</a>
              <a href={`/settings/${this.props.initialData.userData.id}`}>* settings *</a>
              <a href="/logout">- logout -</a>
            </nav>
          </div>
  
          <div className="groups">
            <div className="title">_usr</div>
            <ul>
              <li>bio</li>
              <li>work</li>
              <li>media</li>
            </ul>
          </div>
          <div className="groups">
            <div className="title">_groups</div>
            <ul>
              <li>software</li>
              <li>photography</li>
              <li>design</li>
            </ul>
          </div>

          <div className="open-btn" onClick={this.clickedOpen}><i className={`ayn-left-open ${this.state.open ? '' : 'closed'}`}></i></div>

          <a href="/logout" className="logout" onClick={this.props.ws.close()}>
            logout <i className="ayn-trash" />
          </a>
        </section>
      )
    }
  }
}
