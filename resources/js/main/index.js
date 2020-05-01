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
      initialData: {},
      refresh: false
    }
  }

  update() {

  }

  componentWillMount() {

    const self = this;
    const getUser = async function() {
      try {
        const data = await axios.get('/api/intialize')
        const allData = data.data
        console.log(allData)

        self.setState({
          initialData: allData
        }, () => {
          console.log(self.state.initialData)
        })
      } catch (error) {
        console.log("This it? " + error)
      }
    }

    getUser()
  }

  render () {
    return (
        <div className="app-container home-page">

          <Loading active={(this.state.initialData != undefined) ? "" : 'active'}/>

          <LeftMenu initialData={this.state.initialData}/>

          <section id="content-container">
            <SearchHeader />
            <div className="content-area">
              <Compose initialData={this.state.initialData}/>
              <PostArea initialData={this.state.initialData}/>
            </div>
          </section>

          <Messenger initialData={this.state.initialData}/>
        </div>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
