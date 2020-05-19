import React, { Component } from 'react'
import axios from 'axios'

// should really generalize and save this component as an axios image uploader
// even has a preview window for the selected image file


export default class Compose extends Component {
  constructor () {
    super()
    this.state = { 
      postContent : '', 
      image: ''
    }
  }


  submitPost = async () => {
    const self = this;
    // deal with just newline case
    if (this.state.postContent == '\n') {
      this.setState({
        ...this.state, 
        postContent: ''
      })
      return
    }

    // get post data
    const fData = new FormData()
    if (this.state.postContent == '') {
      if (this.state.image == '') {
        return
      } else {
        // if there is just an image append a space for the content
        fData.append('content', ' ')
      }
    } else {
      fData.append('content', this.state.postContent)
    }
    fData.append('user_id', this.props.initialData.userData.id)

    if (this.state.image == '') {
      fData.append('img_name', '')
      console.log('no image')
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
        //update everyone else's feed
        const chat = self.props.ws.getSubscription('chat') || self.props.ws.subscribe('chat')
        chat.emit('message', {
          update: 'all'
        })
        return 'item saved'
      })

    } else {      // there is an image or video in the post

      // disable input while image uploads - maybe add loading symbol
      document.getElementById("content").disabled = true
      document.getElementById("content").innerText = 'Loading...'

      // get signed url from the server
      try {
          const file = self.state.image
          const filename = file.name
          const type = encodeURIComponent(file.type)
          // console.log(filename)
          console.log(type)

          // if (filename.split('.').pop() == 'mov') {
          //   console.log('mov file -')
          //   return
          // }

          const response = await axios.get(`/posts/url/${filename}/${type}`)
          .then (async function(response) {   
            console.log('signed url: ' + response.data)

            // upload file to s3
            var options = {
              headers: {
                'Content-Type': file.type
              }
            }
            axios.put(response.data, file, options)
            .then(async function(response) {
                console.log(response)
                
                // store the url in database
                fData.append('img_name', self.state.image.name)
                
                const res = await axios({
                  method: 'post',
                  url: '/posts',
                  data: fData, 
                  headers: {'Content-Type': `multipart/form-data boundary=${fData._boundary}` }
                }).then (function() {
                  self.setState({
                    postContent: "",
                    image: ""
                  })
                  document.getElementById("content").disabled = false   // enable input again
                  self.props.update()

                  //update everyone else's feed
                  const chat = self.props.ws.getSubscription('chat') || self.props.ws.subscribe('chat')
                  chat.emit('message', {
                    update: 'all'
                  })
                  return 'item saved'
                })
              }).catch(function(err) {
                console.log('upload failed: ' + err)
            })

          
        })
      } catch (error) {
        console.log("axios didnt work: " + error)
      }
    }
    
    
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = (event.target.type == 'checkbox') ? event.target.checked : event.target.value

    this.setState({
      [name]: value
    }, () => {
      // console.log(this.state)
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
      // console.log(this.state)
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
        <div className='load'>
          <i className="ayn-spin3" />
        </div>
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
            <i className="ayn-camera" />
            <input type='file' id='hidden-input' name='post_img' accept="image/png, image/jpeg, image/jpg, image/gif, video/mp4, video/webm, video/ogg" onChange={this.getImage}/>
          </div>
          <div className={`preview ${(this.state.image == "") ? "" : "active"}`} onClick={this.removeImage} style= {{
              backgroundImage: `url("${(this.state.image == "") ? "" : URL.createObjectURL(this.state.image)}")`, 
              backgroundPosition: 'center center', 
              backgroundRepeat: 'no-repeat', 
              backgroundSize: 'cover'}} />
          <div className="send-btn" onClick={this.submitPost}>
            <i className="ayn-right" />
          </div>
        </section>
      )
    }
  }
}




