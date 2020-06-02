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


class Layout extends Component {
  constructor () {
    super()
    this.state = {
      user: {}
    }

    this.retry = null

    this.homeRef = React.createRef()

    this.ws = Ws()
  }

  startChat = () => {
    const self = this

    this.ws.connect()
    this.chat = this.ws.getSubscription('chat') || this.ws.subscribe('chat')
    this.chat.on('update', function(message) {
      console.log('index got an update!')
      self.homeRef.current.update()
    })
    // reconnect function doesnt work
    // this.ws.on('close', function() {
    //   self.retry = setInterval(() => {
    //     console.log('attempting to reconnect every 10 seconds')
    //     self.ws = null
    //     self.ws = Ws()
    //     self.ws.on('open', () => {
    //       self.ws.connect()
    //       self.chat = self.ws.getSubscription('chat') || self.ws.subscribe('chat')
    //       self.chat.on('ready', () => {
    //         clearInterval(self.retry)
    //         self.retry = null
    //       })
    //     })
    //   }, 10000);
    // })
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

    this.startChat()
    getUser()

    setTimeout(this.closeNotify, 3000)  // notification bar stays for 3 seconds
  }


  // get rid of notification bar
  closeNotify = () => {
    document.getElementsByClassName('notify')[0].classList.remove('active')
  }


  componentWillUnmount() {
    this.ws.close()
  }


  render () {
    return (
      <Router>
        <div className="app-container home-page">

          <Loading active={(this.state.user != undefined) ? "" : 'active'}/>

          <LeftMenu user={this.state.user} ws={this.ws} />

          <section id="content-container">

            <SearchHeader />
            <Route exact path="/" component={ (props) => <Home routeProps={props} user={this.state.user} ws={this.ws} ref={this.homeRef} single={false}/> }/>
            <Route exact path="/post/:id" component={ (props) => <Home routeProps={props} user={this.state.user} ws={this.ws} ref={this.homeRef} single={true}/> }/>
            <Route exact path="/profile/:id" component={ (props) => <Profile routeProps={props} user={this.state.user}/> }/>
          
          </section>

          <Messenger user={this.state.user} ws={this.ws}/>
        </div>
      </Router>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
