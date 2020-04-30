import React, { Component} from 'react'

export default class Messenger extends Component {
  constructor () {
    super()
    this.state = { 
    }
  }

  render () {
    return (
      <section id="messenger">
        <div className="messenger-header">
          <div className="messenger-icon">
            <i className="fa fa-paper-plane" />
          </div>
          <div className="title">
            \\connect
          </div>
          <div className="options-icon">
            <i className="fa fa-ellipsis-v" />
          </div>
        </div>
        <div className="users">
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Eric Schmidt
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Louis Verdes
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Caroline Logan
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Shawn Ramsey
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Eric Schmidt
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Louis Verdes
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Caroline Logan
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Shawn Ramsey
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Eric Schmidt
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Louis Verdes
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Caroline Logan
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
          <div className="user">
            <div className="user-img" />
            <div className="username">
              Shawn Ramsey
            </div>
            <div className="message-icon">
              <i className="fa fa-comment" />
            </div>
          </div>
        </div>

        <div className="search">
          <i className="fa fa-search" />
          <input type="text" name="friendSearch" placeholder="search..." />
        </div>
      </section>
    )
  }
}