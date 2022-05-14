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
      redirect_uri: 'http://localhost:4200/banking?action=accounts'
    },
    transactions:{
      url: 'api/pentadata/accounts/{accountId}/transactions',
      version: 'application/json',
    }

    },
    consent:{
      url:'https://sandbox.pentadatainc.com/consents',
      version: 'application/json'
    },
  } //end of api
};
