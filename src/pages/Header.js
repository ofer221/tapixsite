import React, { Component } from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Header extends Component {

  render () {
    return (
      <section id="showcase" className="py-5">
        <div className="primary-overlay text-white">
          <Container >
            <Row style={{position:"relative"}}>
              <Col md={{ span: 8, offset: 2 }} className="text-center mt-5" style={{position:"absolute"}}>
                <h1 className=" heading-primary-one display-2 mt-5 pt-5" >
                  תאפיקס
                </h1>
                <h2 className="display-5">חברה לעיבוד שבבי ופרויקטים</h2>
                <p className="lead" style={{direction:"rtl"}}> <span className="heading-primary--sub--add">  .חרושת 50, קרית ביאליק 2751161 טל.048777025 פקס.048777024<span> מייל.Tapix@tapix.co.il</span> </span></p>

                <AnchorLink href='#contact' className="btn btn-outline-secondary btn-lg text-white"><i className="fas fa-phone"></i> צור קשר</AnchorLink>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    )
  }
}

export default Header
