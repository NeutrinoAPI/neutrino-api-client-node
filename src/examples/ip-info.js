'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // An IPv4 or IPv6 address. Accepts standard IP notation and also CIDR notation
    'ip': '1.1.1.1',

    // Do a reverse DNS (PTR) lookup. This option can add extra delay to the request so only use it if
    // you need it
    'reverse-lookup': 'false'
};

neutrinoAPIClient.ipInfo(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // Name of the city (if detectable)
        console.log('city:', `'${data['city']}'`);
        
        // ISO 2-letter continent code
        console.log('continent-code:', `'${data['continent-code']}'`);
        
        // Full country name
        console.log('country:', `'${data['country']}'`);
        
        // ISO 2-letter country code
        console.log('country-code:', `'${data['country-code']}'`);
        
        // ISO 3-letter country code
        console.log('country-code3:', `'${data['country-code3']}'`);
        
        // ISO 4217 currency code associated with the country
        console.log('currency-code:', `'${data['currency-code']}'`);
        
        // The IPs host domain (only set if reverse-lookup has been used)
        console.log('host-domain:', `'${data['host-domain']}'`);
        
        // The IPs full hostname (only set if reverse-lookup has been used)
        console.log('hostname:', `'${data['hostname']}'`);
        
        // The IPv4 or IPv6 address returned
        console.log('ip:', `'${data['ip']}'`);
        
        // True if this is a bogon IP address such as a private network, local network or reserved address
        console.log('is-bogon:', data['is-bogon']);
        
        // True if this is a IPv4 mapped IPv6 address
        console.log('is-v4-mapped:', data['is-v4-mapped']);
        
        // True if this is a IPv6 address. False if IPv4
        console.log('is-v6:', data['is-v6']);
        
        // The ISO 2-letter language code for the official language spoken in the country
        console.log('language-code:', `'${data['language-code']}'`);
        
        // Location latitude
        console.log('latitude:', data['latitude']);
        
        // Location longitude
        console.log('longitude:', data['longitude']);
        
        // Name of the region (if detectable)
        console.log('region:', `'${data['region']}'`);
        
        // ISO 3166-2 region code (if detectable)
        console.log('region-code:', `'${data['region-code']}'`);
        
        // Structure of timezone
        console.log('timezone:', data['timezone']);
        
        // True if this is a valid IPv4 or IPv6 address
        console.log('valid:', data['valid']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
