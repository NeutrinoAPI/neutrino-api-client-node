'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The user-agent string to lookup. For client hints use the 'UA' header or the JSON data directly
    // from 'navigator.userAgentData.brands' or 'navigator.userAgentData.getHighEntropyValues()'
    'ua': 'Mozilla/5.0 (Linux; Android 11; SM-G9980U1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36',

    // For client hints this corresponds to the 'UA-Full-Version' header or 'uaFullVersion' from
    // NavigatorUAData
    'ua-version': '',

    // For client hints this corresponds to the 'UA-Platform' header or 'platform' from NavigatorUAData
    'ua-platform': '',

    // For client hints this corresponds to the 'UA-Platform-Version' header or 'platformVersion' from
    // NavigatorUAData
    'ua-platform-version': '',

    // For client hints this corresponds to the 'UA-Mobile' header or 'mobile' from NavigatorUAData
    'ua-mobile': '',

    // For client hints this corresponds to the 'UA-Model' header or 'model' from NavigatorUAData. You
    // can also use this parameter to lookup a device directly by its model name, model code or hardware
    // code, on android you can get the model name from:
    // https://developer.android.com/reference/android/os/Build.html#MODEL
    'device-model': '',

    // This parameter is only used in combination with 'device-model' when doing direct device lookups
    // without any user-agent data. Set this to the brand or manufacturer name, this is required for
    // accurate device detection with ambiguous model names. On android you can get the device brand
    // from: https://developer.android.com/reference/android/os/Build#MANUFACTURER
    'device-brand': ''
};

neutrinoAPIClient.uaLookup(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // If the client is a web browser which underlying browser engine does it use
        console.log('browser-engine:', `'${data['browser-engine']}'`);
        
        // If the client is a web browser which year was this browser version released
        console.log('browser-release:', `'${data['browser-release']}'`);
        
        // The device brand / manufacturer
        console.log('device-brand:', `'${data['device-brand']}'`);
        
        // The device display height in CSS 'px'
        console.log('device-height-px:', data['device-height-px']);
        
        // The device model
        console.log('device-model:', `'${data['device-model']}'`);
        
        // The device model code
        console.log('device-model-code:', `'${data['device-model-code']}'`);
        
        // The device display pixel ratio (the ratio of the resolution in physical pixels to the resolution
        // in CSS pixels)
        console.log('device-pixel-ratio:', data['device-pixel-ratio']);
        
        // The device display PPI (pixels per inch)
        console.log('device-ppi:', data['device-ppi']);
        
        // The average device price on release in USD
        console.log('device-price:', data['device-price']);
        
        // The year when this device model was released
        console.log('device-release:', `'${data['device-release']}'`);
        
        // The device display resolution in physical pixels (e.g. 720x1280)
        console.log('device-resolution:', `'${data['device-resolution']}'`);
        
        // The device display width in CSS 'px'
        console.log('device-width-px:', data['device-width-px']);
        
        // Is this a mobile device (e.g. a phone or tablet)
        console.log('is-mobile:', data['is-mobile']);
        
        // Is this a WebView / embedded software client
        console.log('is-webview:', data['is-webview']);
        
        // The client software name
        console.log('name:', `'${data['name']}'`);
        
        // The full operating system name
        console.log('os:', `'${data['os']}'`);
        
        // The operating system family. The major OS families are: Android, Windows, macOS, iOS, Linux
        console.log('os-family:', `'${data['os-family']}'`);
        
        // The operating system full version
        console.log('os-version:', `'${data['os-version']}'`);
        
        // The operating system major version
        console.log('os-version-major:', `'${data['os-version-major']}'`);
        
        // The user agent type, possible values are:
        // • desktop
        // • phone
        // • tablet
        // • wearable
        // • tv
        // • console
        // • email
        // • library
        // • robot
        // • unknown
        console.log('type:', `'${data['type']}'`);
        
        // The user agent string
        console.log('ua:', `'${data['ua']}'`);
        
        // The client software full version
        console.log('version:', `'${data['version']}'`);
        
        // The client software major version
        console.log('version-major:', `'${data['version-major']}'`);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
