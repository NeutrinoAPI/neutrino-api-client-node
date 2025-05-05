'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The value to convert from (e.g. 10.95)
    'from-value': '100',

    // The type of the value to convert from (e.g. USD)
    'from-type': 'USD',

    // The type to convert to (e.g. EUR)
    'to-type': 'EUR',

    // Convert using the rate on a historical date, accepted date formats are: YYYY-MM-DD, YYYY-MM,
    // YYYY. Historical rates are stored with daily granularity so the date format YYYY-MM-DD is
    // preferred for the highest precision. If an invalid date or a date too far into the past is
    // supplied then the API will respond with 'valid' as false and an empty 'historical-date'
    'historical-date': ''
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
        
        // If a historical conversion was made using the 'historical-date' request option this will contain
        // the exact date used for the conversion in ISO format: YYYY-MM-DD
        console.log('historical-date:', `'${data['historical-date']}'`);
        
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
