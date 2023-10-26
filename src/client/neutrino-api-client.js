'use strict';

const APIErrorCode = require('./api-error-code');
const APIResponse = require('./api-response');
const fs = require('fs');
const https = require('https');
const { promisify } = require('util');
const { URL, URLSearchParams } = require('url');

/**
 * Make a request to the Neutrino API
 */
class NeutrinoAPIClient 
{
    constructor(userID, apiKey, baseURL) {
        this.MULTICLOUD_ENDPOINT = 'https://neutrinoapi.net/';
        this.AWS_ENDPOINT = 'https://aws.neutrinoapi.net/';
        this.GCP_ENDPOINT = 'https://gcp.neutrinoapi.net/';
        this.MS_AZURE_ENDPOINT = 'https://msa.neutrinoapi.net/';
        this.CONNECT_TIMEOUT_MS = 10000;
        this.userID = userID;
        this.apiKey = apiKey;
        this.baseURL = baseURL || this.MULTICLOUD_ENDPOINT;
    }

    /**
     * Detect bad words, swear words and profanity in a given text
     *
     * The parameters this API accepts are:
     * - censor-character - The character to use to censor out the bad words found
     * - catalog - Which catalog of bad words to use
     * - content - The content to scan
     *
     * @link https://www.neutrinoapi.com/api/bad-word-filter
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    badWordFilter(params) {
        return this.execRequest("POST", "bad-word-filter", params, null, 30);
    }

    /**
     * Download our entire BIN database for direct use on your own systems
     *
     * The parameters this API accepts are:
     * - include-iso3 - Include ISO 3-letter country codes and ISO 3-letter currency codes in the data
     * - include-8digit - Include 8-digit and higher BIN codes
     *
     * @link https://www.neutrinoapi.com/api/bin-list-download
     * @param {*} params The API parameters
     * @param {string|null} outputFilePath Path to temp file
     * @return Promise<APIResponse>
     */
    binListDownload(params, outputFilePath) {
        return this.execRequest("POST", "bin-list-download", params, outputFilePath, 30);
    }

    /**
     * Perform a BIN (Bank Identification Number) or IIN (Issuer Identification Number) lookup
     *
     * The parameters this API accepts are:
     * - bin-number - The BIN or IIN number
     * - customer-ip - Pass in the customers IP address and we will return some extra information about them
     *
     * @link https://www.neutrinoapi.com/api/bin-lookup
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    binLookup(params) {
        return this.execRequest("GET", "bin-lookup", params, null, 10);
    }

    /**
     * Browser bot can extract content, interact with keyboard and mouse events, and execute JavaScript on a website
     *
     * The parameters this API accepts are:
     * - delay - Delay in seconds to wait before capturing any page data
     * - ignore-certificate-errors - Ignore any TLS/SSL certificate errors and load the page anyway
     * - selector - Extract content from the page DOM using this selector
     * - url - The URL to load
     * - timeout - Timeout in seconds
     * - exec - Execute JavaScript on the website
     * - user-agent - Override the browsers default user-agent string with this one
     *
     * @link https://www.neutrinoapi.com/api/browser-bot
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    browserBot(params) {
        return this.execRequest("POST", "browser-bot", params, null, 300);
    }

    /**
     * A currency and unit conversion tool
     *
     * The parameters this API accepts are:
     * - from-value - The value to convert from (e.g. 10.95)
     * - from-type - The type of the value to convert from (e.g. USD)
     * - to-type - The type to convert to (e.g. EUR)
     *
     * @link https://www.neutrinoapi.com/api/convert
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    convert(params) {
        return this.execRequest("GET", "convert", params, null, 10);
    }

    /**
     * Retrieve domain name details and detect potentially malicious or dangerous domains
     *
     * The parameters this API accepts are:
     * - host - A domain name
     * - live - For domains that we have never seen before then perform various live checks and realtime reconnaissance
     *
     * @link https://www.neutrinoapi.com/api/domain-lookup
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    domainLookup(params) {
        return this.execRequest("GET", "domain-lookup", params, null, 120);
    }

    /**
     * Parse, validate and clean an email address
     *
     * The parameters this API accepts are:
     * - email - An email address
     * - fix-typos - Automatically attempt to fix typos in the address
     *
     * @link https://www.neutrinoapi.com/api/email-validate
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    emailValidate(params) {
        return this.execRequest("GET", "email-validate", params, null, 30);
    }

    /**
     * SMTP based email address verification
     *
     * The parameters this API accepts are:
     * - email - An email address
     * - fix-typos - Automatically attempt to fix typos in the address
     *
     * @link https://www.neutrinoapi.com/api/email-verify
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    emailVerify(params) {
        return this.execRequest("GET", "email-verify", params, null, 120);
    }

    /**
     * Geocode an address, partial address or just the name of a place
     *
     * The parameters this API accepts are:
     * - address - The full address
     * - house-number - The house/building number to locate
     * - street - The street/road name to locate
     * - city - The city/town name to locate
     * - county - The county/region name to locate
     * - state - The state name to locate
     * - postal-code - The postal code to locate
     * - country-code - Limit result to this country (the default is no country bias)
     * - language-code - The language to display results in
     * - fuzzy-search - If no matches are found for the given address
     *
     * @link https://www.neutrinoapi.com/api/geocode-address
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    geocodeAddress(params) {
        return this.execRequest("GET", "geocode-address", params, null, 30);
    }

    /**
     * Convert a geographic coordinate (latitude and longitude) into a real world address
     *
     * The parameters this API accepts are:
     * - latitude - The location latitude in decimal degrees format
     * - longitude - The location longitude in decimal degrees format
     * - language-code - The language to display results in
     * - zoom - The zoom level to respond with: address - the most precise address available street - the street level city - the city level state - the state level country - the country level 
     *
     * @link https://www.neutrinoapi.com/api/geocode-reverse
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    geocodeReverse(params) {
        return this.execRequest("GET", "geocode-reverse", params, null, 30);
    }

    /**
     * Connect to the global mobile cellular network and retrieve the status of a mobile device
     *
     * The parameters this API accepts are:
     * - number - A phone number
     * - country-code - ISO 2-letter country code
     *
     * @link https://www.neutrinoapi.com/api/hlr-lookup
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    hlrLookup(params) {
        return this.execRequest("GET", "hlr-lookup", params, null, 30);
    }

    /**
     * Check the reputation of an IP address, domain name or URL against a comprehensive list of blacklists and blocklists
     *
     * The parameters this API accepts are:
     * - host - An IP address
     * - list-rating - Only check lists with this rating or better
     * - zones - Only check these DNSBL zones/hosts
     *
     * @link https://www.neutrinoapi.com/api/host-reputation
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    hostReputation(params) {
        return this.execRequest("GET", "host-reputation", params, null, 120);
    }

    /**
     * Clean and sanitize untrusted HTML
     *
     * The parameters this API accepts are:
     * - output-type - The level of sanitization
     * - content - The HTML content
     *
     * @link https://www.neutrinoapi.com/api/html-clean
     * @param {*} params The API parameters
     * @param {string|null} outputFilePath Path to temp file
     * @return Promise<APIResponse>
     */
    htmlClean(params, outputFilePath) {
        return this.execRequest("POST", "html-clean", params, outputFilePath, 30);
    }

    /**
     * Render HTML content to PDF, JPG or PNG
     *
     * The parameters this API accepts are:
     * - margin - The document margin (in mm)
     * - css - Inject custom CSS into the HTML
     * - image-width - If rendering to an image format (PNG or JPG) use this image width (in pixels)
     * - footer - The footer HTML to insert into each page
     * - format - Which format to output
     * - zoom - Set the zoom factor when rendering the page (2.0 for double size
     * - title - The document title
     * - content - The HTML content
     * - page-width - Set the PDF page width explicitly (in mm)
     * - timeout - Timeout in seconds
     * - margin-right - The document right margin (in mm)
     * - grayscale - Render the final document in grayscale
     * - margin-left - The document left margin (in mm)
     * - page-size - Set the document page size
     * - delay - Number of seconds to wait before rendering the page (can be useful for pages with animations etc)
     * - ignore-certificate-errors - Ignore any TLS/SSL certificate errors
     * - page-height - Set the PDF page height explicitly (in mm)
     * - image-height - If rendering to an image format (PNG or JPG) use this image height (in pixels)
     * - header - The header HTML to insert into each page
     * - margin-top - The document top margin (in mm)
     * - margin-bottom - The document bottom margin (in mm)
     * - bg-color - For image rendering set the background color in hexadecimal notation (e.g. #0000ff)
     * - landscape - Set the document to landscape orientation
     *
     * @link https://www.neutrinoapi.com/api/html-render
     * @param {*} params The API parameters
     * @param {string|null} outputFilePath Path to temp file
     * @return Promise<APIResponse>
     */
    htmlRender(params, outputFilePath) {
        return this.execRequest("POST", "html-render", params, outputFilePath, 300);
    }

    /**
     * Resize an image and output as either JPEG or PNG
     *
     * The parameters this API accepts are:
     * - resize-mode - The resize mode to use
     * - width - The width to resize to (in px)
     * - format - The output image format
     * - image-url - The URL or Base64 encoded Data URL for the source image
     * - bg-color - The image background color in hexadecimal notation (e.g. #0000ff)
     * - height - The height to resize to (in px)
     *
     * @link https://www.neutrinoapi.com/api/image-resize
     * @param {*} params The API parameters
     * @param {string|null} outputFilePath Path to temp file
     * @return Promise<APIResponse>
     */
    imageResize(params, outputFilePath) {
        return this.execRequest("POST", "image-resize", params, outputFilePath, 20);
    }

    /**
     * Watermark one image with another image
     *
     * The parameters this API accepts are:
     * - resize-mode - The resize mode to use
     * - format - The output image format
     * - width - If set resize the resulting image to this width (in px)
     * - image-url - The URL or Base64 encoded Data URL for the source image
     * - position - The position of the watermark image
     * - watermark-url - The URL or Base64 encoded Data URL for the watermark image
     * - opacity - The opacity of the watermark (0 to 100)
     * - bg-color - The image background color in hexadecimal notation (e.g. #0000ff)
     * - height - If set resize the resulting image to this height (in px)
     *
     * @link https://www.neutrinoapi.com/api/image-watermark
     * @param {*} params The API parameters
     * @param {string|null} outputFilePath Path to temp file
     * @return Promise<APIResponse>
     */
    imageWatermark(params, outputFilePath) {
        return this.execRequest("POST", "image-watermark", params, outputFilePath, 20);
    }

    /**
     * The IP Blocklist API will detect potentially malicious or dangerous IP addresses
     *
     * The parameters this API accepts are:
     * - ip - An IPv4 or IPv6 address
     * - vpn-lookup - Include public VPN provider IP addresses
     *
     * @link https://www.neutrinoapi.com/api/ip-blocklist
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    ipBlocklist(params) {
        return this.execRequest("GET", "ip-blocklist", params, null, 10);
    }

    /**
     * This API is a direct feed to our IP blocklist data
     *
     * The parameters this API accepts are:
     * - format - The data format
     * - include-vpn - Include public VPN provider addresses
     * - cidr - Output IPs using CIDR notation
     * - ip6 - Output the IPv6 version of the blocklist
     *
     * @link https://www.neutrinoapi.com/api/ip-blocklist-download
     * @param {*} params The API parameters
     * @param {string|null} outputFilePath Path to temp file
     * @return Promise<APIResponse>
     */
    ipBlocklistDownload(params, outputFilePath) {
        return this.execRequest("POST", "ip-blocklist-download", params, outputFilePath, 30);
    }

    /**
     * Get location information about an IP address and do reverse DNS (PTR) lookups
     *
     * The parameters this API accepts are:
     * - ip - IPv4 or IPv6 address
     * - reverse-lookup - Do a reverse DNS (PTR) lookup
     *
     * @link https://www.neutrinoapi.com/api/ip-info
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    ipInfo(params) {
        return this.execRequest("GET", "ip-info", params, null, 10);
    }

    /**
     * Execute a realtime network probe against an IPv4 or IPv6 address
     *
     * The parameters this API accepts are:
     * - ip - IPv4 or IPv6 address
     *
     * @link https://www.neutrinoapi.com/api/ip-probe
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    ipProbe(params) {
        return this.execRequest("GET", "ip-probe", params, null, 120);
    }

    /**
     * Make an automated call to any valid phone number and playback an audio message
     *
     * The parameters this API accepts are:
     * - number - The phone number to call
     * - limit - Limit the total number of calls allowed to the supplied phone number
     * - audio-url - A URL to a valid audio file
     * - limit-ttl - Set the TTL in number of days that the 'limit' option will remember a phone number (the default is 1 day and the maximum is 365 days)
     *
     * @link https://www.neutrinoapi.com/api/phone-playback
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    phonePlayback(params) {
        return this.execRequest("POST", "phone-playback", params, null, 30);
    }

    /**
     * Parse, validate and get location information about a phone number
     *
     * The parameters this API accepts are:
     * - number - A phone number
     * - country-code - ISO 2-letter country code
     * - ip - Pass in a users IP address and we will assume numbers are based in the country of the IP address
     *
     * @link https://www.neutrinoapi.com/api/phone-validate
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    phoneValidate(params) {
        return this.execRequest("GET", "phone-validate", params, null, 10);
    }

    /**
     * Make an automated call to any valid phone number and playback a unique security code
     *
     * The parameters this API accepts are:
     * - number - The phone number to send the verification code to
     * - country-code - ISO 2-letter country code
     * - security-code - Pass in your own security code
     * - language-code - The language to playback the verification code in
     * - code-length - The number of digits to use in the security code (between 4 and 12)
     * - limit - Limit the total number of calls allowed to the supplied phone number
     * - playback-delay - The delay in milliseconds between the playback of each security code
     * - limit-ttl - Set the TTL in number of days that the 'limit' option will remember a phone number (the default is 1 day and the maximum is 365 days)
     *
     * @link https://www.neutrinoapi.com/api/phone-verify
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    phoneVerify(params) {
        return this.execRequest("POST", "phone-verify", params, null, 30);
    }

    /**
     * Generate a QR code as a PNG image
     *
     * The parameters this API accepts are:
     * - width - The width of the QR code (in px)
     * - fg-color - The QR code foreground color
     * - bg-color - The QR code background color
     * - content - The content to encode into the QR code (e.g. a URL or a phone number)
     * - height - The height of the QR code (in px)
     *
     * @link https://www.neutrinoapi.com/api/qr-code
     * @param {*} params The API parameters
     * @param {string|null} outputFilePath Path to temp file
     * @return Promise<APIResponse>
     */
    qrCode(params, outputFilePath) {
        return this.execRequest("POST", "qr-code", params, outputFilePath, 20);
    }

    /**
     * Send a unique security code to any mobile device via SMS
     *
     * The parameters this API accepts are:
     * - number - The phone number to send a verification code to
     * - country-code - ISO 2-letter country code
     * - security-code - Pass in your own security code
     * - language-code - The language to send the verification code in
     * - code-length - The number of digits to use in the security code (must be between 4 and 12)
     * - limit - Limit the total number of SMS allowed to the supplied phone number
     * - brand-name - Set a custom brand or product name in the verification message
     * - limit-ttl - Set the TTL in number of days that the 'limit' option will remember a phone number (the default is 1 day and the maximum is 365 days)
     *
     * @link https://www.neutrinoapi.com/api/sms-verify
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    smsVerify(params) {
        return this.execRequest("POST", "sms-verify", params, null, 30);
    }

    /**
     * Parse, validate and get detailed user-agent information from a user agent string or from client hints
     *
     * The parameters this API accepts are:
     * - ua - The user-agent string to lookup
     * - ua-version - For client hints this corresponds to the 'UA-Full-Version' header or 'uaFullVersion' from NavigatorUAData
     * - ua-platform - For client hints this corresponds to the 'UA-Platform' header or 'platform' from NavigatorUAData
     * - ua-platform-version - For client hints this corresponds to the 'UA-Platform-Version' header or 'platformVersion' from NavigatorUAData
     * - ua-mobile - For client hints this corresponds to the 'UA-Mobile' header or 'mobile' from NavigatorUAData
     * - device-model - For client hints this corresponds to the 'UA-Model' header or 'model' from NavigatorUAData
     * - device-brand - This parameter is only used in combination with 'device-model' when doing direct device lookups without any user-agent data
     *
     * @link https://www.neutrinoapi.com/api/ua-lookup
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    uaLookup(params) {
        return this.execRequest("GET", "ua-lookup", params, null, 10);
    }

    /**
     * Parse, analyze and retrieve content from the supplied URL
     *
     * The parameters this API accepts are:
     * - url - The URL to probe
     * - fetch-content - If this URL responds with html
     * - ignore-certificate-errors - Ignore any TLS/SSL certificate errors and load the URL anyway
     * - timeout - Timeout in seconds
     * - retry - If the request fails for any reason try again this many times
     *
     * @link https://www.neutrinoapi.com/api/url-info
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    urlInfo(params) {
        return this.execRequest("GET", "url-info", params, null, 30);
    }

    /**
     * Check if a security code sent via SMS Verify or Phone Verify is valid
     *
     * The parameters this API accepts are:
     * - security-code - The security code to verify
     * - limit-by - If set then enable additional brute-force protection by limiting the number of attempts by the supplied value
     *
     * @link https://www.neutrinoapi.com/api/verify-security-code
     * @param {{[key: string]: string}} params The API parameters
     * @return Promise<APIResponse>
     */
    verifySecurityCode(params) {
        return this.execRequest("GET", "verify-security-code", params, null, 30);
    }

    /**
     * Make a request to the Neutrino API
     * 
     * @param {string} httpMethod 
     * @param {string} endpoint 
     * @param {{[key:string]: string}} params 
     * @param {string|null} outputFilePath 
     * @param {number} timeoutInSeconds 
     * @returns {Promise<APIResponse>}
     */
    execRequest(httpMethod, endpoint, params, outputFilePath, timeoutInSeconds) {
        return new Promise((resolve, reject) => {
            let apiResponse;
            let body = '';
            let url;
            if (httpMethod === "GET") {
                const query = new URLSearchParams(params);
                url = new URL(`${this.baseURL}/${endpoint}?${query}`);
            } else {
                body = JSON.stringify(params);
                url = new URL(`${this.baseURL}/${endpoint}`);
            }
            const options = {
                'protocol': url.protocol,
                'hostname': url.hostname,
                'port': url.port,
                'path': url.pathname + url.search,
                'headers': {
                    'User-id': this.userID,
                    'API-Key': this.apiKey,
                    'Content-type': 'application/json'
                },
                'timeout': this.CONNECT_TIMEOUT_MS,
                'method': httpMethod
            };
            try {
                const request = https.request(options, (response) => {
                    const statusCode = response.statusCode || 0;
                    const contentType = response.headers['content-type'] || '';
                    let data = '';
                    let fileStream;
                    if (outputFilePath) {
                        fileStream = fs.createWriteStream(outputFilePath);
                        response.pipe(fileStream);
                    } else {
                        response.on('data', (chunk) => {
                            data += chunk;
                        });
                    }
                    response.on('end', async () => {
                        if (statusCode === 200) {
                            if (contentType.includes('application/json')) {
                                apiResponse = APIResponse.ofData(statusCode, contentType, JSON.parse(data));
                                resolve(apiResponse);
                            } else if (outputFilePath) {
                                apiResponse = APIResponse.ofOutputFilePath(statusCode, contentType, outputFilePath);
                                fileStream.close(() => {
                                    resolve(apiResponse);
                                });
                            } else {
                                apiResponse = APIResponse.ofHttpStatus(statusCode, contentType, APIErrorCode.API_GATEWAY_ERROR, data);
                                reject(apiResponse);
                            }
                        } else {
                            try {
                                let json;
                                if (outputFilePath) {
                                    if (outputFilePath) {
                                        await promisify((cb) => fileStream.on('close', cb))();
                                        fileStream.close(() => fileStream.removeAllListeners())
                                        data = fs.readFileSync(outputFilePath, {encoding: 'utf8', flag: 'r'});
                                    } else if (contentType.includes('application/json')) {
                                        json = JSON.parse(data);
                                    }
                                    if ('api-error' in json && 'api-error-msg' in json) {
                                        apiResponse = APIResponse.ofHttpStatus(statusCode, contentType, json['api-error'], json['api-error-msg']);
                                    } else {
                                        apiResponse = APIResponse.ofHttpStatus(statusCode, contentType, APIErrorCode.NETWORK_IO_ERROR, data);
                                    }
                                } else if (contentType.includes('application/json')) {
                                    json = JSON.parse(data);
                                    apiResponse = APIResponse.ofHttpStatus(statusCode, contentType, json['api-error'], json['api-error-msg'])
                                } else {
                                    apiResponse = APIResponse.ofHttpStatus(statusCode, contentType, APIErrorCode.API_GATEWAY_ERROR, data);
                                }
                            } catch (error) {
                                apiResponse = APIResponse.ofHttpStatus(statusCode, contentType, APIErrorCode.API_GATEWAY_ERROR, data);
                            }
                            reject(apiResponse);
                        }
                    });
                    response.on('close', response.removeAllListeners);
                });
                request.setTimeout(timeoutInSeconds * 1000);
                request.on('timeout', request.destroy);
                request.on('error', (error) => {
                    switch (error.code) {
                        case 'ECONNREFUSED':
                            apiResponse = APIResponse.ofCause(APIErrorCode.CONNECT_TIMEOUT, error);
                            break;
                        case 'ECONNRESET':
                            apiResponse = APIResponse.ofCause(APIErrorCode.READ_TIMEOUT, error);
                            break;
                        case 'EPROTO':
                            apiResponse = APIResponse.ofCause(APIErrorCode.TLS_PROTOCOL_ERROR, error);
                            break;
                        default:
                            apiResponse = APIResponse.ofCause(APIErrorCode.NETWORK_IO_ERROR, error);
                    }
                    reject(apiResponse);
                });
                request.on('close', request.removeAllListeners);
                request.write(body);
                request.end();
            } catch (error) {
                switch (error.code) {
                    case 'ERR_INVALID_PROTOCOL':
                        apiResponse = APIResponse.ofCause(APIErrorCode.URL_PARSING_ERROR, error);
                        break;
                    default:
                        apiResponse = APIResponse.ofCause(APIErrorCode.NETWORK_IO_ERROR, error);
                }
                reject(apiResponse);
            }
        });
    }
}

module.exports = NeutrinoAPIClient;
