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
            {/* <div className="nothing" /> */}
            <div className="search">
                <input type="text" name="search" placeholder="search..." />
            </div>
            {/* <div className="icons">
                <i className="ayn-bell-alt" />
                <i className="ayn-comment-1" />
                <i className="ayn-user-1" />
            </div> */}
        </div>
    )
  }
}
