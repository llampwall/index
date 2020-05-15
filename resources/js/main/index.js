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

    this.ws = Ws()
    this.homeRef = React.createRef()
    this.chat = this.ws.getSubscription('chat') || this.ws.subscribe('chat')

    const self = this
    this.chat.on('update', function(message) {
      console.log('index got an update!')
      self.homeRef.current.update()
    })
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

    getUser()
  }

  //method to refresh feeds when others post
  update() {
    this.homeRef.current.update()
  }


  render () {
    return (
      <Router>
        <div className="app-container home-page">

          <Loading active={(this.state.initialData != undefined) ? "" : 'active'}/>

          <LeftMenu initialData={this.state.initialData}/>

          <section id="content-container">

            <SearchHeader />
            <Route exact path="/" component={ (props) => <Home routeProps={props} initialData={this.state.initialData} ref={this.homeRef}/> }/>
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
