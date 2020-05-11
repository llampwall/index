import React, { Component} from 'react'

export default class Loading extends Component {
  constructor () {
    super()
    this.state = { 
    }
  }

  render () {
    return (
      <section id="loading" className={this.props.active}>
           <i className="ayn-spin3" />
      </section>
    )
  }
}