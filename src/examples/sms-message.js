'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The phone number to send a message to
    'number': '+12106100045',

    // ISO 2-letter country code, assume numbers are based in this country. If not set numbers are
    // assumed to be in international format (with or without the leading + sign)
    'country-code': '',

    // Limit the total number of SMS allowed to the supplied phone number, if the limit is reached
    // within the TTL then error code 14 will be returned
    'limit': '10',

    // The SMS message to send. Messages are truncated to a maximum of 150 characters for ASCII content
    // OR 70 characters for UTF content
    'message': 'Hello, this is a test message!',

    // Set the TTL in number of days that the 'limit' option will remember a phone number (the default
    // is 1 day and the maximum is 365 days)
    'limit-ttl': '1'
};

neutrinoAPIClient.smsMessage(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // True if this a valid phone number
        console.log('number-valid:', data['number-valid']);
        
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
