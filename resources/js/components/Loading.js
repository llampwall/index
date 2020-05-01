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
            <div className="loadingio-spinner-ball-u501e4ya8ji"><div className="ldio-vn3lighz4w">
<div></div>
</div></div>
      </section>
    )
  }
}