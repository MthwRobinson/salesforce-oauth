import React from 'react';
import { Navbar } from 'react-bootstrap';
import { buildAuthorizeURL, getAccessCode } from './oauth';

import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/react-bootstrap-toggle/dist/bootstrap2-toggle.css';

const AUTHORIZE_URL = 'https://login.salesforce.com/services/oauth2/authorize'
const REDIRECT_URL = 'http://localhost'
const CLIENT_ID = '3MVG9LBJLApeX_PALNAqPimqAftXQLHzwH_ZUXRKh7UC6eAWLmd8Gp8kOmEHJOBJ97wDank4abH5SWrZNfXAD'

function App() {
  let accessCode = getAccessCode() ;
  let authorizeURL = buildAuthorizeURL(AUTHORIZE_URL, REDIRECT_URL, CLIENT_ID) ;

  let accessCodeMessage = null ;
  if(accessCode){
    accessCodeMessage = (<ul><li>Access Code: {accessCode}</li></ul>) ;
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
        <h3>Let's Connect to SalesForce!</h3>
        <p>This page provides instructions for connecting to the SalesForce API using the OAUTH2 workflow. OAUTH2 enables an app to integrate with SalesForce on behalf of the user without having to store the user's SalesForce credentials.</p>
        <h4>Register a Connect App on SalesForce</h4>
        <h4>Authenticate with SalesForce</h4>
        <p>Click <a href={authorizeURL}>this link</a> to authenticate with SalesForce. After you authenticate with SalesForce, you will be redirected back to this page. When SalesForce redirects you, it will include an access code that you can use to interact with SalesForce via the API. You'll see the access code populate below.</p>
        {accessCodeMessage}
      </div>
		</div>
  );
}

export default App;