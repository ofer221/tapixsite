import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Slider from "react-slick";


export default class GallerySlider extends Component {
  // images = [serviceImg1,serviceImg2,serviceImg3,serviceImg4,serviceImg5,serviceImg6,serviceImg7,serviceImg8]
  render() {
    const settings = {
      dots: false,
      arrows:false,
      infinite: true,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2500,
      pauseOnHover: false,
      swipeToSlide: false,
      draggable:false,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
    };
    return (
      <Container>
        <Col>
        <Slider {...settings}>
          {this.props.images.map((imgSrc,index)=>{
            return (<div className={"p-3"} key={index}><Image src={imgSrc}  fluid className="d-inline-block align-top mx-3 rounded-circle" /></div>)
          })}

        </Slider>
        </Col>
      </Container>
    );
  }
}
