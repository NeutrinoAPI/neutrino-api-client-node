'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');
const os = require('os');
const path = require('path');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');
const outputFilePath = path.join(os.tmpdir(), `qr-code-${Date.now()}-${Math.random()}.png`);

const params = {

    // The width of the QR code (in px)
    'width': '256',

    // The QR code foreground color
    'fg-color': '#000000',

    // The QR code background color
    'bg-color': '#ffffff',

    // The content to encode into the QR code (e.g. a URL or a phone number)
    'content': 'https://www.neutrinoapi.com/signup/',

    // The height of the QR code (in px)
    'height': '256'
};

neutrinoAPIClient.qrCode(params, outputFilePath)
    .then((apiResponse) => {
        console.log('API Response OK, output saved to:', apiResponse.file);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
