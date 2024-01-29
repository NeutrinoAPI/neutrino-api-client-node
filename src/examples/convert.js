'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The value to convert from (e.g. 10.95)
    'from-value': '100',

    // The type of the value to convert from (e.g. USD)
    'from-type': 'USD',

    // The type to convert to (e.g. EUR)
    'to-type': 'EUR'
};

neutrinoAPIClient.convert(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The full name of the type being converted from
        console.log('from-name:', `'${data['from-name']}'`);
        
        // The standard UTF-8 symbol used to represent the type being converted from
        console.log('from-symbol:', `'${data['from-symbol']}'`);
        
        // The type of the value being converted from
        console.log('from-type:', `'${data['from-type']}'`);
        
        // The value being converted from
        console.log('from-value:', `'${data['from-value']}'`);
        
        // The result of the conversion in string format
        console.log('result:', `'${data['result']}'`);
        
        // The result of the conversion as a floating-point number
        console.log('result-float:', data['result-float']);
        
        // The full name of the type being converted to
        console.log('to-name:', `'${data['to-name']}'`);
        
        // The standard UTF-8 symbol used to represent the type being converted to
        console.log('to-symbol:', `'${data['to-symbol']}'`);
        
        // The type being converted to
        console.log('to-type:', `'${data['to-type']}'`);
        
        // True if the conversion was successful and produced a valid result
        console.log('valid:', data['valid']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
