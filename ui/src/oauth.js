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


function buildTokenURL(tokenURL, redirectURL, clientID, clientSecret){
  // Buildds the URL for retrieving the access token that is used
  // for subsequent API calls.
  //
  // Parameters
  // ----------
  // tokenURL : str
  //    the url that is used to fetch the access token
  // redirectURL : str
  //    the URL of that SalesForce will redirect to after authentication
  // clientID : str
  //    the client ID for the Connected App
  // clientSecret : str
  //    the client secret for the Connected App
  //
  // Returns
  // -------
  // response : Promise
  //    the axios response, which returns as a promise
  //
  const accessCode = getAccessCode() ;

  let fullTokenURL = tokenURL ;
  fullTokenURL += '?grant_type=authorization_code' ;
  fullTokenURL += '&redirect_uri=' + redirectURL ;
  fullTokenURL += '&code=' + accessCode ;
  fullTokenURL += '&client_id=' + clientID ;
  fullTokenURL += '&client_secret=' + clientSecret ;

  return fullTokenURL
}
export { buildTokenURL }
