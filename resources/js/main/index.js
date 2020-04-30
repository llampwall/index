import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import LeftMenu from '../components/LeftMenu'
import Messenger from '../components/Messenger'
import SearchHeader from '../components/SearchHeader'
import PostArea from '../components/PostArea'
import Compose from '../components/Compose'


class Layout extends Component {
  constructor () {
    super()
    this.state = {
    }
  }

  render () {
    return (
      <div className="app-container home-page">

        <LeftMenu />

        <section id="content-container">
          
          <SearchHeader />

          <div className="content-area">
            <Compose />
            <PostArea />
          </div>

        </section>

        <Messenger />

      </div>
    )
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
