'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');
const os = require('os');
const path = require('path');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');
const outputFilePath = path.join(os.tmpdir(), `ip-blocklist-download-${Date.now()}-${Math.random()}.csv`);

const params = {

    // The data format. Can be either CSV or TXT
    'format': 'csv',

    // Include public VPN provider IP addresses, this option is only available for Tier 3 or higher
    // accounts. WARNING: This option will add at least an additional 8 million IP addresses to the
    // download if not using CIDR notation
    'include-vpn': 'false',

    // Output IPs using CIDR notation. This option should be preferred but is off by default for
    // backwards compatibility
    'cidr': 'false',

    // Output the IPv6 version of the blocklist, the default is to output IPv4 only. Note that this
    // option enables CIDR notation too as this is the only notation currently supported for IPv6
    'ip6': 'false'
};

neutrinoAPIClient.ipBlocklistDownload(params, outputFilePath)
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
