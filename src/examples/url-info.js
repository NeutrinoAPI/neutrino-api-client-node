'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The URL to probe
    'url': 'https://www.neutrinoapi.com/',

    // If this URL responds with html, text, json or xml then return the response. This option is useful
    // if you want to perform further processing on the URL content (e.g. with the HTML Extract or HTML
    // Clean APIs)
    'fetch-content': 'false',

    // Ignore any TLS/SSL certificate errors and load the URL anyway
    'ignore-certificate-errors': 'false',

    // Timeout in seconds. Give up if still trying to load the URL after this number of seconds
    'timeout': '60',

    // If the request fails for any reason try again this many times
    'retry': '0'
};

neutrinoAPIClient.urlInfo(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The actual content this URL responded with. Only set if the 'fetch-content' option was used
        console.log('content:', `'${data['content']}'`);
        
        // The encoding format the URL uses
        console.log('content-encoding:', `'${data['content-encoding']}'`);
        
        // The size of the URL content in bytes
        console.log('content-size:', data['content-size']);
        
        // The content-type this URL serves
        console.log('content-type:', `'${data['content-type']}'`);
        
        // True if this URL responded with an HTTP OK (200) status
        console.log('http-ok:', data['http-ok']);
        
        // True if this URL responded with an HTTP redirect
        console.log('http-redirect:', data['http-redirect']);
        
        // The HTTP status code this URL responded with. An HTTP status of 0 indicates a network level issue
        console.log('http-status:', data['http-status']);
        
        // The HTTP status message assoicated with the status code
        console.log('http-status-message:', data['http-status-message']);
        
        // True if an error occurred while loading the URL. This includes network errors, TLS errors and
        // timeouts
        console.log('is-error:', data['is-error']);
        
        // True if a timeout occurred while loading the URL. You can set the timeout with the request
        // parameter 'timeout'
        console.log('is-timeout:', data['is-timeout']);
        
        // The ISO 2-letter language code of the page. Extracted from either the HTML document or via HTTP
        // headers
        console.log('language-code:', `'${data['language-code']}'`);
        
        // The time taken to load the URL content in seconds
        console.log('load-time:', data['load-time']);
        
        // A key-value map of the URL query paramaters
        console.log('query:', data['query']);
        
        // Is this URL actually serving real content
        console.log('real:', data['real']);
        
        // The servers IP geo-location: full city name (if detectable)
        console.log('server-city:', `'${data['server-city']}'`);
        
        // The servers IP geo-location: full country name
        console.log('server-country:', `'${data['server-country']}'`);
        
        // The servers IP geo-location: ISO 2-letter country code
        console.log('server-country-code:', `'${data['server-country-code']}'`);
        
        // The servers hostname (PTR record)
        console.log('server-hostname:', `'${data['server-hostname']}'`);
        
        // The IP address of the server hosting this URL
        console.log('server-ip:', `'${data['server-ip']}'`);
        
        // The name of the server software hosting this URL
        console.log('server-name:', `'${data['server-name']}'`);
        
        // The servers IP geo-location: full region name (if detectable)
        console.log('server-region:', `'${data['server-region']}'`);
        
        // The document title
        console.log('title:', `'${data['title']}'`);
        
        // The fully qualified URL. This may be different to the URL requested if http-redirect is true
        console.log('url:', `'${data['url']}'`);
        
        // The URL path
        console.log('url-path:', `'${data['url-path']}'`);
        
        // The URL port
        console.log('url-port:', data['url-port']);
        
        // The URL protocol, usually http or https
        console.log('url-protocol:', `'${data['url-protocol']}'`);
        
        // Is this a valid well-formed URL
        console.log('valid:', data['valid']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
