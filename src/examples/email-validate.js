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
        
        // The domain name of this email address
        console.log('domain:', `'${data['domain']}'`);
        
        // True if this address has any domain name or DNS related errors. Check the 'domain-status' field
        // for the detailed error reason
        console.log('domain-error:', data['domain-error']);
        
        // The email domain status, possible values are:
        // • ok - the domain is in working order and can receive email
        // • invalid - the domain is not a conformant hostname. May contain invalid syntax or characters
        // • no-service - the domain owner has indicated there is no mail service on the domain (also
        //   known as the 'Null MX')
        // • no-mail - the domain has no valid MX records so cannot receive email
        // • mx-invalid - MX records contain invalid or non-conformant hostname values
        // • mx-bogon - MX records point to bogon IP addresses
        // • resolv-error - MX records do not resolve to any valid IP addresses
        console.log('domain-status:', `'${data['domain-status']}'`);
        
        // The complete email address. If you enabled the 'fix-typos' option then this will be the corrected
        // address
        console.log('email:', `'${data['email']}'`);
        
        // True if this address is a disposable, temporary or darknet related email address
        console.log('is-disposable:', data['is-disposable']);
        
        // True if this address is from a free email provider
        console.log('is-freemail:', data['is-freemail']);
        
        // True if this address likely belongs to a person. False if this is a role based address, e.g.
        // admin@, help@, office@, etc.
        console.log('is-personal:', data['is-personal']);
        
        // The first resolved IP address of the primary MX server, may be empty if there are domain errors
        // present
        console.log('mx-ip:', `'${data['mx-ip']}'`);
        
        // The domain name of the email hosting provider
        console.log('provider:', `'${data['provider']}'`);
        
        // True if this address has any syntax errors or is not in RFC compliant formatting
        console.log('syntax-error:', data['syntax-error']);
        
        // True if any typos have been fixed. The 'fix-typos' option must be enabled for this to work
        console.log('typos-fixed:', data['typos-fixed']);
        
        // Is this a valid email address. To be valid an email must have: correct syntax, a registered and
        // active domain name, correct DNS records and operational MX servers
        console.log('valid:', data['valid']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
