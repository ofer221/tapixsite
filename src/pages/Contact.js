import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import uuidv4 from 'uuid/v4'
import firebase from '../firebase'
import axios from 'axios'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Map from '../components/Map'

function FileUpload (index, file) {
  this.index = index
  this.file = file
  this.percentUploaded = 0
  this.uploadState = ''
  this.uploadTask = null
  this.assignTask = (task) => {
    this.uploadTask = task
  }
  this.assignState = (task) => {
    this.uploadState = task
  }
  this.updateProgres = (progress) => {
    this.percentUploaded = progress
  }
}

class Contact extends Component {


  state = {
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
    formError: false,
    filesError: false,
    errors: '',
    loading: false,
    files: [],
    filesArr: [],
    uploadTask: null,
    uploadState: '',
    storageRef: firebase.storage().ref(),
    percentUploaded: 0,
    currentFileUploading: 0,
    downloadUrls: [],
    currentFilesLocation: '',
    doneAllFiles: false,
    sending: false,
    sent: false
  }

  getName = (e) => {
    let username = e.target.value
    this.setState({
      name: username,
      sent: false,
      formError: false
    })

  }

  getPhone = (e) => {
    let phone = e.target.value
    this.setState({
      phoneNumber: phone,
      sent: false,
      formError: false
    })
  }

  getEmail = (e) => {
    let userEmail = e.target.value

    this.setState({
      email: userEmail,
      sent: false,
      formError: false
    })

  }

  getDescription = (e) => {
    let userMessage = e.target.value
    this.setState({
      message: userMessage,
      sent: false,
      formError: false
    })
  }
  onDrop = (files) => {
    const fileArr = []
    for (let i = 0; i < files.length; i++) {
      fileArr.push(new FileUpload(i, files[i]))
    }
    const allFiles = this.state.filesArr.concat(fileArr)
    let filesSize = 0
    allFiles.forEach(item => {
      filesSize += item.file.size
    })
    if (filesSize > 10000000) {
      this.setState({
        filesError: true,
        filesArr: []
      })

    } else if (allFiles.length > 5) {
      const updatedFiles = this.state.filesArr
      updatedFiles.splice(5, allFiles.length - 1)
      this.setState({
        filesError: true,
        filesArr: updatedFiles
      })
    } else {
      this.setState({
        filesError: false,
        filesArr: allFiles
      })
    }

  }
  removeFile = (index) => {
    const updatedFiles = this.state.filesArr
    updatedFiles.splice(index, 1)
    this.setState({filesArr: updatedFiles})
  }
  submitForm = (e) => {
    e.preventDefault()

    if (this.state.name === '' || this.state.email === '' || this.state.message === '' || this.state.phoneNumber === '') {
      this.setState({
        formError: true,
        errors: 'השלם פרטים חסרים'
      })
      return false
    }
    else if (!this.state.email.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) {
      this.setState({
        formError: true,
        errors: 'כתובת מייל לא תקנית'
      })
      return false
    }
    else {
      this.setState({
        formError: false,
        sending: true,
        sent: false
      })

      const message = {
        time: firebase.database.ServerValue.TIMESTAMP,
        name: this.state.name,
        mail: this.state.email,
        phoneNumber: this.state.phoneNumber,
        content: '\n שם - ' + this.state.name + '\n' + '\n טלפון - ' + this.state.phoneNumber + '\n' + '\n מייל - ' + this.state.email + '\n' + '\n הודעה - ' + this.state.message,

      }

      if (this.state.filesArr.length > 0) {
        this.loopFiles(this.state.filesArr, (res, err) => {
          if (res) {
            let urls = ''
            for (let i = 0; i < this.state.downloadUrls.length; i++) {
              urls += this.state.downloadUrls[i] + '\n\n'
            }
            message.content = message.content + '\n\n קבצים מצורפים להורדה: \n' + urls

            this.sendToServer(message)
          } else if (err) {
            this.setState({errors: err.message, sending: false, sent: true})

          }
        })
      } else {
        this.sendToServer(message)
      }

    }

  }

  sendToServer = (message) => {
    axios.post(process.env.REACT_APP_SEND_MAIL_ENDPOINT, message)
      .catch(err => { this.setState({errors: err.message, sending: false})})
      .then((res) => {
        this.setState({errors: '', sending: false, sent: true, filesArr: []})
      })
  }

  loopFiles = (files, callback) => {
    const storageLocation = uuidv4()
    this.setState({currentFilesLocation: storageLocation})

    files.forEach((file, index) => {
      this.setState({currentFileUploading: index})
      this.uploadFile(file, storageLocation, (res, err) => {
        if (res) {
          if (index === files.length - 1) {
            callback(1, null)
          }
        } else if (err) {
          callback(null, err)

        }
      })
    })
  }

  uploadFile = (file, storageLocation, callback) => {
    this.setState({errors: '', uploadState: 'error', uploadTask: null})
    const filePath = `mail_files/${storageLocation}/${file.file.name}`
    file.assignTask(this.state.storageRef.child(filePath).put(file.file))
    file.uploadTask.on('state_changed', snap => {
      const percentUploaded = Math.round(snap.bytesTransferred / snap.totalBytes) * 100
      file.updateProgres(percentUploaded)
    }, err => {
      callback(null, err)

      this.setState({errors: 'העלאת קבצים נכשלה', uploadState: 'error', uploadTask: null})
    }, () => {
      file.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {

        this.setState({...this.state, downloadUrls: this.state.downloadUrls.concat(downloadUrl), percentUploaded: 0})
        callback(1, null)
      }).catch(err => {
        callback(null, err)
        this.setState({errors: 'העלאת קבצים נכשלה', uploadState: 'error', uploadTask: null})
      })
    })

  }

  render () {
    return (
      <section id="contact" className={'mb-4'}>
        <section className="section-heading mt-3">
          <div className="dark-overlay">
            <Row>
              <Col>
                <Container className="pt-5">
                  <h1>צור קשר</h1>
                </Container>
              </Col>
            </Row>
          </div>
        </section>
        <Container className={'mt-4'}>
          <Row>
            <Col md={4} className={"mb-2"}>
              <Card className="p-2  pb-3">
                <Card.Body>
                  <h4>יצירת קשר</h4>
                  <p>נשמח לעמוד לשירותכם באמצעות מייל, טלפון, פקס, טופס יצירת קשר באתר</p>
                  <h4>כתובת</h4>
                  <p>חרושת 50, קרית ביאליק, מיקוד-2751161</p>
                  <h4>מייל</h4>
                  <p>
                    <span><a
                      href="mailto:Tapix@tapix.co.il?subject=The%20subject%20of%20the%20mail">Tapix@tapix.co.il</a></span>
                  </p>
                  <h4>טלפון</h4>
                  <p>04-8777025</p>
                  <h4>פקס</h4>
                  <p>04-8777024</p>
                  <div className="d-flex justify-content-center">
                    <div className="p-4">
                      <a target="_blank" rel="noopener noreferrer" href="http://facebook.com/TapixLtd/">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </div>
                    <div className="p-4">
                      <a target="_blank" rel="noopener noreferrer" href="http://instagram.com/tapixltd/">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className={'my-auto order-md-0 order-sm-3 '}>
              <Map
                isMarkerShown
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
              />
            </Col>
            <Col md={4} className={'pb-0 mb-2'}>
              <Card className="p-2 pb-4">
                <Card.Body>
                  <h3 className="text-center">
                    טופס יצירת קשר
                  </h3>
                  <hr/>
                  <Row style={{direction: 'rtl'}} >
                    <Col md={12} >
                      <Form.Group>
                        {/*<Form.Label>שם מלא</Form.Label>*/}
                        <Form.Control onChange={this.getName} type="text" placeholder="שם מלא"
                                      style={{direction: 'rtl'}}/>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        {/*<Form.Label>מספר טלפון</Form.Label>*/}
                        <Form.Control onChange={this.getPhone} type="text" placeholder="טלפון"
                                      style={{direction: 'rtl'}}/>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        {/*<Form.Label>כתובת מייל</Form.Label>*/}
                        <Form.Control onChange={this.getEmail} type="email" placeholder="מייל"
                                      style={{direction: 'rtl'}}/>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group>
                        {/*<Form.Label>הודעה</Form.Label>*/}
                        <Form.Control onChange={this.getDescription} as="textarea" rows="5" placeholder="הודעה"/>
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Dropzone onDrop={this.onDrop}>
                        {({getRootProps, getInputProps, isDragActive}) => {
                          return (
                            <Card body {...getRootProps()}>
                              <input {...getInputProps()} />
                              <p style={{'fontSize': 12}} className={'text-muted'}>גרור קבצים לכאן או לחץ לפתיחת
                                קובץ</p>
                              {this.state.filesError ? <p style={{'fontSize': 12, color: '#fb4d3e'}}>
                                מספר קבצים מקסימלי- 5, עד
                                10 מ"ב סה"כ
                              </p> : null}
                            </Card>
                          )
                        }}
                      </Dropzone>
                      {/*<Dropzone className={'dropzone'}*/}
                      {/*accept=".pdf,.x_t,.xt,.docx,.jpeg,.png,.stl"*/}
                      {/*onDrop={(accepted, rejected) => { this.onDrop(accepted) }}>*/}
                      {/*<div className={'dropzone_text'}>*/}
                      {/*<p>גרור קבצים לכאן או לחץ לפתיחת קובץ</p>*/}
                      {/*{this.state.filesError ? <p className={'filesError'}> מספר קבצים מקסימלי- 5, עד 10מ"ב סה"כ </p> : null}*/}
                      {/*</div>*/}
                      {/*<label className="addFileBtn"><i className="fas fa-file-upload"></i></label>*/}
                      {/*</Dropzone>*/}
                    </Col>
                    <Col md={12}>
                      {this.state.formError ?
                        <p style={{'fontSize': 12, color: '#fb4d3e'}}>{this.state.errors}</p> :
                        null}
                    </Col>
                    <Col className="md-12">
                      <ListGroup variant="flush">

                        {this.state.filesArr.map((file, index) => {
                          return (<ListGroup.Item key={index}>
                            <Row>
                              <Col md={10}>
                                <p style={{'fontSize': 10}} className={'file-name'}>{file.file.name}</p>
                              </Col>
                              <Col md={2}>{this.state.filesArr[index].percentUploaded > 0
                              && this.state.filesArr[index].percentUploaded < 100 ?
                                <div className="spinner-border text-info" role="status">
                                  <span className="sr-only">Uploading...</span>
                                </div>
                                : this.state.filesArr[index].percentUploaded === 100 ?
                                  <i className="fas fa-check"></i> : <span
                                    onClick={index => this.removeFile(index)}
                                    className={'fas fa-trash-alt'}></span>}</Col></Row>
                          </ListGroup.Item>)
                        })}

                      </ListGroup>
                    </Col>
                    <Col md={12}>

                      <Button
                        onClick={this.submitForm}
                        variant="outline-info"
                        block
                        className={'mt-3'}
                        disabled={this.state.sent || this.state.sending}>
                        {this.state.sent ?
                          <span><i className="fas fa-check"></i>הודעה נשלחה</span> :
                          this.state.sending ?
                            <span><span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"></span>שולח הודעה</span> :
                            <span>שלח הודעה</span>}
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>

              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Contact
