## Salesforce OAuth Example

This repository contains an example of how to connect to the Salesforce API using OAuth2. Check out the [OAuth2 Docs](https://oauth.net/2/) for more information about how the authentication protocol works. There are two components, a webpage to use in the OAuth2 workflow and Python script that connects to the API once you've retrieved your access code.

### Setup

#### Node

These instructions assume that you have `npm` and Python already installed on your machine. To get started, navigate to the ui folder and run the following commands:

```
npm install
npm run start
```

A website will launch at `http://localhost:3000` that has instructions on how to connect to Salesforce using OAuth2.

### Python

You'll also need to install a few Python packages to run the authentication scripts. To install the dependencies, navigate to the `api` folder and run the following command, preferably in a virtual environment:

```
pip install requirements.txt
```

After installing the dependencies you can run the following command (again from that `api` folder) to execute the OAuth2 example script:

```
python salesforce_oauth.py
```
