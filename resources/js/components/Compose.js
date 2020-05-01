import React, { Component } from 'react'
import axios from 'axios'

export default class Compose extends Component {
  constructor () {
    super()
    this.state = { 
    }
  }

  submitPost = async () => {
    try {
      await axios.post('/posts', {
        user_id: this.props.initialData.userData.id,
        content: this.state.postContent,
        image_url: 'img/webdesign.jpg',
        type: 'image'
      })
      document.getElementById('content').value = ""
      return 'item saved'
    } catch (error) {
      console.log("axios didnt work: " + error)
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = (event.target.type == 'checkbox') ? event.target.checked : event.target.value

    this.setState({
      [name]: value
    }, () => {
      console.log(this.state)
    })
  }

  render () {
    if (this.props.initialData.userData == undefined) {
      return (
        <div>Loading...</div>
      )
    } else {
      return (
        <section id="compose">
          <textarea name="postContent" id="content" cols={30} rows={10} placeholder="share something..." defaultValue={""} onChange={this.handleChange} value={this.state.postContent}/>
          <div className="user-img" style={{
            backgroundImage: `url("${this.props.initialData.userData.profile_img}")`, 
            backgroundPosition: 'center center', 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover'}} />
          <div className="photo-btn">
            <i className="fa fa-camera" />
          </div>
          <div className="video-btn">
            <i className="fa fa-youtube" />
          </div>
          <div className="send-btn" onClick={this.submitPost}>
            <i className="fa fa-arrow-right" />
          </div>
        </section>
      )
    }
  }
}




