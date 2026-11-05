'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The full address, partial address or name of a place to try and locate. Comma separated address
    // components are preferred.
    'address': '1 Molesworth Street, Thorndon, Wellington 6011',

    // The house/building number to locate (for structured address searches)
    'house-number': '',

    // The street/road name to locate (for structured address searches)
    'street': '',

    // The city/town name to locate (for structured address searches)
    'city': '',

    // The county/region name to locate (for structured address searches)
    'county': '',

    // The state name to locate (for structured address searches)
    'state': '',

    // The postal code to locate (for structured address searches)
    'postal-code': '',

    // Prefer results from this country code (the default is no country bias)
    'country-code': '',

    // Prefer results from this list of country codes (space or comma separated values). Preference is
    // in the order supplied, you can use the 'country-code' parameter to also set a dynamic or user
    // supplied country code which takes precedence
    'country-codes': '',

    // The language to display results in, available languages are:
    // • ar, de, en, es, fr, it, ja, nl, pt, ru, zh
    'language-code': 'en',

    // Enable auto-complete for search-as-you-type and search suggestions. This option can find
    // addresses based on partial search terms, combine with 'country-code' for country specific
    // searches. Auto-complete works best with 'fuzzy-search' disabled for the fastest response times
    // but can be combined if required
    'auto-complete': 'false',

    // If no matches are found for the given address, start performing a recursive fuzzy search until a
    // geolocation is found. This option is useful for processing user supplied input that may be
    // incomplete or have typos and where you do not mind some potential loss in precision
    'fuzzy-search': 'false',

    // Limit search results to this many locations (between 1 and a maximum of 32)
    'limit': '8'
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
            // The full address string using comma-separated values, use 'postal-address' for the address string
            // formatted using country/region specific rules
            console.log('    address:', `'${locationsItem['address']}'`);
            // The components which make up the address such as road, city, state, etc. These are country/region
            // specific values, use 'address-structured' for a strict address structure which is the same for
            // all locations globally
            console.log('    address-components:', locationsItem['address-components']);
            // Structure of address-structured
            console.log('    address-structured:', locationsItem['address-structured']);
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
            console.log('    building-type:', `'${locationsItem['building-type']}'`);
            // The city of the location
            console.log('    city:', `'${locationsItem['city']}'`);
            // ISO 2-letter continent code
            console.log('    continent-code:', `'${locationsItem['continent-code']}'`);
            // The country of the location
            console.log('    country:', `'${locationsItem['country']}'`);
            // The ISO 2-letter country code of the location
            console.log('    country-code:', `'${locationsItem['country-code']}'`);
            // The ISO 3-letter country code of the location
            console.log('    country-code3:', `'${locationsItem['country-code3']}'`);
            // ISO 4217 currency code associated with the country
            console.log('    currency-code:', `'${locationsItem['currency-code']}'`);
            // The location geohash
            console.log('    geohash:', `'${locationsItem['geohash']}'`);
            // The ISO 2-letter language code for the official language spoken in the country
            console.log('    language-code:', `'${locationsItem['language-code']}'`);
            // The location latitude
            console.log('    latitude:', locationsItem['latitude']);
            // Map containing any external metadata linked to the location. Currently supports the following
            // values which are only set if known: website-url, phone-number, org-name, wikipedia-title,
            // wikidata-entity
            console.log('    location-profile:', locationsItem['location-profile']);
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
            // The formatted address using local standards suitable for printing on an envelope
            console.log('    postal-address:', `'${locationsItem['postal-address']}'`);
            // The postal code for the location
            console.log('    postal-code:', `'${locationsItem['postal-code']}'`);
            // The ISO 3166-2 region code for the location
            console.log('    region-code:', `'${locationsItem['region-code']}'`);
            // The state of the location
            console.log('    state:', `'${locationsItem['state']}'`);
            // Structure of timezone
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
