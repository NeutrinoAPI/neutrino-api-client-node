'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // An IPv4 or IPv6 address. Accepts standard IP notation and also CIDR notation
    'ip': '194.233.98.38'
};

neutrinoAPIClient.ipProbe(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // The age of the autonomous system (AS) in number of years since registration
        console.log('as-age:', data['as-age']);
        
        // The autonomous system (AS) CIDR range
        console.log('as-cidr:', `'${data['as-cidr']}'`);
        
        // The autonomous system (AS) ISO 2-letter country code
        console.log('as-country-code:', `'${data['as-country-code']}'`);
        
        // The autonomous system (AS) ISO 3-letter country code
        console.log('as-country-code3:', `'${data['as-country-code3']}'`);
        
        // The autonomous system (AS) description / company name
        console.log('as-description:', `'${data['as-description']}'`);
        
        // Array of all the domains associated with the autonomous system (AS)
        console.log('as-domains:', data['as-domains']);
        
        // The autonomous system (AS) number
        console.log('asn:', `'${data['asn']}'`);
        
        // Full city name (if detectable)
        console.log('city:', `'${data['city']}'`);
        
        // ISO 2-letter continent code
        console.log('continent-code:', `'${data['continent-code']}'`);
        
        // Full country name
        console.log('country:', `'${data['country']}'`);
        
        // ISO 2-letter country code
        console.log('country-code:', `'${data['country-code']}'`);
        
        // ISO 3-letter country code
        console.log('country-code3:', `'${data['country-code3']}'`);
        
        // ISO 4217 currency code associated with the country
        console.log('currency-code:', `'${data['currency-code']}'`);
        
        // The IPs host domain
        console.log('host-domain:', `'${data['host-domain']}'`);
        
        // The IPs full hostname (PTR)
        console.log('hostname:', `'${data['hostname']}'`);
        
        // The IPv4 or IPv6 address returned
        console.log('ip:', `'${data['ip']}'`);
        
        // True if this is a bogon IP address such as a private network, local network or reserved address
        console.log('is-bogon:', data['is-bogon']);
        
        // True if this IP belongs to a hosting company. Note that this can still be true even if the
        // provider type is VPN/proxy, this occurs in the case that the IP is detected as both types
        console.log('is-hosting:', data['is-hosting']);
        
        // True if this IP belongs to an internet service provider. Note that this can still be true even if
        // the provider type is VPN/proxy, this occurs in the case that the IP is detected as both types
        console.log('is-isp:', data['is-isp']);
        
        // True if this IP is a proxy
        console.log('is-proxy:', data['is-proxy']);
        
        // True if this is a IPv4 mapped IPv6 address
        console.log('is-v4-mapped:', data['is-v4-mapped']);
        
        // True if this is a IPv6 address. False if IPv4
        console.log('is-v6:', data['is-v6']);
        
        // True if this IP ia a VPN
        console.log('is-vpn:', data['is-vpn']);
        
        // A description of the provider (usually extracted from the providers website)
        console.log('provider-description:', `'${data['provider-description']}'`);
        
        // The domain name of the provider
        console.log('provider-domain:', `'${data['provider-domain']}'`);
        
        // The detected provider type, possible values are:
        // • isp - IP belongs to an internet service provider. This includes both mobile, home and
        //   business internet providers
        // • hosting - IP belongs to a hosting company. This includes website hosting, cloud computing
        //   platforms and colocation facilities
        // • vpn - IP belongs to a VPN provider
        // • proxy - IP belongs to a proxy service. This includes HTTP/SOCKS proxies and browser based
        //   proxies
        // • university - IP belongs to a university/college/campus
        // • government - IP belongs to a government department. This includes military facilities
        // • commercial - IP belongs to a commercial entity such as a corporate headquarters or company
        //   office
        // • unknown - could not identify the provider type
        console.log('provider-type:', `'${data['provider-type']}'`);
        
        // The website URL for the provider
        console.log('provider-website:', `'${data['provider-website']}'`);
        
        // Full region name (if detectable)
        console.log('region:', `'${data['region']}'`);
        
        // ISO 3166-2 region code (if detectable)
        console.log('region-code:', `'${data['region-code']}'`);
        
        // True if this is a valid IPv4 or IPv6 address
        console.log('valid:', data['valid']);
        
        // The domain of the VPN provider (may be empty if the VPN domain is not detectable)
        console.log('vpn-domain:', `'${data['vpn-domain']}'`);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
