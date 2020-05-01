import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, 
  NavLink
} from 'react-router-dom'
import axios from 'axios'
import Compose from './Compose'

// Handles updating the postarea when its sibling compose adds a post to the database


export default class Profile extends Component {
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
      // console.log(this.state)
    })
  }

  // const getUser = async function() {
  //   const 
  // }

  render () {
    if (this.props.initialData.userData == undefined) {
      return (
        <div>profile loading...</div>
      )
    } else {
      // console.log(this.props.initialData.userData)
      return (
        <div className="content-area profile-page">
          <div className="user-img">
            <img src={this.props.initialData.userData.profile_img} />
            <h1>{this.props.initialData.userData.fname} {this.props.initialData.userData.lname}</h1>
          </div>
          <div className="user-info">
            
            <div className="follow-btn"><span /><span /><span /><span />follow</div>
          </div>
        </div>
      )
    }
  }
}