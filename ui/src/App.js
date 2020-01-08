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
// Pulls the redirect URL dynamically by looking for the URL of the current page.
const REDIRECT_URL = window.location.protocol + '//' +  window.location.hostname

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
      clientID: null,
      authorizePrefix: '',
      customDomain: '',
    }

    // Bindings for the API request form
    this.handleClientID = this.handleClientID.bind(this);
    this.handleInstanceType = this.handleInstanceType.bind(this);
    this.handleCustomDomain = this.handleCustomDomain.bind(this);
  }

  componentDidMount(){
    let authorizePrefix = sessionStorage.getItem('authorizePrefix') ;
    if(!authorizePrefix){
      authorizePrefix = 'https://login.' ;
    }
    // Pulls the client ID and custom domain from session storage
    this.setState({'clientID': sessionStorage.getItem('clientID'),
      'customDomain': sessionStorage.getItem('customDomain'),
      'authorizePrefix': authorizePrefix}) ;
  }

	handleClientID(event) {
    this.setState({clientID: event.target.value});
    // Store the client ID in session storage so we don't have to type
    // it in again after every page reload
    sessionStorage.setItem('clientID', event.target.value) ;
	}

  handleInstanceType(event) {
		this.setState({authorizePrefix: event.target.value});
    // Store the authorize prefix in session storage so we don't have to type
    // it in again after every page reload
    sessionStorage.setItem('authorizePrefix', event.target.value) ;
  }

  handleCustomDomain(event) {
		this.setState({customDomain: event.target.value});
    // Store the custom domain in session storage so we don't have to type
    // it in again after every page reload
    sessionStorage.setItem('customDomain', event.target.value) ;
  }

  buildAuthorizeURL = () => {
    // Constructs the OAuth2 authorization URL based on the input form.
    // Includes special handling for users that require authentication
    // via custom community URLs.
    let authorizeBaseURL = null ;
    if(this.state.authorizePrefix==='CUSTOM'){
      authorizeBaseURL = this.state.customDomain + '/services/oauth2/authorize' ;
    } else {
      authorizeBaseURL = this.state.authorizePrefix + AUTHORIZE_URL
    }
    let authorizeURL = buildAuthorizeURL(authorizeBaseURL,
                                         REDIRECT_URL,
                                         this.state.clientID) ;
    return authorizeURL
  }

  render() {
    let accessCode = getAccessCode() ;
    // const authorizeBaseURL = "https://shareddemo-hillelcommunity.cs16.force.com/services/oauth2/authorize" ;

    // Renders the access code if code is included as a query parameter
    let accessCodeMessage = null ;
    if(accessCode){
      accessCodeMessage = (<p><b>Access Code:</b> {accessCode}</p>) ;
    }

    // Includes the special form for custom URL if users select that option
    let customDomainForm = null ;
    if(this.state.authorizePrefix==='CUSTOM'){
      customDomainForm = (
        <div>
        <ControlLabel>Custom Domain</ControlLabel>
        <FormControl
          className="input-box"
          value={this.state.customDomain}
          onChange={this.handleCustomDomain}
          type="text"
        />
        </div>
      ) ;
    }

    return (
      <div className="App">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/" className='pull-left'>
                <img src="./fiddler_logo.png" className="image-background" height="40px" alt="" />
              </a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <div className="app-body">
          <Row>
            <Col xs={8} sm={8} md={8} lg={8}>
              <h4>Let's Connect to Salesforce!</h4>
              <p>This page provides instructions for connecting to the Salesforce API using the OAuth2 workflow. OAuth2 enables an app to integrate with Salesforce on behalf of the user without having to store the user's Salesforce credentials.</p>
              <h4>Step 1: Register a Connected App on Salesforce</h4>
              <p>The first step is to register a Connected App on your Salesforce account. To register a Connected App, go to your Setup screen, click "App Manager", and then click "New Connected App" in the top right corner. From there, fill out the basic information for your app, and then check the "Enable OAuth Settings" box. Once that's done, enter <b>{REDIRECT_URL}</b> as the callback URL and move "Full access" over to the "Selected OAuth Scopes".</p>
              <h4>Step 2: Authenticate with Salesforce</h4>
              <p>Use the form to the right to authenticate with Salesforce. Enter your Consumer Key from the Connected App into the first field, and then use the drop down to indicate whether you are authenticating to a production instance or a sandbox instance. Production instances authenticate with <b>https://login.salesforce.com</b>, whereas sandbox instances authenticate with <b>https://test.salesforce.com</b>. If you are using a custom domain, select "Custom" from the drop down and enter your full custom URL into the text field that appears. An example of what the input should look like is <b>{"https://<community-name>.<instance>.force.com"}</b>. When you're ready, hit "Authenticate". The first time you do this, you'll be redirected to a Salesforce login page, which will ask you to authorize the Connected App to make API requests on behalf of your account. Once you've logged in, you'll be redirected back to this page, and an access code will appear below. If you've already authorized the Salesforce integration, this page will simply refresh with an access code.</p>
              {accessCodeMessage}
              <h4>Step 3: Give it a try!</h4>
              <p>Using your access code, you can now make a request to the Salesforce access token endpoint. This will return an access token and instance URL, which you can use to make requests from Salesforce API endpoints. To see how to implement this workflow in Python, check out <a href="https://github.com/MthwRobinson/salesforce-oauth/blob/master/api/salesforce_oauth.py" target="_blank" rel="noopener noreferrer">This file in the GitHub repo</a>. You can try it out in your browser using our <a href="https://repl.it/@FdlrAnalytics/salesforceoauth" target="_blank" rel="noopener noreferrer">repl.it script</a></p>.
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
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
											value={this.state.authorizePrefix}
											onChange={this.handleInstanceType}
										>
                      <option value='https://login.'>Production</option>
                      <option value='https://test.'>Sandbox</option>
                      <option value='CUSTOM'>Custom</option>
										</FormControl>
                    {customDomainForm}
                </FormGroup>
                <Button
                  className="login-button pullRight"
                  bsStyle="primary"
                  href={this.buildAuthorizeURL()}
                >Authenticate</Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
