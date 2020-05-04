import React, { Component } from 'react'
import axios from 'axios'


// should really generalize and save this component as an axios image uploader
// even has a preview window for the selected image file


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
    if ((this.state.postContent == "") && (this.state.image != "")) {
      fData.append('content', " ")
    } else {
      fData.append('content', this.state.postContent)
    }
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

  // allows posts to be submit with the enter key
  checkSubmit = (event) => {
    if (event.keyCode == 13) {
      event.preventDefault()
      this.submitPost()
    }
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

  removeImage = () => {
    this.setState({
      ...this.state,
      image: ""
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
          <textarea name="postContent" id="content" cols={30} rows={10} placeholder="share something..." onChange={this.handleChange} onKeyUp={this.checkSubmit} value={this.state.postContent}/>
          <div className="user-img" style={{
            backgroundImage: `url("${this.props.initialData.userData.profile_img}")`, 
            backgroundPosition: 'center center', 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover'}} />
          <div className="photo-btn" onClick={this.imageSelect}>
            <i className="fa fa-camera" />
            <input type='file' id='hidden-input' name='post_img' onChange={this.getImage}/>
          </div>
          <div className={`preview ${(this.state.image == "") ? "" : "active"}`} onClick={this.removeImage} style= {{
              backgroundImage: `url("${(this.state.image == "") ? "" : URL.createObjectURL(this.state.image)}")`, 
              backgroundPosition: 'center center', 
              backgroundRepeat: 'no-repeat', 
              backgroundSize: 'cover'}} />
          <div className="send-btn" onClick={this.submitPost}>
            <i className="fa fa-arrow-right" />
          </div>
        </section>
      )
    }
  }
}




