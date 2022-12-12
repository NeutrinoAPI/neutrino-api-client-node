'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');
const os = require('os');
const path = require('path');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');
const outputFilePath = path.join(os.tmpdir(), `image-watermark-${Date.now()}-${Math.random()}.png`);

const params = {

    // The output image format, can be either png or jpg
    'format': 'png',

    // If set resize the resulting image to this width (in px) while preserving aspect ratio
    'width': '',

    // The URL or Base64 encoded Data URL for the source image (you can also upload an image file
    // directly in which case this field is ignored)
    'image-url': 'https://www.neutrinoapi.com/img/LOGO.png',

    // The position of the watermark image, possible values are: center, top-left, top-center,
    // top-right, bottom-left, bottom-center, bottom-right
    'position': 'center',

    // The URL or Base64 encoded Data URL for the watermark image (you can also upload an image file
    // directly in which case this field is ignored)
    'watermark-url': 'https://www.neutrinoapi.com/img/icons/security.png',

    // The opacity of the watermark (0 to 100)
    'opacity': '50',

    // If set resize the resulting image to this height (in px) while preserving aspect ratio
    'height': ''
};

neutrinoAPIClient.imageWatermark(params, outputFilePath)
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
