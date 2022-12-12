'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The character to use to censor out the bad words found
    'censor-character': '',

    // Which catalog of bad words to use, we currently maintain two bad word catalogs:
    // • strict - the largest database of bad words which includes profanity, obscenity, sexual, rude,
    //   cuss, dirty, swear and objectionable words and phrases. This catalog is suitable for
    //   environments of all ages including educational or children's content
    // • obscene - like the strict catalog but does not include any mild profanities, idiomatic
    //   phrases or words which are considered formal terminology. This catalog is suitable for adult
    //   environments where certain types of bad words are considered OK
    'catalog': 'strict',

    // The content to scan. This can be either a URL to load from, a file upload or an HTML content
    // string
    'content': 'https://en.wikipedia.org/wiki/Profanity'
};

neutrinoAPIClient.badWordFilter(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // An array of the bad words found
        console.log('bad-words-list:', data['bad-words-list']);
        
        // Total number of bad words detected
        console.log('bad-words-total:', data['bad-words-total']);
        
        // The censored content (only set if censor-character has been set)
        console.log('censored-content:', `'${data['censored-content']}'`);
        
        // Does the text contain bad words
        console.log('is-bad:', data['is-bad']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
