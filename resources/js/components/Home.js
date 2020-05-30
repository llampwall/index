import React, { Component } from 'react'
import axios from 'axios'
import PostArea from './PostArea'
import Compose from './Compose'
import Post from './Post'

// Handles updating the postarea when its sibling compose adds a post to the database

export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      initialData: {},
      single: false,
      post: {},
      user: {}
    }
  }

  componentDidMount() {
    // console.log(this.props)
    this.setState({
      initialData: this.props.initialData,
      single: this.props.single
    }, () => {
      // console.log(this.state)
    })

    if (this.props.single) {
      this.getPost()
    }
  }

  // if this is a single post page, get the data for the post and the poster
  getPost = async () => {
    const p_id = this.props.routeProps.match.params.id
    const postData = await axios.get(`/posts/${p_id}`)
    console.log(postData)

    const u_id = postData.data[0].user_id
    const userData = await axios.get(`/api/user/${u_id}`)
    console.log(userData)

    this.setState({
      post: postData.data[0],
      user: userData.data[0]
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
        <div class='load'>
          <i className="ayn-spin3" />
        </div>
      )
    } else {
      
      if (this.props.single && this.state.user != undefined) {
        return (
          <div className="content-area">
            <section id="all-posts">
                <div className="post-container">
                  <Post post={this.state.post} user={this.state.user} ws={this.props.ws} curuser={this.props.initialData.userData} update={this.update}/>
                </div>
            </section>
          </div>
        )
      } else {
        return (
          <div className="content-area" id="scroll-this">
            
              <Compose initialData={this.state.initialData} update={this.update} ws={this.props.ws}/>
              <PostArea routeProps={this.props.routeProps} initialData={this.state.initialData} ws={this.props.ws} update={this.update}/>
  
          </div>
        )
      }
    }
  }
}