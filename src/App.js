import React, { Component } from 'react'
import './App.css'
import firebase from './firebase'
import Home from './pages/Home'

class App extends Component {
  state={
    mainGalleryImages:[],
    toolsGalleryImages:[]
  }
  componentDidMount () {
    this.updateGallery('mainGalleryImages', 'images/main-gallery')
    this.updateGallery('toolsGalleryImages', 'images/tools-gallery')
  }
  updateGallery = (galleryName, galleryPath) => {
    firebase.database().ref(galleryPath).once('value').then((snapshot) => {
      //console.log(snapshot.val())
      const urlArr = []
      for (let key in snapshot.val()) {
        urlArr.push(snapshot.val()[key])
        //  urlArr.push(snapshot.val()[key]);
      }
      this.setState({
        [galleryName]: urlArr
      })
    })
  }

  render () {
    return (
      <div className="App">
        <Home mainImages={this.state.mainGalleryImages} toolsImages={this.state.toolsGalleryImages}/>
      </div>
    )
  }
}

export default App
