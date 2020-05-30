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
      post: {}
    }
  }

  componentDidMount() {

    if (this.props.single) {
      this.getPost()
    }
  }

  // if this is a single post page, get the data for the post and the poster
  getPost = async () => {
    const p_id = this.props.routeProps.match.params.id
    const postData = await axios.get(`/posts/${p_id}`)
    console.log(postData)

    this.setState({
      post: postData.data[0]
    })
  }



  // pass down function to pass down to compose so it can update the whole area
  update = async () => {

  }

  render () {
    if (this.props.user == undefined) {
      return (
        <div class='load'>
          <i className="ayn-spin3" />
        </div>
      )
    } else {
      
      if (this.props.single && this.state.post != undefined) {
        return (
          <div className="content-area">
            <section id="all-posts">
                <div className="post-container">
                  <Post post={this.state.post} ws={this.props.ws} curuser={this.props.user} update={this.update}/>
                </div>
            </section>
          </div>
        )
      } else {
        return (
          <div className="content-area" id="scroll-this">
            
              <Compose user={this.props.user} update={this.update} ws={this.props.ws}/>
              <PostArea routeProps={this.props.routeProps} user={this.props.user} ws={this.props.ws} update={this.update}/>
  
          </div>
        )
      }
    }
  }
}