'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');
const os = require('os');
const path = require('path');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');
const outputFilePath = path.join(os.tmpdir(), `bin-list-download-${Date.now()}-${Math.random()}.png`);

const params = {

    // Include ISO 3-letter country codes and ISO 3-letter currency codes in the data. These will be
    // added to columns 10 and 11 respectively
    'include-iso3': 'false',

    // Include 8-digit and higher BIN codes. This option includes all 6-digit BINs and all 8-digit and
    // higher BINs (including some 9, 10 and 11 digit BINs where available)
    'include-8digit': 'false',

    // Include all BINs and all available fields in the CSV file (overrides any values set for
    // 'include-iso3' or 'include-8digit')
    'include-all': 'false',

    // Set this option to 'gzip' to have the output file compressed using gzip
    'output-encoding': ''
};

neutrinoAPIClient.binListDownload(params, outputFilePath)
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
