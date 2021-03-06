import React, { Component } from 'react'
import axios from 'axios'
import { Transition } from 'react-transition-group';


export default class Profile extends Component {
  constructor () {
    super()
    this.state = {
      initialData: {}, 
      user: "",
      edit: false,
      fade: false
    }
  }

  componentDidMount() {
    this.setState({
      initialData: this.props.initialData
    }, () => {
      // console.log(this.state)
    })
    this.getUser()
  }

  getUser = async function() {
    const { match, history, location } = this.props.routeProps
    const self = this;
    let user = ''
    try {
      user = await axios.get(`/api/user/${match.params.id}`)
      // console.log(user)
    } catch(error) {
      console.log(error)
    }

    this.setState({
      ...this.state,
      user: user.data[0]
    }, () => {
      // console.log(this.state)
    })
  }
  
  editBio = () => {
    this.setState({
      ...this.state,
      edit: true
    }, () => {
      // console.log(this.state)
    })
  }

  // value={this.state.comment} onChange={this.handleChange} onKeyUp={this.checkSubmit}

  displayBio = () => {
    if (this.state.user == undefined) {
      return <div>bio loading...</div>
    } else {

      // console.log(this.state.user)
      if (this.state.user.info == "") {
        return (
          <div className="bio">
            <textarea className={`bio-text ${this.state.edit ? 'active' : ''} `} ></textarea>
            <div className='bio-btn' onClick={this.editBio}> Add a bio </div>
          </div>
        )
      } else {
        return (
          <p>{this.state.user.info}</p>
        )
      }
    }
  }

  render () {
    if (this.state.user == undefined) {
      return (
        <div className='load'>
          <i className="ayn-spin3" />
        </div>
      )
    } else {
      // home
      // job
      // education
      // website
      // email
      // about
      // phone?
      // music
      // resume?

      const duration = 300;

      const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
      }

      const transitionStyles = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
      }
      
      return (
        <div className="content-area profile-page">
          <div className='cover'></div>
          <div className="user-img">
            <img src={this.state.user.profile_img} />
            <div className="follow-btn">follow <i className='ayn-bell'></i></div>
            <div className='lower-5th'>
              <h1>{this.state.user.fname} {this.state.user.lname}</h1>
            </div>
          </div>
          <button onClick={() => this.setState({...this.state, fade: true})}>
            Click to Enter
          </button>
          {/* <div className="user-info">
            {this.displayBio()}
          </div> */}
          <Transition in={this.state.fade} timeout={duration}>
            {state => (
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                I'm a fade Transition!
              </div>
            )}
          </Transition>
        </div>
      )
    }
  }
}