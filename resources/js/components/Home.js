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

  componentDidMount() {
    // console.log(this.props)
    this.setState({
      initialData: this.props.initialData
    }, () => {
      // console.log(this.state)
    })
  }



  // pass down function to pass down to compose so it can update the whole area
  update = async () => {
    try {
      const data = await axios.get('/api/intialize')
      const allData = data.data
      // console.log(allData)

      this.setState({
        initialData: allData
      }, () => {
        // console.log(this.state.initialData)
      })
    } catch (error) {
      console.log("Initialization error: " + error)
    }
  }

  render () {
    if (this.props.initialData == undefined) {
      return (
        <i className="ayn-spin3" />
      )
    } else {
      // console.log(this.props)
      return (
        <div className="content-area">
          
            <Compose initialData={this.state.initialData} update={this.update}/>
            <PostArea routeProps={this.props.routeProps} initialData={this.state.initialData} update={this.update}/>

        </div>
      )
    }
  }
}