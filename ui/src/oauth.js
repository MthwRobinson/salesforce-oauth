import axios from 'axios';

function getAccessCode() {
  // Returns that access code that is generated after the
  // OAUTH2 redirect to SalesForce
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let accessCode = params.get('code');
  return accessCode;
}
export { getAccessCode }


function buildAuthorizeURL(authorizeURL, redirectURL, clientID){
  // Creates the full URL for the SalesForce authorization endpoint.
  // After the user authenticates, SalesForce will redirect back to the
  // home page, with an authorization code added as a query parameter.
  //
  // Parameters
  // ----------
  // authorizeUrl : str
  //    the SalesForce authorization endpoint
  // redirectURL : str
  //    the URL of that SalesForce will redirect to after authentication
  // clientID : str
  //    the client ID for the Connected App
  //
  // Returns
  // -------
  // fullAuthorizeURL : str
  //    the full SalesForce authentication URL
  let fullAuthorizeURL = authorizeURL ;
  fullAuthorizeURL += '?response_type=code' ;
  fullAuthorizeURL += '&redirect_uri=' + redirectURL ;
  fullAuthorizeURL += '&client_id=' + clientID ;
  return fullAuthorizeURL ;
}
export { buildAuthorizeURL }


// const instance = axios.create({
//       headers: {'content-type': 'application/x-www-form-urlencoded'}
// });
