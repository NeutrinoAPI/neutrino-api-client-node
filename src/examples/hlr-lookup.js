'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // A phone number
    'number': '+12106100045',

    // ISO 2-letter country code, assume numbers are based in this country. If not set numbers are
    // assumed to be in international format (with or without the leading + sign)
    'country-code': ''
};

neutrinoAPIClient.hlrLookup(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The phone number country
        console.log('country:', `'${data['country']}'`);
        
        // The number location as an ISO 2-letter country code
        console.log('country-code:', `'${data['country-code']}'`);
        
        // The number location as an ISO 3-letter country code
        console.log('country-code3:', `'${data['country-code3']}'`);
        
        // ISO 4217 currency code associated with the country
        console.log('currency-code:', `'${data['currency-code']}'`);
        
        // The currently used network/carrier name
        console.log('current-network:', `'${data['current-network']}'`);
        
        // The HLR lookup status, possible values are:
        // • ok - the HLR lookup was successful and the device is connected
        // • absent - the number was once registered but the device has been switched off or out of
        //   network range for some time
        // • unknown - the number is not known by the mobile network
        // • invalid - the number is not a valid mobile MSISDN number
        // • fixed-line - the number is a registered fixed-line not mobile
        // • voip - the number has been detected as a VOIP line
        // • failed - the HLR lookup has failed, we could not determine the real status of this number
        console.log('hlr-status:', `'${data['hlr-status']}'`);
        
        // Was the HLR lookup successful. If true then this is a working and registered cell-phone or mobile
        // device (SMS and phone calls will be delivered)
        console.log('hlr-valid:', data['hlr-valid']);
        
        // The mobile IMSI number (International Mobile Subscriber Identity)
        console.log('imsi:', `'${data['imsi']}'`);
        
        // The international calling code
        console.log('international-calling-code:', `'${data['international-calling-code']}'`);
        
        // The number represented in full international format
        console.log('international-number:', `'${data['international-number']}'`);
        
        // True if this is a mobile number (only true with 100% certainty, if the number type is unknown
        // this value will be false)
        console.log('is-mobile:', data['is-mobile']);
        
        // Has this number been ported to another network
        console.log('is-ported:', data['is-ported']);
        
        // Is this number currently roaming from its origin country
        console.log('is-roaming:', data['is-roaming']);
        
        // The number represented in local dialing format
        console.log('local-number:', `'${data['local-number']}'`);
        
        // The number location. Could be a city, region or country depending on the type of number
        console.log('location:', `'${data['location']}'`);
        
        // The mobile MCC number (Mobile Country Code)
        console.log('mcc:', `'${data['mcc']}'`);
        
        // The mobile MNC number (Mobile Network Code)
        console.log('mnc:', `'${data['mnc']}'`);
        
        // The mobile MSC number (Mobile Switching Center)
        console.log('msc:', `'${data['msc']}'`);
        
        // The mobile MSIN number (Mobile Subscription Identification Number)
        console.log('msin:', `'${data['msin']}'`);
        
        // The number type, possible values are:
        // • mobile
        // • fixed-line
        // • premium-rate
        // • toll-free
        // • voip
        // • unknown
        console.log('number-type:', `'${data['number-type']}'`);
        
        // True if this a valid phone number
        console.log('number-valid:', data['number-valid']);
        
        // The origin network/carrier name
        console.log('origin-network:', `'${data['origin-network']}'`);
        
        // The ported to network/carrier name (only set if the number has been ported)
        console.log('ported-network:', `'${data['ported-network']}'`);
        
        // If the number is currently roaming, the ISO 2-letter country code of the roaming in country
        console.log('roaming-country-code:', `'${data['roaming-country-code']}'`);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
