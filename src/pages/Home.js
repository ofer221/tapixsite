import React, { Component } from 'react';
import Nav from "./Nav";
import Header from "./Header";
import Customers from "./Customers";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact"
import Footer from "./Footer";
class Home extends Component {


  render() {
    return (
      <div >
        <Nav/>
        <Header/>
        <Customers/>
        <About images={this.props.mainImages}/>
        <Services images={this.props.toolsImages}/>
        <Contact/>
        <Footer />
      </div>
    );
  }
}

export default Home;
