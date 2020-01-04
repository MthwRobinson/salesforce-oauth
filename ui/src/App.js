import React, { Component } from 'react';
import {
  Button,
  ControlLabel,
  Col,
  Form,
  FormControl,
  FormGroup,
  Navbar,
  Row } from 'react-bootstrap';
import { buildAuthorizeURL, getAccessCode } from './oauth';

import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/react-bootstrap-toggle/dist/bootstrap2-toggle.css';

const AUTHORIZE_URL = 'salesforce.com/services/oauth2/authorize'
const REDIRECT_URL = 'http://localhost'

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
      clientID: null,
      authorizePrefix: 'https://login.'
    }

    // Bindings for the API request form
    this.handleClientID = this.handleClientID.bind(this);
    this.handleInstanceType = this.handleInstanceType.bind(this);
  }

	handleClientID(event) {
		this.setState({clientID: event.target.value});
	}

  handleInstanceType(event) {
		this.setState({authorizePrefix: event.target.value});
  }

  render() {
    let accessCode = getAccessCode() ;
    const authorizeBaseURL = this.state.authorizePrefix + AUTHORIZE_URL
    let authorizeURL = buildAuthorizeURL(authorizeBaseURL,
                                         REDIRECT_URL,
                                         this.state.clientID) ;

    let accessCodeMessage = null ;
    if(accessCode){
      accessCodeMessage = (<p><b>Access Code:</b> {accessCode}</p>) ;
    }

    return (
      <div className="App">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/" className='pull-left'>
                <i className="fa fa-cloud"></i>
                <b>{' '}SalesForce API</b>
              </a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <div className="app-body">
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
            <h4>Let's Connect to SalesForce!</h4>
              <p>This page provides instructions for connecting to the SalesForce API using the OAUTH2 workflow. OAUTH2 enables an app to integrate with SalesForce on behalf of the user without having to store the user's SalesForce credentials.</p>
              <h4>Register a Connect App on SalesForce</h4>
              <h4>Authenticate with SalesForce</h4>
              <p>Click <a href={authorizeURL}>this link</a> to authenticate with SalesForce. After you authenticate with SalesForce, you will be redirected back to this page. When SalesForce redirects you, it will include an access code that you can use to interact with SalesForce via the API. You'll see the access code populate below.</p>
            {accessCodeMessage}
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <h4>Obtain an Access Code</h4>
              <Form onSubmit={this.handleSubmit} >
                <FormGroup className="pullLeft">
                    <ControlLabel>Consumer Key</ControlLabel>
                    <FormControl
                      className="input-box"
                      value={this.state.clientID}
                      onChange={this.handleClientID}
                      type="text"
                    />
                    <ControlLabel>Instance Type</ControlLabel>
                    <FormControl
                      className="input-box"
											componentClass="select"
											value={this.state.authorizationPrefix}
											onChange={this.handleInstanceType}
										>
                      <option value='https://login.'>Production</option>
                      <option value='https://test.'>Sandbox</option>
										</FormControl>

                </FormGroup>
                <Button
                  className="login-button pullRight"
                  bsStyle="primary"
                  href={authorizeURL}
                >Submit</Button>
              </Form>
            </Col>
          </Row>

        </div>
      </div>
    );
  }
}

export default App;
