import React, { Component} from 'react'
import Post from '../components/Post'

export default class PostArea extends Component {
  constructor () {
    super()
    this.state = { 
    }
  }

  render () {
    return (
        <section id="all-posts">
            <div className="post-container">
                <Post user={this.props.user}/>
                <Post user={this.props.user}/>
            </div>
        </section>
    )
  }
}




