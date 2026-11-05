'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The location latitude in decimal degrees format
    'latitude': '-41.2775847',

    // The location longitude in decimal degrees format
    'longitude': '174.7775229',

    // The language to display results in, available languages are:
    // • ar, de, en, es, fr, it, ja, nl, pt, ru, zh
    'language-code': 'en',

    // The zoom level to respond with:
    // • address - the most precise address available
    // • street - the street level
    // • city - the city level
    // • state - the state level
    // • country - the country level
    'zoom': 'address',

    // Reverse lookup by a geohash instead of using latitude and longitude
    'geohash': ''
};

neutrinoAPIClient.geocodeReverse(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The full address string using comma-separated values, use 'postal-address' for the address string
        // formatted using country/region specific rules
        console.log('address:', `'${data['address']}'`);
        
        // The components which make up the address such as road, city, state, etc. These are country/region
        // specific values, use 'address-structured' for a strict address structure which is the same for
        // all locations globally
        console.log('address-components:', data['address-components']);
        
        // Structure of address-structured
        console.log('address-structured:', data['address-structured']);
        
        // The detected building type for the address, possible values are:
        // • none - no building type was detected for this location
        // • house - a residential house/property
        // • apartment - a residential apartment complex
        // • office - a commercial/business office
        // • accommodation - a hotel/motel or other type of accommodation
        // • education - a school or university
        // • food - a restaurant or place where food can be purchased
        // • shop - a shop selling any type of goods
        // • attraction - an attraction such as theme parks or tourist activities
        // • medical - a hospital or other medical facility
        // • transport - a transportation building such as a bus or train depot
        // • commercial - a commercial/industrial building
        // • government - a government or military facility
        // • public - a public building such as a townhall or community centre
        console.log('building-type:', `'${data['building-type']}'`);
        
        // The city of the location
        console.log('city:', `'${data['city']}'`);
        
        // ISO 2-letter continent code
        console.log('continent-code:', `'${data['continent-code']}'`);
        
        // The country of the location
        console.log('country:', `'${data['country']}'`);
        
        // The ISO 2-letter country code of the location
        console.log('country-code:', `'${data['country-code']}'`);
        
        // The ISO 3-letter country code of the location
        console.log('country-code3:', `'${data['country-code3']}'`);
        
        // ISO 4217 currency code associated with the country
        console.log('currency-code:', `'${data['currency-code']}'`);
        
        // True if these coordinates map to a real location
        console.log('found:', data['found']);
        
        // The location geohash
        console.log('geohash:', `'${data['geohash']}'`);
        
        // The ISO 2-letter language code for the official language spoken in the country
        console.log('language-code:', `'${data['language-code']}'`);
        
        // The location latitude
        console.log('latitude:', data['latitude']);
        
        // Map containing any external metadata linked to the location. Currently supports the following
        // values which are only set if known: website-url, phone-number, org-name, wikipedia-title,
        // wikidata-entity
        console.log('location-profile:', data['location-profile']);
        
        // Array of strings containing any location tags associated with the address. Tags are additional
        // pieces of metadata about a specific location, there are thousands of different tags. Some
        // examples of tags: shop, office, cafe, bank, pub
        console.log('location-tags:', data['location-tags']);
        
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
        console.log('location-type:', `'${data['location-type']}'`);
        
        // The location longitude
        console.log('longitude:', data['longitude']);
        
        // The formatted address using local standards suitable for printing on an envelope
        console.log('postal-address:', `'${data['postal-address']}'`);
        
        // The postal code for the location
        console.log('postal-code:', `'${data['postal-code']}'`);
        
        // The ISO 3166-2 region code for the location
        console.log('region-code:', `'${data['region-code']}'`);
        
        // The state of the location
        console.log('state:', `'${data['state']}'`);
        
        // Structure of timezone
        console.log('timezone:', data['timezone']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
