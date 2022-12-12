'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The full address, partial address or name of a place to try and locate. Comma separated address
    // components are preferred.
    'address': '1 Molesworth Street, Thorndon, Wellington 6011',

    // The house/building number to locate
    'house-number': '',

    // The street/road name to locate
    'street': '',

    // The city/town name to locate
    'city': '',

    // The county/region name to locate
    'county': '',

    // The state name to locate
    'state': '',

    // The postal code to locate
    'postal-code': '',

    // Limit result to this country (the default is no country bias)
    'country-code': '',

    // The language to display results in, available languages are:
    // • de, en, es, fr, it, pt, ru, zh
    'language-code': 'en',

    // If no matches are found for the given address, start performing a recursive fuzzy search until a
    // geolocation is found. This option is recommended for processing user input or implementing
    // auto-complete. We use a combination of approximate string matching and data cleansing to find
    // possible location matches
    'fuzzy-search': 'false'
};

neutrinoAPIClient.geocodeAddress(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The number of possible matching locations found
        console.log('found:', data['found']);
        
        // Array of matching location objects
        const locations = data['locations'];
        console.log('locations:');
        for (const locationsItem of locations) {
            // The fully formatted address
            console.log('    address:', `'${locationsItem['address']}'`);
            // The components which make up the address such as road, city, state, etc
            console.log('    address-components:', locationsItem['address-components']);
            // The city of the location
            console.log('    city:', `'${locationsItem['city']}'`);
            // The country of the location
            console.log('    country:', `'${locationsItem['country']}'`);
            // The ISO 2-letter country code of the location
            console.log('    country-code:', `'${locationsItem['country-code']}'`);
            // The ISO 3-letter country code of the location
            console.log('    country-code3:', `'${locationsItem['country-code3']}'`);
            // ISO 4217 currency code associated with the country
            console.log('    currency-code:', `'${locationsItem['currency-code']}'`);
            // The location latitude
            console.log('    latitude:', locationsItem['latitude']);
            // Array of strings containing any location tags associated with the address. Tags are additional
            // pieces of metadata about a specific location, there are thousands of different tags. Some
            // examples of tags: shop, office, cafe, bank, pub
            console.log('    location-tags:', locationsItem['location-tags']);
            // The detected location type ordered roughly from most to least precise, possible values are:
            // • address - indicates a precise street address
            // • street - accurate to the street level but may not point to the exact location of the
            //   house/building number
            // • city - accurate to the city level, this includes villages, towns, suburbs, etc
            // • postal-code - indicates a postal code area (no house or street information present)
            // • railway - location is part of a rail network such as a station or railway track
            // • natural - indicates a natural feature, for example a mountain peak or a waterway
            // • island - location is an island or archipelago
            // • administrative - indicates an administrative boundary such as a country, state or province
            console.log('    location-type:', `'${locationsItem['location-type']}'`);
            // The location longitude
            console.log('    longitude:', locationsItem['longitude']);
            // The postal code for the location
            console.log('    postal-code:', `'${locationsItem['postal-code']}'`);
            // The state of the location
            console.log('    state:', `'${locationsItem['state']}'`);
            // Map containing timezone details for the location
            console.log('    timezone:', locationsItem['timezone']);
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
