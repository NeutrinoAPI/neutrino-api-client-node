'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');
const os = require('os');
const path = require('path');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');
const outputFilePath = path.join(os.tmpdir(), `image-resize-${Date.now()}-${Math.random()}.png`);

const params = {

    // The resize mode to use, we support 3 main resizing modes:
    // • scale Resize to within the width and height specified while preserving aspect ratio. In this
    //   mode the width or height will be automatically adjusted to fit the aspect ratio
    // • pad Resize to exactly the width and height specified while preserving aspect ratio and pad
    //   any space left over. Any padded space will be filled in with the 'bg-color' value
    // • crop Resize to exactly the width and height specified while preserving aspect ratio and crop
    //   any space which fall outside the area. The cropping window is centered on the original image
    'resize-mode': 'scale',

    // The width to resize to (in px)
    'width': '32',

    // The output image format, can be either png or jpg
    'format': 'png',

    // The URL or Base64 encoded Data URL for the source image. You can also upload an image file
    // directly using multipart/form-data
    'image-url': 'https://www.neutrinoapi.com/img/LOGO.png',

    // The image background color in hexadecimal notation (e.g. #0000ff). For PNG output the special
    // value of 'transparent' can also be used. For JPG output the default is black (#000000)
    'bg-color': 'transparent',

    // The height to resize to (in px). If you don't set this field then the height will be automatic
    // based on the requested width and image aspect ratio
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
