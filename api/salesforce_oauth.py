import collections
import getpass

import requests
from simple_salesforce import Salesforce, SalesforceAuthenticationFailed

redirect_uri = input('Enter your Redirect URI: ')
code = input('Enter your Access Code: ')
client_id = input('Enter your Consumer Key: ')
client_secret = input('Enter your Consumer Secret: ')
sandbox = input('Are you logging into a sandbox account (Y/N)? ')
sandbox = sandbox.lower() == 'y'

def get_access_code_and_url(redirect_uri, client_id,
                            client_secret, code, sandbox):
  """Makes a request to the access token endpoint and returns
  the access token and the instance get_access_code_and_url

  Parameters
  ----------
  redirect_uri : str
    the url that Salesforce redirects to. Nees to match the
    configuraiton for the Conncted App
  client_id : str
    the Consumer Key for the Connected App
  client_secret : str
    the Consumer Secret for the Connected App
  code : str
    the access code that is return by the OAuth2 endpoint
  sandbox : bool
    True if we are authenticating to a Sandbox account

  Returns
  -------
  access_token : str
    the access token that we'll use to make subsequent calls
    to the Salesforce API
  instance_url : str
    the instance URL where we'll make requests
  """
  data = {'grant_type': 'authorization_code',
          'redirect_uri': redirect_uri,
          'code': code,
          'client_id' : client_id,
          'client_secret' : client_secret}
  headers = {'content-type': 'application/x-www-form-urlencoded'}
  subdomain = 'test' if sandbox else 'login'
  access_token_url = 'https://{}.salesforce.com/services/oauth2/token'
  access_token_url = access_token_url.format(subdomain)
  req = requests.post(access_token_url, data=data, headers=headers)
  response = req.json()
  return response['access_token'], response['instance_url']

try:
  access_token, instance_url = get_access_code_and_url(redirect_uri,
                                                       client_id,
                                                       client_secret,
                                                       code,
                                                       sandbox)
  salesforce = Salesforce(instance_url=instance_url,
                          session_id=access_token)
  print('\nAuthentication succeeded!')

  results = salesforce.requests.get('/services/data/v46.0/')
  if isinstance(results, collections.OrderedDict):
    print('REST call executed.')
  else:
    print('REST call did not execute.')

except SalesforceAuthenticationFailed:
  print('\nSalesforce API authentication failed.')
