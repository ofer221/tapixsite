import React, { Component } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Footer extends Component {

  render () {
    return (
      <footer id="footer">
        <div className="dark-overlay">
          <Row className={"mt-3 "}>
            <Col md={2} sm={2} xs={2} className={"mr-auto justify-content-start"} >
              <p className="lead copyright ">
                <a
                  href="mailto:ofer221@hotmail.com?subject=The%20subject%20of%20the%20mail">Ofer221</a> &copy; <span id="year">2019</span>
            </p></Col>
          </Row>
        </div>
      </footer>
    )
  }
}

export default Footer
