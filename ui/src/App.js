import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import ReactToolTip from 'react-tooltip';
import Toggle from 'react-bootstrap-toggle';
import axios from 'axios';


import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/react-bootstrap-toggle/dist/bootstrap2-toggle.css';

function App() {
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
      </div>
		</div>
  );
}

export default App;
