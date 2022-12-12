'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The security code to verify
    'security-code': '123456',

    // If set then enable additional brute-force protection by limiting the number of attempts by the
    // supplied value. This can be set to any unique identifier you would like to limit by, for example
    // a hash of the users email, phone number or IP address. Requests to this API will be ignored after
    // approximately 10 failed verification attempts
    'limit-by': ''
};

neutrinoAPIClient.verifySecurityCode(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // True if the code is valid
        console.log('verified:', data['verified']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
