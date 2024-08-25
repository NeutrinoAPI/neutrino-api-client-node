# NeutrinoAPI Node Native SDK

Neutrino API Node.js client using the native HTTP library

The official API client and SDK built by [NeutrinoAPI](https://www.neutrinoapi.com/)

| Feature          |        |
|------------------|--------|
| Platform Version | >= 10  |
| HTTP Library     | Native |
| JSON Library     | Native |
| HTTP/2           | No     |
| HTTP/3           | No     |
| CodeGen Version  | 4.6.16 |

## Getting started

First you will need a user ID and API key pair: [SignUp](https://www.neutrinoapi.com/signup/)

## To Initialize
```js
const neutrinoAPI = new NeutrinoAPIClient('<your-user-id>', '<your-api-key');
```

## Running Examples

```sh
$ node src/examples/bad-word-filter.js
```
You can find examples of all APIs in _src/examples/_

Set the __'your-user-id'__ and __'your-api-key'__ values in the example to retrieve real API responses

## Install using NPM
```sh
$ npm install neutrino-api-client-node
```
Then include the package in your project:
```js
const NeutrinoAPIClient = require("neutrino-api-client-node");
```

## For Support
[Contact us](https://www.neutrinoapi.com/contact-us/)
