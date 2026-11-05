'use strict';

const NeutrinoAPIClient = require('../client/neutrino-api-client');

const neutrinoAPIClient = new NeutrinoAPIClient('<your-user-id>', '<your-api-key>');

const params = {

    // The user-agent string to lookup. For client hints this corresponds to the 'sec-ch-ua' header or
    // you can also pass the JSON data directly from the
    // 'navigator.userAgentData.getHighEntropyValues()' JavaScript API
    'ua': 'Mozilla/5.0 (Linux; Android 11; SM-G9980U1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36',

    // For client hints this corresponds to the 'sec-ch-ua-full-version' header
    'ua-version': '',

    // For client hints this corresponds to the 'sec-ch-ua-platform' header
    'ua-platform': '',

    // For client hints this corresponds to the 'sec-ch-ua-platform-version' header
    'ua-platform-version': '',

    // For client hints this corresponds to the 'sec-ch-ua-mobile' header
    'ua-mobile': '',

    // For client hints this corresponds to the 'sec-ch-ua-model' header. You can also use this
    // parameter to lookup a device directly by its model name, model code or hardware code, on android
    // you can get the model name from:
    // https://developer.android.com/reference/android/os/Build.html#MODEL
    'device-model': '',

    // This parameter is only used in combination with 'device-model' for direct device lookups without
    // any user-agent data. Set this to the brand or manufacturer name, this is required for accurate
    // device detection with ambiguous model names. On android you can get the device brand from:
    // https://developer.android.com/reference/android/os/Build#MANUFACTURER
    'device-brand': '',

    // For client hints this corresponds to the 'sec-ch-ua-arch' header
    'ua-arch': '',

    // For client hints this corresponds to the 'sec-ch-ua-bitness' header
    'ua-bitness': '',

    // For client hints this corresponds to the 'sec-ch-ua-form-factors' header
    'ua-form-factors': ''
};

neutrinoAPIClient.uaLookup(params)
    .then((apiResponse) => {
        // API request successful, print out the response data
        const data = apiResponse.data;
        console.log("API Response OK:");
        
        // For web browsers which underlying browser engine does it use
        console.log('browser-engine:', `'${data['browser-engine']}'`);
        
        // The web browser name. For Apps/WebViews this will be the name of the underlying browser used,
        // otherwise this is identical to the 'name' field
        console.log('browser-name:', `'${data['browser-name']}'`);
        
        // For web browsers which year was this browser version released
        console.log('browser-release:', `'${data['browser-release']}'`);
        
        // For web browsers the ISO date this browser version was released
        console.log('browser-release-date:', `'${data['browser-release-date']}'`);
        
        // The browsers full version. For Apps/WebViews this will be the full version of the underlying app
        // browser, otherwise this is identical to the 'version' field
        console.log('browser-version:', `'${data['browser-version']}'`);
        
        // The browsers major version. For Apps/WebViews this will be the major version of the underlying
        // app browser, otherwise this is identical to the 'version-major' field
        console.log('browser-version-major:', `'${data['browser-version-major']}'`);
        
        // The device brand / manufacturer
        console.log('device-brand:', `'${data['device-brand']}'`);
        
        // The device display height in millimeters
        console.log('device-height-mm:', data['device-height-mm']);
        
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
        
        // The device display width in millimeters
        console.log('device-width-mm:', data['device-width-mm']);
        
        // The device display width in CSS 'px'
        console.log('device-width-px:', data['device-width-px']);
        
        // True if this user agent is from a mobile or desktop app. You can distinguish the app name and
        // version from the 'name' and 'version-*' fields and the underlying browser/WebView from the
        // 'browser-*' fields
        console.log('is-app:', data['is-app']);
        
        // For web browsers is the version up-to-date with the current stable release (+/- one version)
        console.log('is-current:', data['is-current']);
        
        // Is this a mobile device (e.g. a phone or tablet)
        console.log('is-mobile:', data['is-mobile']);
        
        // For chrome/chromium based browsers is this user agent string frozen and requires client hints for
        // more accurate details. For more information see user-agent reduction and to test a browser for
        // client hints go to the client hints analyzer test page
        console.log('is-ua-frozen:', data['is-ua-frozen']);
        
        // Is this a WebView or embedded web browser. This includes mobile and desktop apps using WebViews
        console.log('is-webview:', data['is-webview']);
        
        // The client software name / user agent name / web browser name
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
        
        // The user agent software full version
        console.log('version:', `'${data['version']}'`);
        
        // The user agent software major version
        console.log('version-major:', `'${data['version-major']}'`);
    })
    .catch((apiResponse) => {
        // API request failed, you should handle this gracefully!
        console.error(`API Error: ${apiResponse.errorMessage}, Error Code: ${apiResponse.errorCode}, HTTP Status Code: ${apiResponse.statusCode}`)
        if (apiResponse.errorCause) {
            console.error('Error Caused By: ', apiResponse.errorCause);
        }
    });
