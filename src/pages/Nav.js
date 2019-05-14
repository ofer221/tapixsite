import React, { Component } from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import Navbar from 'react-bootstrap/Navbar';
import BNav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image'
import tapixLogo from '../images/tapix-logo.png'

class Nav extends Component {

  render () {
    return (
      <nav>
      <Navbar bg={"light"} variant={"light"} expand={"sm"} fixed={"top"} style={{opacity:0.6,position:"fixed"}}>
        <Navbar.Brand href="/" className=" mb-auto " >
          {/*<img src={tapixLogo} alt="logo" width={120} height={30} className={"d-inline-block align-top"}/>*/}
          {/*<img src={tapixLogo} style={{"max-height":30}} alt="logo" className={"img-fluid"}/>*/}
          <Image src={tapixLogo} width={150} fluid className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <BNav className="ml-auto" >
            <li className="nav-item">
              <AnchorLink href='#contact' className="nav-link">צור קשר</AnchorLink>
            </li>
            <li className="nav-item">
              <AnchorLink href='#services' className="nav-link">שירותים</AnchorLink>
            </li>
            <li className="nav-item">
              <AnchorLink href='#about' className="nav-link">פרופיל</AnchorLink>
            </li>
          </BNav>
        </Navbar.Collapse>


      </Navbar></nav>
    )
  }
}

export default Nav
