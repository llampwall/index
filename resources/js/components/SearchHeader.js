import React, { Component} from 'react'

export default class SearchHeader extends Component {
  constructor () {
    super()
    this.state = { 
    }
  }

  render () {
    return (
        <div className="header">
            <div className="nothing" />
            <div className="search">
                <input type="text" name="search" placeholder="search..." />
            </div>
            <div className="icons">
                <i className="fa fa-bell" />
                <i className="fa fa-comment" />
                <i className="fa fa-user" />
            </div>
        </div>
    )
  }
}
