'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The BIN or IIN number. This is the first 6, 8 or 10 digits of a card number, use 8 (or more)
    // digits for the highest level of accuracy
    'bin-number': '47192100',

    // Pass in the customers IP address and we will return some extra information about them
    'customer-ip': ''
};

neutrinoAPIClient.binLookup(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The BIN or IIN number
        console.log('bin-number:', `'${data['bin-number']}'`);
        
        // The card brand (e.g. Visa or Mastercard)
        console.log('card-brand:', `'${data['card-brand']}'`);
        
        // The card category. There are many different card categories the most common card categories are:
        // CLASSIC, BUSINESS, CORPORATE, PLATINUM, PREPAID
        console.log('card-category:', `'${data['card-category']}'`);
        
        // The card type, will always be one of: DEBIT, CREDIT, CHARGE CARD
        console.log('card-type:', `'${data['card-type']}'`);
        
        // The full country name of the issuer
        console.log('country:', `'${data['country']}'`);
        
        // The ISO 2-letter country code of the issuer
        console.log('country-code:', `'${data['country-code']}'`);
        
        // The ISO 3-letter country code of the issuer
        console.log('country-code3:', `'${data['country-code3']}'`);
        
        // ISO 4217 currency code associated with the country of the issuer
        console.log('currency-code:', `'${data['currency-code']}'`);
        
        // True if the customers IP is listed on one of our blocklists, see the IP Blocklist API
        console.log('ip-blocklisted:', data['ip-blocklisted']);
        
        // An array of strings indicating which blocklists this IP is listed on
        console.log('ip-blocklists:', data['ip-blocklists']);
        
        // The city of the customers IP (if detectable)
        console.log('ip-city:', `'${data['ip-city']}'`);
        
        // The country of the customers IP
        console.log('ip-country:', `'${data['ip-country']}'`);
        
        // The ISO 2-letter country code of the customers IP
        console.log('ip-country-code:', `'${data['ip-country-code']}'`);
        
        // The ISO 3-letter country code of the customers IP
        console.log('ip-country-code3:', `'${data['ip-country-code3']}'`);
        
        // True if the customers IP country matches the BIN country
        console.log('ip-matches-bin:', data['ip-matches-bin']);
        
        // The region of the customers IP (if detectable)
        console.log('ip-region:', `'${data['ip-region']}'`);
        
        // Is this a commercial/business use card
        console.log('is-commercial:', data['is-commercial']);
        
        // Is this a prepaid or prepaid reloadable card
        console.log('is-prepaid:', data['is-prepaid']);
        
        // The card issuer
        console.log('issuer:', `'${data['issuer']}'`);
        
        // The card issuers phone number
        console.log('issuer-phone:', `'${data['issuer-phone']}'`);
        
        // The card issuers website
        console.log('issuer-website:', `'${data['issuer-website']}'`);
        
        // Is this a valid BIN or IIN number
        console.log('valid:', data['valid']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
