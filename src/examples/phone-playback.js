'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The phone number to call. Must be in valid international format
    'number': '+12106100045',

    // Limit the total number of calls allowed to the supplied phone number, if the limit is reached
    // within the TTL then error code 14 will be returned
    'limit': '3',

    // A URL to a valid audio file. Accepted audio formats are:
    // • MP3
    // • WAV
    // • OGG You can use the following MP3 URL for testing:
    //   https://www.neutrinoapi.com/test-files/test1.mp3
    'audio-url': 'https://www.neutrinoapi.com/test-files/test1.mp3',

    // Set the TTL in number of days that the 'limit' option will remember a phone number (the default
    // is 1 day and the maximum is 365 days)
    'limit-ttl': '1'
};

neutrinoAPIClient.phonePlayback(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // True if the call is being made now
        console.log('calling:', data['calling']);
        
        // True if this a valid phone number
        console.log('number-valid:', data['number-valid']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
