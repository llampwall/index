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
            <a href="/">
              <img src="/img/sun_small.JPG" alt="index - home"></img>
            </a>
            <div className="search">
                <img src="/img/index_orange.png" />
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
