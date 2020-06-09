import React, { Component } from 'react'
import axios from 'axios'
import imageCompression from 'browser-image-compression'


export default class Compose extends Component {
  constructor () {
    super()
    this.state = { 
      postContent : '', 
      image: '',
      linkUrl: '',
      linkTitle: '',
      linkImage: '',
      linkDesc: ''
    }

    this._isUploading = false
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

    // check for link data and get it
    let {text, link} = await this.checkLink()
    // console.log(text)
    // console.log(link)
    if (text && link != '') {
      fData.append('link_url', this.state.linkUrl)
      fData.append('link_title', this.state.linkTitle)
      fData.append('link_image', this.state.linkImage)
      fData.append('link_desc', this.state.linkDesc)
    }

    if (text == '' && this.state.linkUrl == '') {
      if (this.state.image == '') {
        return
      } else {
        // if there is just an image append a space for the content
        fData.append('content', ' ')
      }
    } else {
      if (text == '' && this.state.linkUrl != '') {
        fData.append('content', ' ')
      } else {
        fData.append('content', text)
      }
    }
    fData.append('user_id', this.props.user.id)

    if (this.state.image == '') {
      fData.append('img_name', '')
      // console.log('no image')
      const response = await axios({
        method: 'post',
        url: '/posts',
        data: fData, 
        headers: {'Content-Type': `multipart/form-data boundary=${fData._boundary}` }
      }).then (function(response) {
        self.setState({
          postContent: "",
          image: "",
          linkUrl: "",
          linkTitle: "",
          linkImage: "",
          linkDesc: ""
        })
        // self.props.update()
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
                image: "", 
                linkUrl: "",
                linkTitle: "",
                linkImage: "",
                linkDesc: ""
              })
              document.getElementById("content").disabled = false   // enable input again
              
              // // update the feed
              // self.props.update()

              //update everyone else's feed
              const chat = self.props.ws.getSubscription('chat') || self.props.ws.subscribe('chat')
              chat.emit('message', {
                update: 'all'
              })

              return 'item saved'

          }).catch(function(err) {
                console.log('upload failed: ' + err)
          })
      } catch (error) {
        console.log("axios didnt work: " + error)
      }
    }
  }

  // upload the file to the server
  uploadFile = async () => {
    const self = this

    this._isUploading = true
    // get signed url from the server
    try {
      const file = self.state.image
      const filename = file.name
      const type = encodeURIComponent(file.type)
      // console.log(filename)
      // console.log(type)

      const response = await axios.get(`/posts/url/${filename}/${type}`)
      .then (async function(response) {   
        // console.log('signed url: ' + response.data)

        // upload file to s3
        var options = {
          headers: {
            'Content-Type': file.type
          }
        }
        axios.put(response.data, file, options)
        .then(async function(response) {
            console.log(response)
            self._isUploading = false
        })
      })
    } catch (error) {
      console.log("failed to upload file: " + error)
    }
    this._isUploading = false
  }

  // check if a link is in the post and update it accordingly
  checkLink = async () => {
      const self = this
      var text = ' '
      var link = ''
      var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
      var regex = new RegExp(expression)
      if(this.state.postContent.length > 0) {
        var data = this.state.postContent.split(' ')
        // console.log(data)
        if (data.length > 0) {
          for (var i=0; i < data.length; i++) {
            if (data[i].match(regex)) {                 // found a url
              var secureUrl = data[i].replace(/^http:\/\//i, 'https://')     // http to https
              try {
                await axios.post(                         // get preview info from link metadata
                  'https://api.linkpreview.net',
                  {
                    q: encodeURIComponent(secureUrl),
                    key: '3f0c5b8e7b6ebf2fb7302a9eaa4c1a1a'
                  }).then(async function(resp) {
                    // console.log(resp.data)

                    var secureImg = resp.data.image.replace(/^http:\/\//i, 'https://')  // http to https

                    self.setState({
                      linkTitle: resp.data.title,
                      linkDesc: resp.data.description,
                      linkImage: secureImg,
                      linkUrl: resp.data.url
                    })
                    link = resp.data.url
                })
              } catch(error) {
                console.log(error)
              }
            } else {
              text += data[i]
              text += ' '
            }
          }
        }
      }
      // console.log('text: ' + text)
      return {text, link}
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

  getImage = async (event) => {

    if (event.target.files[0]) {

      let userFile = event.target.files[0]

      // reject files over 5mb
      if (userFile.size/1024/1024 > 10) {
        alert('Sorry, media files are limited to 10MB.')
        return false
      
      } else  {

        if (userFile.type.substring(0,5) == "image") {

          // compress the image
          try {
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true
            }
            const compressedFile = await imageCompression(userFile, options)
            // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob) // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB

            this.setState({
              image: compressedFile
            }, () => {

              this.uploadFile()

            })
            
          } catch (error) {
            console.log("Error compressing image: " + error)
          }

        } else {    // video file

          this.setState({
            image: userFile
          })

        }
      }
    }
    
  }

  removeImage = () => {
    this.setState({
      ...this.state,
      image: ""
    })
  }

  render () {
    if (this.props.user == undefined) {
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
            backgroundImage: `url("${this.props.user.profile_img}")`, 
            backgroundPosition: 'center center', 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover'}} />
          <div className="photo-btn" onClick={this.imageSelect}>
            <i className="ayn-camera" />
            <input type='file' id='hidden-input' name='post_img' accept="image/png, image/jpeg, image/jpg, image/gif, video/*" onChange={this.getImage}/>
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




