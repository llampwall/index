import React, { Component} from 'react'

export default class SearchHeader extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  updateSearch = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState({
      [name]: value
    }, () => {
      this.props.searchQuery(value)
    })
  }

  render () {
    return (
        <div className="header">
            {/* <div className="nothing" /> */}
            <a href="/">
              <img src="/img/sun_small.JPG" alt="index - home"></img>
            </a>
            <div className="search">
                <a href="/">
                  <img src="/img/index_orange.png" />
                </a>
                <input type="text" name="search" placeholder="search..." onChange={this.updateSearch} />
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
