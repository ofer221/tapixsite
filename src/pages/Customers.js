import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import client1 from '../images/client1.png'
import client2 from '../images/client2.png'
import client3 from '../images/client3.png'
import client4 from '../images/client4.jpg'
import client5 from '../images/client5.png'
import client6 from '../images/client6.jpg'
import client7 from '../images/client7.jpg'
import client8 from '../images/client8.png'

import Slider from "react-slick";

class Customers extends Component {
  settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    pauseOnHover: false,
    swipeToSlide: false,
    draggable:false,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };
  render () {
    return (
      <Container className="container mt-3">
        <Col>
          <Slider {...this.settings}>
            <div>
              <Image src={client1} width={70}   fluid className="d-inline-block align-top m-auto" />
            </div>
            <div>
              <Image src={client2} width={70}  fluid className="d-inline-block align-top m-auto" />
            </div>
            <div>
              <Image src={client3} width={70}  fluid className="d-inline-block align-top m-auto" />
            </div>
            <div>
              <Image src={client4} width={70}  fluid className="d-inline-block align-top m-auto" />
            </div>
            <div>
              <Image src={client5} width={70}  fluid className="d-inline-block align-top mt-1" />
            </div>
            <div>
              <Image src={client6} width={100}  fluid className="d-inline-block align-top mt-1" />
            </div>
            <div>
              <Image src={client7} width={70}  fluid className="d-inline-block align-top  mt-2" />
            </div>
            <div>
              <Image src={client8} width={40}   fluid className="d-inline-block align-top m-auto" />
            </div>
          </Slider>
        </Col>
      </Container>
    )
  }
}

export default Customers
