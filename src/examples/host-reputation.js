'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // An IP address, domain name, FQDN or URL. If you supply a domain/URL it will be checked against
    // the URI DNSBL lists
    'host': 'neutrinoapi.com',

    // Only check lists with this rating or better
    'list-rating': '3',

    // Only check these DNSBL zones/hosts. Multiple zones can be supplied as comma-separated values
    'zones': ''
};

neutrinoAPIClient.hostReputation(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The IP address or host name
        console.log('host:', `'${data['host']}'`);
        
        // Is this host blacklisted
        console.log('is-listed:', data['is-listed']);
        
        // The number of DNSBLs the host is listed on
        console.log('list-count:', data['list-count']);
        
        // Array of objects for each DNSBL checked
        const lists = data['lists'];
        console.log('lists:');
        for (const listsItem of lists) {
            // True if the host is currently black-listed
            console.log('    is-listed:', listsItem['is-listed']);
            // The hostname of the DNSBL
            console.log('    list-host:', `'${listsItem['list-host']}'`);
            // The name of the DNSBL
            console.log('    list-name:', `'${listsItem['list-name']}'`);
            // The list rating [1-3] with 1 being the best rating and 3 the lowest rating
            console.log('    list-rating:', listsItem['list-rating']);
            // The DNSBL server response time in milliseconds
            console.log('    response-time:', listsItem['response-time']);
            // The specific return code for this listing (only set if listed)
            console.log('    return-code:', `'${listsItem['return-code']}'`);
            // The TXT record returned for this listing (only set if listed)
            console.log('    txt-record:', `'${listsItem['txt-record']}'`);
            console.log()
        }
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
