'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // Delay in seconds to wait before capturing any page data, executing selectors or JavaScript
    'delay': '3',

    // Ignore any TLS/SSL certificate errors and load the page anyway
    'ignore-certificate-errors': 'false',

    // Extract content from the page DOM using this selector. Commonly known as a CSS selector, you can
    // find a good reference here
    'selector': '.button',

    // The URL to load
    'url': 'https://www.neutrinoapi.com/',

    // Timeout in seconds. Give up if still trying to load the page after this number of seconds
    'timeout': '30',

    // Execute JavaScript on the website. This parameter accepts JavaScript as either a string
    // containing JavaScript or for sending multiple separate statements a JSON array or POST array can
    // also be used. If a statement returns any value it will be returned in the 'exec-results'
    // response. You can also use the following specially defined user interaction functions:
    // sleep(seconds); Just wait/sleep for the specified number of seconds. click('selector'); Click on
    // the first element matching the given selector. focus('selector'); Focus on the first element
    // matching the given selector. keys('characters'); Send the specified keyboard characters. Use
    // click() or focus() first to send keys to a specific element. enter(); Send the Enter key. tab();
    // Send the Tab key.
    'exec': '[click(\'#button-id\'), sleep(1), click(\'.class\'), keys(\'1234\'), enter()]',

    // Override the browsers default user-agent string with this one
    'user-agent': ''
};

neutrinoAPIClient.browserBot(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The complete raw, decompressed and decoded page content. Usually will be either HTML, JSON or XML
        console.log('content:', `'${data['content']}'`);
        
        // The size of the returned content in bytes
        console.log('content-size:', data['content-size']);
        
        // Array containing all the elements matching the supplied selector
        const elements = data['elements'];
        console.log('elements:');
        for (const elementsItem of elements) {
            // The 'class' attribute of the element
            console.log('    class:', `'${elementsItem['class']}'`);
            // The 'href' attribute of the element
            console.log('    href:', `'${elementsItem['href']}'`);
            // The raw HTML of the element
            console.log('    html:', `'${elementsItem['html']}'`);
            // The 'id' attribute of the element
            console.log('    id:', `'${elementsItem['id']}'`);
            // The plain-text content of the element with normalized whitespace
            console.log('    text:', `'${elementsItem['text']}'`);
            console.log()
        }
        
        // Contains the error message if an error has occurred ('is-error' will be true)
        console.log('error-message:', `'${data['error-message']}'`);
        
        // If you executed any JavaScript this array holds the results as objects
        const execResults = data['exec-results'];
        console.log('exec-results:');
        for (const execResultsItem of execResults) {
            // The result of the executed JavaScript statement. Will be empty if the statement returned nothing
            console.log('    result:', `'${execResultsItem['result']}'`);
            // The JavaScript statement that was executed
            console.log('    statement:', `'${execResultsItem['statement']}'`);
            console.log()
        }
        
        // The redirected URL if the URL responded with an HTTP redirect
        console.log('http-redirect-url:', `'${data['http-redirect-url']}'`);
        
        // The HTTP status code the URL returned
        console.log('http-status-code:', data['http-status-code']);
        
        // The HTTP status message the URL returned
        console.log('http-status-message:', `'${data['http-status-message']}'`);
        
        // True if an error has occurred loading the page. Check the 'error-message' field for details
        console.log('is-error:', data['is-error']);
        
        // True if the HTTP status is OK (200)
        console.log('is-http-ok:', data['is-http-ok']);
        
        // True if the URL responded with an HTTP redirect
        console.log('is-http-redirect:', data['is-http-redirect']);
        
        // True if the page is secured using TLS/SSL
        console.log('is-secure:', data['is-secure']);
        
        // True if a timeout occurred while loading the page. You can set the timeout with the request
        // parameter 'timeout'
        console.log('is-timeout:', data['is-timeout']);
        
        // The ISO 2-letter language code of the page. Extracted from either the HTML document or via HTTP
        // headers
        console.log('language-code:', `'${data['language-code']}'`);
        
        // The number of seconds taken to load the page (from initial request until DOM ready)
        console.log('load-time:', data['load-time']);
        
        // The document MIME type
        console.log('mime-type:', `'${data['mime-type']}'`);
        
        // Map containing all the HTTP response headers the URL responded with
        console.log('response-headers:', data['response-headers']);
        
        // Map containing details of the TLS/SSL setup
        console.log('security-details:', data['security-details']);
        
        // The HTTP servers hostname (PTR/RDNS record)
        console.log('server-hostname:', `'${data['server-hostname']}'`);
        
        // The HTTP servers IP address
        console.log('server-ip:', `'${data['server-ip']}'`);
        
        // The document title
        console.log('title:', `'${data['title']}'`);
        
        // The requested URL. This may not be the same as the final destination URL, if the URL redirects
        // then it will be set in 'http-redirect-url' and 'is-http-redirect' will also be true
        console.log('url:', `'${data['url']}'`);
        
        // Structure of a browser-bot -> url-components response
        console.log('url-components:', data['url-components']);
        
        // True if the URL supplied is valid
        console.log('url-valid:', data['url-valid']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
