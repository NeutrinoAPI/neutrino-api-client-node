'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');
const os = require('os');
const path = require('path');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');
const outputFilePath = path.join(os.tmpdir(), `image-resize-${Date.now()}-${Math.random()}.png`);

const params = {

    // The width to resize to (in px) while preserving aspect ratio
    'width': '32',

    // The output image format, can be either png or jpg
    'format': 'png',

    // The URL or Base64 encoded Data URL for the source image (you can also upload an image file
    // directly in which case this field is ignored)
    'image-url': 'https://www.neutrinoapi.com/img/LOGO.png',

    // The height to resize to (in px) while preserving aspect ratio. If you don't set this field then
    // the height will be automatic based on the requested width and images aspect ratio
    'height': '32'
};

neutrinoAPIClient.imageResize(params, outputFilePath)
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
