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
      create:{
      url: 'api/pentadata/account/',
      version: 'application/json',
      redirect_uri: 'http://localhost:4200/accounts'
    }
    },
    consent:{
      url:'https://sandbox.pentadatainc.com/consents',
      version: 'application/json'
    },
  } //end of api
};
