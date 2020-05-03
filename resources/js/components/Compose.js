import React, { Component } from 'react'
import axios from 'axios'

export default class Compose extends Component {
  constructor () {
    super()
    this.state = { 
      postContent : "", 
      image: ""
    }
  }

  submitPost = async () => {
    const fData = new FormData()
    fData.append('user_id', this.props.initialData.userData.id)
    fData.append('content', this.state.postContent)
    fData.append('image', this.state.image)
    const self = this;

    console.log(fData)
    try {
      const response = await axios({
        method: 'post',
        url: '/posts',
        data: fData, 
        headers: {'Content-Type': `multipart/form-data boundary=${fData._boundary}` }
      }).then (function(response) {
        self.setState({
          postContent: "",
          image: ""
        })
        self.props.update()
        return 'item saved'
      })
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

  imageSelect = (event) => {
    const fileElem = document.getElementById("hidden-input")
    fileElem.click()
  }

  getImage = (event) => {
    this.setState({
      ...this.state,
      image: event.target.files[0]
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
          <textarea name="postContent" id="content" cols={30} rows={10} placeholder="share something..." onChange={this.handleChange} value={this.state.postContent}/>
          <div className="user-img" style={{
            backgroundImage: `url("${this.props.initialData.userData.profile_img}")`, 
            backgroundPosition: 'center center', 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover'}} />
          <div className="photo-btn" onClick={this.imageSelect}>
            <i className="fa fa-camera" />
            <input type='file' id='hidden-input' name='post_img' onChange={this.getImage}/>
          </div>
          {/* <div className="video-btn">
            <i className="fa fa-youtube" />
          </div> */}
          <div className="send-btn" onClick={this.submitPost}>
            <i className="fa fa-arrow-right" />
          </div>
        </section>
      )
    }
  }
}




