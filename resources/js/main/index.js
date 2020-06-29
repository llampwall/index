import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route, 
  NavLink
} from 'react-router-dom'
import axios from 'axios'
import Home from '../components/Home'
import Profile from '../components/Profile'
import LeftMenu from '../components/LeftMenu'
import Messenger from '../components/Messenger'
import SearchHeader from '../components/SearchHeader'
import Loading from '../components/Loading'
import Ws from '@adonisjs/websocket-client'
import { ToastContainer, toast, Slide } from 'react-toastify';


class Layout extends Component {
  constructor () {
    super()
    this.state = {
      user: {}
    }

    this.retry = null

    this.homeRef = React.createRef()
    this.leftRef = React.createRef()
    this.msgRef = React.createRef()

    this.ws = Ws()
  }

  // hook up to the websockets
  startChat = () => {
    const self = this

    this.ws.connect() 
    this.chat = this.ws.getSubscription('chat') || this.ws.subscribe('chat')


    // this.check = setInterval(() => {
    //   // console.log(this.ws.ws.readyState);
    //   // console.log(this.ws);
    // }, 10000);

    // reconnect on error
    this.ws.on('error', () => {
      self.retry = setInterval(() => {
        console.log('attempting to reconnect every 10 seconds')
        self.ws = Ws()
        self.ws.connect()
        self.chat = self.ws.getSubscription('chat') || self.ws.subscribe('chat')
        self.chat.on('ready', () => {
          clearInterval(self.retry)
          self.retry = null
        })
      }, 10000);
    })
  }

  componentDidMount() {
    const self = this;
    const getUser = async function() {
      try {
        const user = await axios.get('/api/authuser')

        self.setState({
          user: user.data,
        })
      } catch (error) {
        console.log("Initialization error: " + error)
      }
    }

    if (window.innerWidth > 800) {
      this.setState({
        leftOpen: true,
        rightOpen: true
      })
    }

    this.startChat()
    getUser()

    setTimeout(this.closeNotify, 3000)  // notification bar stays for 3 seconds
  }


  // get rid of notification bar
  closeNotify = () => {
    document.getElementsByClassName('notify')[0].classList.remove('active')
  }

  // clean up chat
  componentWillUnmount() {
    this.ws.close()
  }

  tron = (on) => {
    this.msgRef.current && this.msgRef.current.tron(on)
  }

  // open left menu
  openLeft = () => {
    if (this.msgRef.current.state.open && window.innerWidth <= 800) {
      this.msgRef.current.close()
    }
  }

  // open right menu
  openRight = () => {
    if (this.leftRef.current.state.open && window.innerWidth <= 800) {
      this.leftRef.current.close()
    }
  }

  search = (query) => {
    this.homeRef.current && this.homeRef.current.search(query)
  }

  render () {
    return (
      <Router>
        <div className="app-container home-page">
          
          <ToastContainer
            position="bottom-left"
            transition={Slide}
            autoClose={12000}
            hideProgressBar
            newestOnTop={false}
            rtl={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            limit={5}
            toastClassName="toasty"
          />

          <Loading active={(this.state.user != undefined) ? "" : 'active'}/>

          <LeftMenu user={this.state.user} ws={this.ws} open={this.openLeft} tron={this.tron} ref={this.leftRef} />

          <section id="content-container">

            <SearchHeader searchQuery={this.search}/>
            <Route exact path="/" component={ (props) => <Home routeProps={props} user={this.state.user} ws={this.ws} ref={this.homeRef} single={false}/> }/>
            <Route exact path="/post/:id" component={ (props) => <Home routeProps={props} user={this.state.user} ws={this.ws} ref={this.homeRef} single={true}/> }/>
            <Route exact path="/profile/:id" component={ (props) => <Profile routeProps={props} user={this.state.user} ws={this.ws}/> }/>
          
          </section>

          <Messenger user={this.state.user} ws={this.ws} open={this.openRight} ref={this.msgRef} />
        </div>
      </Router>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
