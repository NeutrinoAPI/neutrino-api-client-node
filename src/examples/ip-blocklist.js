'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // An IPv4 or IPv6 address. Accepts standard IP notation (with or without port number), CIDR
    // notation and IPv6 compressed notation. If multiple IPs are passed using comma-separated values
    // the first non-bogon address on the list will be checked
    'ip': '104.244.72.115',

    // Include public VPN provider IP addresses. NOTE: For more advanced VPN detection including the
    // ability to identify private and stealth VPNs use the IP Probe API
    'vpn-lookup': 'false'
};

neutrinoAPIClient.ipBlocklist(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // An array of strings indicating which blocklist categories this IP is listed on. Current possible
        // values are:
        // • tor - IP is a Tor node or running a Tor related service
        // • proxy - IP has been detected as an anonymous web proxy or HTTP proxy
        // • vpn - IP belongs to a public VPN provider
        // • bot - IP is hosting a malicious bot or is part of a botnet. This is a broad category which
        //   includes brute-force crackers
        // • spam-bot - IP address is hosting a spam bot, comment spamming or any other spamming type
        //   software
        // • exploit-bot - IP is hosting an exploit finding bot or is running exploit scanning software
        // • hijacked - IP is part of a hijacked netblock or a netblock controlled by a criminal
        //   organization
        // • malware - IP is currently involved in distributing or is running malware
        // • spyware - IP is currently involved in distributing or is running spyware
        // • spider - IP is running a hostile web spider / web crawler
        // • dshield - IP has been flagged as a significant attack source by DShield (dshield.org)
        console.log('blocklists:', data['blocklists']);
        
        // The CIDR address for this listing (only set if the IP is listed)
        console.log('cidr:', `'${data['cidr']}'`);
        
        // The IP address
        console.log('ip:', `'${data['ip']}'`);
        
        // IP is hosting a malicious bot or is part of a botnet. This is a broad category which includes
        // brute-force crackers
        console.log('is-bot:', data['is-bot']);
        
        // IP has been flagged as a significant attack source by DShield (dshield.org)
        console.log('is-dshield:', data['is-dshield']);
        
        // IP is hosting an exploit finding bot or is running exploit scanning software
        console.log('is-exploit-bot:', data['is-exploit-bot']);
        
        // IP is part of a hijacked netblock or a netblock controlled by a criminal organization
        console.log('is-hijacked:', data['is-hijacked']);
        
        // Is this IP on a blocklist
        console.log('is-listed:', data['is-listed']);
        
        // IP is involved in distributing or is running malware
        console.log('is-malware:', data['is-malware']);
        
        // IP has been detected as an anonymous web proxy or anonymous HTTP proxy
        console.log('is-proxy:', data['is-proxy']);
        
        // IP address is hosting a spam bot, comment spamming or any other spamming type software
        console.log('is-spam-bot:', data['is-spam-bot']);
        
        // IP is running a hostile web spider / web crawler
        console.log('is-spider:', data['is-spider']);
        
        // IP is involved in distributing or is running spyware
        console.log('is-spyware:', data['is-spyware']);
        
        // IP is a Tor node or running a Tor related service
        console.log('is-tor:', data['is-tor']);
        
        // IP belongs to a public VPN provider (only set if the 'vpn-lookup' option is enabled)
        console.log('is-vpn:', data['is-vpn']);
        
        // The unix time when this IP was last seen on any blocklist. IPs are automatically removed after 7
        // days therefor this value will never be older than 7 days
        console.log('last-seen:', data['last-seen']);
        
        // The number of blocklists the IP is listed on
        console.log('list-count:', data['list-count']);
        
        // An array of objects containing details on which specific sensors detected the IP
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
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
