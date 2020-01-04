import collections
import getpass
from simple_salesforce import Salesforce, SalesforceAuthenticationFailed

username = input('Enter your user name: ')
password = getpass.getpass('Enter your password: ')
security_token = input('Enter your security token: ')
instance = input('Enter your domain: ')
sandbox = input('Are you logging into a sandbox account (Y/N)? ')

domain = 'test' if sandbox.lower() == 'y' else 'login'

try:
  salesforce = Salesforce(username=username,
                          password=password,
                          security_token=security_token,
                          instance=instance,
                          domain=domain)
  print('\nAuthentication succeeded!')

  results = salesforce.requests.get('/services/data/v46.0/')
  if isinstance(results, collections.OrderedDict):
    print('REST call executed.')
  else:
    print('REST call did not execute.')

except SalesforceAuthenticationFailed:
  print('\nSalesforce API authentication failed.')
