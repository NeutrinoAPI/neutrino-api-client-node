'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');
const os = require('os');
const path = require('path');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');
const outputFilePath = path.join(os.tmpdir(), `html-clean-${Date.now()}-${Math.random()}.txt`);

const params = {

    // The level of sanitization, possible values are: plain-text: reduce the content to plain text only
    // (no HTML tags at all) simple-text: allow only very basic text formatting tags like b, em, i,
    // strong, u basic-html: allow advanced text formatting and hyper links basic-html-with-images: same
    // as basic html but also allows image tags advanced-html: same as basic html with images but also
    // allows many more common HTML tags like table, ul, dl, pre
    'output-type': 'plain-text',

    // The HTML content. This can be either a URL to load from, a file upload or an HTML content string
    'content': '<div>Some HTML to clean...</div><script>alert()</script>'
};

neutrinoAPIClient.htmlClean(params, outputFilePath)
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
