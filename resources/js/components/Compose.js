import React, { Component} from 'react'
import Post from '../components/Post'

export default class Compose extends Component {
  constructor () {
    super()
    this.state = { 
    }
  }

  render () {
    return (
      <section id="compose">
        <textarea name="post" cols={30} rows={10} placeholder="share something..." defaultValue={""} />
        <div className="user-img" style={{background: 'url("/img/welcome.jpg")', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} />
        <div className="photo-btn">
          <i className="fa fa-camera" />
        </div>
        <div className="video-btn">
          <i className="fa fa-youtube" />
        </div>
        <div className="send-btn">
          <i className="fa fa-arrow-right" />
        </div>
      </section>
    )
  }
}




