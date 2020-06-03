import React, { Component } from 'react'
import axios from 'axios'
import { Transition } from 'react-transition-group';


export default class Profile extends Component {
  constructor () {
    super()
    this.state = {
      user: "",
      edit: false,
      image: ""
    }
  }

  componentDidMount() {
    this.getUser()

    var profile = document.querySelector(".profile");
    profile.classList.add("pre-enter");
    setTimeout(function(){
      profile.classList.add("on-enter");
    }, 500);
    setTimeout(function(){
      profile.classList.remove("pre-enter");
      profile.classList.remove("on-enter");
    }, 3000);
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

    var image = user.data[0].profile_img
    if (image.slice(-6) == 'normal') {
      image = image.replace('normal', 'large')
    }

    this.setState({
      ...this.state,
      user: user.data[0],
      image: image
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
    // if (this.state.user == undefined) {
    //   return <div>bio loading...</div>
    // } else {

    //   // console.log(this.state.user)
    //   if (this.state.user.info == "") {
    //     return (
    //       <div className="bio">
    //         <textarea className={`bio-text ${this.state.edit ? 'active' : ''} `} ></textarea>
    //         <div className='bio-btn' onClick={this.editBio}> Add a bio </div>
    //       </div>
    //     )
    //   } else {
    //     return (
    //       <p>{this.state.user.info}</p>
    //     )
    //   }
    // }
    return (
      <main className="profile" onTouchStart={()=>true}>
        <div className="background"></div>
        <aside className="avatar" style={{ background: `url('${this.state.user.profile_img}') no-repeat center center / cover`}}></aside>
        <section className="info">
          <h1>{this.state.user.fname} {this.state.user.lname}</h1>
          <h2>UI Designer</h2>
          <a className="follow">+ Follow</a>
          <ul>
            <li>
              <a className="link portfolio" href="http://gabriellew.ee/" target="_blank">
                <svg viewBox="0 0 85 85">
                  <path d="M18.3,22.8 L18.3,19.6 C18.3,12.7 24,7 30.9,7 L54.6,7 C61.5,7 67.2,12.7 67.2,19.6 L67.2,22.8 M32.9000008,49.0999985 L52.5000008,49.0999985 M3.00000001,61.5999985 L82.3000031,61.5999985 M70.9987628,78 L14.2997944,78 C8.09990721,78 3,72.9 3,66.7 L3,34.4 C3,28.2 8.09990721,23.1 14.2997944,23.1 L70.9987628,23.1 C77.19865,23.1 82.2985572,28.2 82.2985572,34.4 L82.2985572,66.7 C82.3985554,72.9 77.2986482,78 70.9987628,78 Z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a className="link codepen" href="https://codepen.io/gabriellewee/" target="_blank">
                <svg viewBox="0 0 85 85">
                  <path d="M82.5,29.1666667 L42.5,2.5 L2.5,29.1666667 L2.5,55.8922001 L42.5,82.5 L82.5,55.8922001 L82.5,29.1666667 Z M42.5,2.9120677 L42.5,29.1666667 L42.5,2.9120677 Z M42.5,55.8922001 L42.5,82.5 L42.5,55.8922001 Z M2.5,29.1666667 L2.5,55.8922001 L42.5,29.1666667 L82.5,55.8922001 L82.5,29.1666667 L42.5,55.8922001 L2.5,29.1666667 Z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a className="link github" href="https://github.com/elletricity/" target="_blank">
                <svg viewBox="0 0 85 85">
                  <path className="fill" d="M76.7 19c1.1-4.8 0.6-10.1-1.6-15 -0.7-1.7-2.3-2.9-4.2-3 -0.5-0.1-1.1-0.1-1.6-0.1 -4.6 0-10.7 1.6-15 5C50.4 5 46.4 4.6 42.5 4.6V4.4c-3.9 0-7.9 0.4-11.8 1.3 -4.3-3.4-10.4-5-15-5 -0.5 0-1.1 0-1.6 0.1 -1.9 0.1-3.5 1.3-4.2 3C7.7 8.7 7.2 14 8.3 18.8c-3.3 4.4-5 9.6-5 15.4 0 12.5 4.2 21.4 12.5 26.4 2.6 1.6 5.6 2.9 9 3.7 -0.6 1.7-0.9 3.7-0.9 6.1v11.2h0c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5l0-11c0-4.5 1.5-7.7 4.5-9.7 -1.5-0.1-3.2-0.3-5.2-0.8 -3.8-0.7-7-1.9-9.7-3.6C11.6 52.4 8.3 45.1 8.3 34.4c0-5.6 1.9-10.3 5.6-14.3 -1.7-4.4-1.4-9.6 0.6-14.3 0.4 0 0.8 0 1.2 0 4.9 0 10.8 2.2 13.5 5.5 4.5-1.2 9-1.8 13.3-1.8v0.1c4.3 0 8.8 0.6 13.3 1.8 2.7-3.3 8.6-5.5 13.5-5.5 0.4 0 0.8 0 1.2 0 2 4.7 2.3 9.9 0.6 14.3 3.7 4 5.6 8.7 5.6 14.3 0 10.7-3.3 18-10.2 22.2 -2.7 1.7-5.9 2.9-9.7 3.6 -2 0.5-3.7 0.7-5.2 0.8 3 2 4.5 5.2 4.5 9.7l0 11c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5h0V70.6c0-2.4-0.3-4.4-0.9-6.1 3.4-0.8 6.4-2.1 9-3.7 8.3-5 12.5-13.9 12.5-26.4C81.7 28.6 80 23.4 76.7 19z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </section>
      </main>

    )
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
      
      return (
        <div className="content-area profile-page">
          <div className='cover'></div>
          <div className="user-img">
            <img src={this.state.image} />
            <div className="follow-btn">follow <i className='ayn-bell'></i></div>
            {/* <div className='lower-5th'>
              <h1>{this.state.user.fname} {this.state.user.lname}</h1>
            </div> */}
          </div>
          <div className="user-info">
            {this.displayBio()}
          </div>
        </div>
      )
    }
  }
}