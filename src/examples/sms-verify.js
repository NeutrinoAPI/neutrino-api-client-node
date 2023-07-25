'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The phone number to send a verification code to
    'number': '+12106100045',

    // ISO 2-letter country code, assume numbers are based in this country. If not set numbers are
    // assumed to be in international format (with or without the leading + sign)
    'country-code': '',

    // Pass in your own security code. This is useful if you have implemented TOTP or similar 2FA
    // methods. If not set then we will generate a secure random code
    'security-code': '',

    // The language to send the verification code in, available languages are:
    // • de - German
    // • en - English
    // • es - Spanish
    // • fr - French
    // • it - Italian
    // • pt - Portuguese
    // • ru - Russian
    'language-code': 'en',

    // The number of digits to use in the security code (must be between 4 and 12)
    'code-length': '5',

    // Limit the total number of SMS allowed to the supplied phone number, if the limit is reached
    // within the TTL then error code 14 will be returned
    'limit': '10',

    // Set a custom brand or product name in the verification message
    'brand-name': '',

    // Set the TTL in number of days that the 'limit' option will remember a phone number (the default
    // is 1 day and the maximum is 365 days)
    'limit-ttl': '1'
};

neutrinoAPIClient.smsVerify(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // True if this a valid phone number
        console.log('number-valid:', data['number-valid']);
        
        // The security code generated, you can save this code to perform your own verification or you can
        // use the Verify Security Code API
        console.log('security-code:', `'${data['security-code']}'`);
        
        // True if the SMS has been sent
        console.log('sent:', data['sent']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
