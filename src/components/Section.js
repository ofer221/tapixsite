import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import GallerySlider from './GallerySlider'


class Section extends Component {

  render () {
    return (
      <section id={this.props.sectionId}>
        <section className="section-heading mt-3">
          <div className="dark-overlay">
            <Row >
              <Col >
                <Container className="pt-5">
                  <h1>{this.props.sectionTitle}</h1>
                </Container>
              </Col>
            </Row>
          </div>
        </section>

        <Container className="py-5">
          <Row>
            <Col md={6} className={"align-self-center order-"+this.props.textOrder} style={{direction:"rtl"}}>
              {this.props.children}
            </Col>
            <Col md={6}>
              <GallerySlider images={this.props.images}/>
              {/*<img src="img/laptop.png" alt="" className="img-fluid">*/}
            </Col>
          </Row>
        </Container>

      </section>
    )
  }
}
Section.propTypes = {
  sectionId :PropTypes.string,
  sectionTitle :PropTypes.string,
  textOrder :PropTypes.string,
  images:PropTypes.array
}
export default Section
