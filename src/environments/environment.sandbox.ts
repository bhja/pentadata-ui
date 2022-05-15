export const environment = {
  production: false,
  api: {
    institutions: {
      //Uses a proxy configuration for sandbox . Refer the proxy.conf.json under src
      url: 'api/pentadata/institutions/?filter=',
      version: 'application/json',
    },
    person:{
      create: {
        url : 'api/pentadata/person/',
        version: 'application/json'
      },
      consent_banking:{
        url : 'api/pentadata/person/consent/signature/{personId}/banking',
        version: 'application/json'
      }
    },
    account:{
      retrieve:{
        url: 'api/pentadata/accounts/{personId}',
        version: 'application/json',
      },
      create:{
      url: 'api/pentadata/accounts/',
      version: 'application/json',
      redirect_uri: 'http://www.google.com'
    },
    transactions:{
      url: 'api/pentadata/accounts/{accountId}/transactions',
      version: 'application/json',
    }

    },
    consent:{
      url:'https://api.pentadatainc.com/consents',
      version: 'application/json'
    },
    user:{
      url:'api/user?email=',
      version: 'application/json'
    }
  } //end of api
};
