'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // A phone number. This can be in international format (E.164) or local format. If passing local
    // format you must also set either the 'country-code' OR 'ip' options as well
    'number': '+6495552000',

    // ISO 2-letter country code, assume numbers are based in this country. If not set numbers are
    // assumed to be in international format (with or without the leading + sign)
    'country-code': '',

    // Pass in a users IP address and we will assume numbers are based in the country of the IP address
    'ip': ''
};

neutrinoAPIClient.phoneValidate(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The phone number country
        console.log('country:', `'${data['country']}'`);
        
        // The phone number country as an ISO 2-letter country code
        console.log('country-code:', `'${data['country-code']}'`);
        
        // The phone number country as an ISO 3-letter country code
        console.log('country-code3:', `'${data['country-code3']}'`);
        
        // ISO 4217 currency code associated with the country
        console.log('currency-code:', `'${data['currency-code']}'`);
        
        // The international calling code
        console.log('international-calling-code:', `'${data['international-calling-code']}'`);
        
        // The number represented in full international format (E.164)
        console.log('international-number:', `'${data['international-number']}'`);
        
        // True if this is a mobile number. If the number type is unknown this value will be false
        console.log('is-mobile:', data['is-mobile']);
        
        // The number represented in local dialing format
        console.log('local-number:', `'${data['local-number']}'`);
        
        // The phone number location. Could be the city, region or country depending on the type of number
        console.log('location:', `'${data['location']}'`);
        
        // The network/carrier who owns the prefix (this only works for some countries, use HLR lookup for
        // global network detection)
        console.log('prefix-network:', `'${data['prefix-network']}'`);
        
        // The number type based on the number prefix. Possible values are:
        // • mobile
        // • fixed-line
        // • premium-rate
        // • toll-free
        // • voip
        // • unknown (use HLR lookup)
        console.log('type:', `'${data['type']}'`);
        
        // Is this a valid phone number
        console.log('valid:', data['valid']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
