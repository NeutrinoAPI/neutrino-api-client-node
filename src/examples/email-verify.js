'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // An email address
    'email': 'tech@neutrinoapi.com',

    // Automatically attempt to fix typos in the address
    'fix-typos': 'false'
};

neutrinoAPIClient.emailVerify(params)
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
        
        // True if this email domain has a catch-all policy (it will accept mail for any username)
        console.log('is-catch-all:', data['is-catch-all']);
        
        // True if the mail server responded with a temporary failure (either a 4xx response code or
        // unresponsive server). You can retry this address later, we recommend waiting at least 15 minutes
        // before retrying
        console.log('is-deferred:', data['is-deferred']);
        
        // True if this address is a disposable, temporary or darknet related email address
        console.log('is-disposable:', data['is-disposable']);
        
        // True if this address is a free-mail address
        console.log('is-freemail:', data['is-freemail']);
        
        // True if this address is for a person. False if this is a role based address, e.g. admin@, help@,
        // office@, etc.
        console.log('is-personal:', data['is-personal']);
        
        // The email service provider domain
        console.log('provider:', `'${data['provider']}'`);
        
        // The raw SMTP response message received during verification
        console.log('smtp-response:', `'${data['smtp-response']}'`);
        
        // The SMTP verification status for the address:
        // • ok - SMTP verification was successful, this is a real address that can receive mail
        // • invalid - this is not a valid email address (has either a domain or syntax error)
        // • absent - this address is not registered with the email service provider
        // • unresponsive - the mail server(s) for this address timed-out or refused to open an SMTP
        //   connection
        // • unknown - sorry, we could not reliably determine the real status of this address (this
        //   address may or may not exist)
        console.log('smtp-status:', `'${data['smtp-status']}'`);
        
        // True if this address has a syntax error
        console.log('syntax-error:', data['syntax-error']);
        
        // True if typos have been fixed
        console.log('typos-fixed:', data['typos-fixed']);
        
        // Is this a valid email address (syntax and domain is valid)
        console.log('valid:', data['valid']);
        
        // True if this address has passed SMTP verification. Check the smtp-status and smtp-response fields
        // for specific verification details
        console.log('verified:', data['verified']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
