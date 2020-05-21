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
      initialData: {}
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
    // this.ws.on('close', function() {
    //   self.retry = setInterval(() => {
    //     console.log('attempting to reconnect every 10 seconds')
    //     self.ws = null
    //     self.ws = Ws()
    //     self.ws.connect()
    //     self.chat = self.ws.getSubscription('chat') || self.ws.subscribe('chat')
    //     self.chat.on('ready', () => {
    //       clearInterval(self.retry)
    //       self.retry = null
    //     })
    //   }, 10000);
    // })
  }

  componentDidMount() {

    const self = this;
    const getUser = async function() {
      try {
        const data = await axios.get('/api/intialize')
        const allData = data.data
        // console.log(allData)

        self.setState({
          initialData: allData
        }, () => {
          // console.log(self.state.initialData)
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

  //method to refresh feeds when others post
  update() {
    this.homeRef.current.update()
  }

  componentWillUnmount() {
    this.ws.close()
  }


  render () {
    return (
      <Router>
        <div className="app-container home-page">

          <Loading active={(this.state.initialData != undefined) ? "" : 'active'}/>

          <LeftMenu initialData={this.state.initialData} ws={this.ws}/>

          <section id="content-container">

            <SearchHeader />
            <Route exact path="/" component={ (props) => <Home routeProps={props} initialData={this.state.initialData} ws={this.ws} ref={this.homeRef}/> }/>
            <Route exact path="/profile/:id" component={ (props) => <Profile routeProps={props} initialData={this.state.initialData}/> }/>
          
          </section>

          <Messenger initialData={this.state.initialData} ws={this.ws}/>
        </div>
      </Router>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
