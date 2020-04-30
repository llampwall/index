import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import LeftMenu from '../components/LeftMenu'
import Messenger from '../components/Messenger'
import SearchHeader from '../components/SearchHeader'
import PostArea from '../components/PostArea'
import Compose from '../components/Compose'
import Loading from '../components/Loading'



class Layout extends Component {
  constructor () {
    super()
    this.state = {
      userData: {}
    }
  }

  

  componentWillMount() {

    const self = this;
    const getUser = async function() {
      try {
        const userData = await axios.get('/api/intialize')

        self.setState({
          userData: userData.data
        }, () => {
          console.log(self.state.userData)
        })
      } catch (error) {
        console.log(error)
      }
    }

    getUser()
  }

  render () {
    return (
        <div className="app-container home-page">

          <Loading data={(this.state.userData) ? this.state.userData : 'loading'}/>

          <LeftMenu user={this.state.userData}/>

          <section id="content-container">
            <SearchHeader />
            <div className="content-area">
              <Compose user={this.state.userData}/>
              <PostArea user={this.state.userData}/>
            </div>
          </section>

          <Messenger user={this.state.userData}/>
        </div>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
