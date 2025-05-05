'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // A domain name, hostname, FQDN, URL, HTML link or email address to lookup
    'host': 'neutrinoapi.com',

    // For domains that we have never seen before then perform various live checks and realtime
    // reconnaissance. NOTE: this option may add additional non-deterministic delay to the request, if
    // you require consistently fast API response times or just want to check our domain blocklists then
    // you can disable this option
    'live': 'true'
};

neutrinoAPIClient.domainLookup(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The number of days since the domain was registered. A domain age of under 90 days is generally
        // considered to be potentially risky. A value of 0 indicates no registration date was found for
        // this domain
        console.log('age:', data['age']);
        
        // An array of strings indicating which blocklist categories this domain is listed on. Current
        // possible values are:
        // • phishing - Domain has recently been hosting phishing links or involved in the sending of
        //   phishing messages
        // • malware - Domain has recently been hosting malware or involved in the distribution of malware
        // • spam - Domain has recently been sending spam either directly or indirectly
        // • anonymizer - Domain is involved in anonymizer activity such as disposable email, hosting
        //   proxies or tor services
        // • nefarious - Domain is involved in nefarious or malicious activity such as hacking, fraud or
        //   other abusive behavior
        console.log('blocklists:', data['blocklists']);
        
        // The primary domain of the DNS provider for this domain
        console.log('dns-provider:', `'${data['dns-provider']}'`);
        
        // The primary domain name excluding any subdomains. This is also referred to as the second-level
        // domain (SLD)
        console.log('domain:', `'${data['domain']}'`);
        
        // The fully qualified domain name (FQDN)
        console.log('fqdn:', `'${data['fqdn']}'`);
        
        // This domain is hosting adult content such as porn, webcams, escorts, etc
        console.log('is-adult:', data['is-adult']);
        
        // Is this domain under a government or military TLD
        console.log('is-gov:', data['is-gov']);
        
        // Consider this domain malicious as it is currently listed on at least 1 blocklist
        console.log('is-malicious:', data['is-malicious']);
        
        // Is this domain under an OpenNIC TLD
        console.log('is-opennic:', data['is-opennic']);
        
        // True if this domain is unseen and is currently being processed in the background. This field only
        // matters when the 'live' lookup setting has been explicitly disabled and indicates that not all
        // domain data my be present yet
        console.log('is-pending:', data['is-pending']);
        
        // Is the FQDN a subdomain of the primary domain
        console.log('is-subdomain:', data['is-subdomain']);
        
        // The primary domain of the email provider for this domain. An empty value indicates the domain has
        // no valid MX records
        console.log('mail-provider:', `'${data['mail-provider']}'`);
        
        // The domains estimated global traffic rank with the highest rank being 1. A value of 0 indicates
        // the domain is currently ranked outside of the top 1M of domains
        console.log('rank:', data['rank']);
        
        // The ISO date this domain was registered or first seen on the internet. An empty value indicates
        // we could not reliably determine the date
        console.log('registered-date:', `'${data['registered-date']}'`);
        
        // The IANA registrar ID (0 if no registrar ID was found)
        console.log('registrar-id:', data['registrar-id']);
        
        // The name of the domain registrar owning this domain
        console.log('registrar-name:', `'${data['registrar-name']}'`);
        
        // An array of objects containing details on which specific blocklist sensors have detected this
        // domain
        const sensors = data['sensors'];
        console.log('sensors:');
        for (const sensorsItem of sensors) {
            // The primary blocklist category this sensor belongs to
            console.log('    blocklist:', `'${sensorsItem['blocklist']}'`);
            // Contains details about the sensor source and what type of malicious activity was detected
            console.log('    description:', `'${sensorsItem['description']}'`);
            // The sensor ID. This is a permanent and unique ID for each sensor
            console.log('    id:', sensorsItem['id']);
            console.log()
        }
        
        // The top-level domain (TLD)
        console.log('tld:', `'${data['tld']}'`);
        
        // For a country code top-level domain (ccTLD) this will contain the associated ISO 2-letter country
        // code
        console.log('tld-cc:', `'${data['tld-cc']}'`);
        
        // True if a valid domain was found. For a domain to be considered valid it must be registered and
        // have valid DNS NS records
        console.log('valid:', data['valid']);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
