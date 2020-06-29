import React, { Component} from 'react'
import { debounce } from 'lodash';
import { Link } from "react-router-dom";

export default class SearchHeader extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  // debounced the search bar to limit the api requests 
  updateSearch = (event) => {
    event.persist()

    if (!this.debouncedFn) {
      this.debouncedFn = debounce(() => {

        const name = event.target.name
        const value = event.target.value

        this.setState({
          [name]: value
        }, () => {
          this.props.searchQuery(value)
        })

      }, 500);
    }
    this.debouncedFn();
  }

  render () {
    return (
        <div className="header">
            {/* <div className="nothing" /> */}
            <Link to="/">
              <img src="/img/sun_small.JPG" alt="index - home"></img>
            </Link>
            <div className="search">
                <Link to="/">
                  <img src="/img/index_orange.png" />
                </Link>
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
