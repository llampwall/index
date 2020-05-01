import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route, 
  NavLink
} from 'react-router-dom'
import axios from 'axios'
import PostArea from './PostArea'
import Compose from './Compose'

// Handles updating the postarea when its sibling compose adds a post to the database


export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      initialData: {}
    }
  }

  componentWillMount() {
    this.setState({
      initialData: this.props.initialData
    }, () => {
      console.log(this.state)
    })
  }

  render () {
    if (this.props.initialData == undefined) {
      return (
        <div>posts loading...</div>
      )
    } else {
      return (
        <div className="content-area">
          <Compose initialData={this.state.initialData}/>
          <PostArea initialData={this.state.initialData}/>
        </div>
      )
    }
  }
}