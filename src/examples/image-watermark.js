'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');
const os = require('os');
const path = require('path');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');
const outputFilePath = path.join(os.tmpdir(), `image-watermark-${Date.now()}-${Math.random()}.png`);

const params = {

    // The resize mode to use, we support 3 main resizing modes:
    // • scale Resize to within the width and height specified while preserving aspect ratio. In this
    //   mode the width or height will be automatically adjusted to fit the aspect ratio
    // • pad Resize to exactly the width and height specified while preserving aspect ratio and pad
    //   any space left over. Any padded space will be filled in with the 'bg-color' value
    // • crop Resize to exactly the width and height specified while preserving aspect ratio and crop
    //   any space which fall outside the area. The cropping window is centered on the original image
    'resize-mode': 'scale',

    // The output image format, can be either png or jpg
    'format': 'png',

    // If set resize the resulting image to this width (in px)
    'width': '',

    // The URL or Base64 encoded Data URL for the source image. You can also upload an image file
    // directly using multipart/form-data
    'image-url': 'https://www.neutrinoapi.com/img/LOGO.png',

    // The position of the watermark image, possible values are: center, top-left, top-center,
    // top-right, bottom-left, bottom-center, bottom-right
    'position': 'center',

    // The URL or Base64 encoded Data URL for the watermark image. You can also upload an image file
    // directly using multipart/form-data
    'watermark-url': 'https://www.neutrinoapi.com/img/icons/security.png',

    // The opacity of the watermark (0 to 100)
    'opacity': '50',

    // The image background color in hexadecimal notation (e.g. #0000ff). For PNG output the special
    // value of 'transparent' can also be used. For JPG output the default is black (#000000)
    'bg-color': 'transparent',

    // If set resize the resulting image to this height (in px)
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
