import React, { Component} from 'react'

export default class LeftMenu extends Component {
  constructor () {
    super()
    this.state = { 
      dropdown: false
    }
  }

  clickedDropDown = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  render () {
    return (
      <section id="left-menu">
        <div className="account-dropdown" onClick={this.clickedDropDown}>
          <div className="logo">
            <i className="fa fa-archive" />
          </div>
          <div className="username">
            Jordan_Hewitt
          </div>
          <div className="icon-down">
            <i className="fa fa-sort-down" />
          </div>
        </div>

        <div className={`dropdown ${this.state.dropdown ? 'active' : ''}`}>
          <nav>
            <a href="/profile">+ profile +</a>
            <a href="/account">* account *</a>
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
        <div className="logout">
          <a href="/logout">logout <i className="fa fa-trash" /></a>
        </div>
      </section>
    )
  }
}
