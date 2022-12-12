'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // An email address
    'email': 'tech@neutrinoapi.com',

    // Automatically attempt to fix typos in the address
    'fix-typos': 'false'
};

neutrinoAPIClient.emailValidate(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The email domain
        console.log('domain:', `'${data['domain']}'`);
        
        // True if this address has a domain error (e.g. no valid mail server records)
        console.log('domain-error:', data['domain-error']);
        
        // The email address. If you have used the fix-typos option then this will be the fixed address
        console.log('email:', `'${data['email']}'`);
        
        // True if this address is a disposable, temporary or darknet related email address
        console.log('is-disposable:', data['is-disposable']);
        
        // True if this address is a free-mail address
        console.log('is-freemail:', data['is-freemail']);
        
        // True if this address belongs to a person. False if this is a role based address, e.g. admin@,
        // help@, office@, etc.
        console.log('is-personal:', data['is-personal']);
        
        // The email service provider domain
        console.log('provider:', `'${data['provider']}'`);
        
        // True if this address has a syntax error
        console.log('syntax-error:', data['syntax-error']);
        
        // True if typos have been fixed
        console.log('typos-fixed:', data['typos-fixed']);
        
        // Is this a valid email
        console.log('valid:', data['valid']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
