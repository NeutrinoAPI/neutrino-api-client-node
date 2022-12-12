'use strict';

const APIErrorCode = require('./api-error-code');

/**
 * API response payload, holds the response data along with any error details
 */
class APIResponse {

    /**
     * Constructor
     *
     * @param data
     * @param file
     * @param statusCode
     * @param contentType
     * @param errorCode
     * @param errorMessage
     * @param errorCause
     */
    constructor(data, file, statusCode, contentType, errorCode, errorMessage, errorCause) {
        this._statusCode = statusCode;
        this._contentType = contentType;
        this._errorCode = errorCode;
        this._errorMessage = errorMessage;
        this._errorCause = errorCause;
        this._data = data;
        this._file = file;
    }

    /**
     * The response data for JSON based APIs
     *
     * @returns Object | null
     */
    get data() {
        return this._data;
    }

    /**
     * The local file path storing the output for file based APIs
     *
     * @returns string | null
     */
    get file() {
        return this._file;
    }

    /**
     * The HTTP status code returned
     *
     * @returns number
     */
    get statusCode() {
        return this._statusCode;
    }

    /**
     * The response content type (MIME type)
     *
     * @returns string
     */
    get contentType() {
        return this._contentType;
    }

    /**
     * The API error code if any error has occurred
     *
     * @returns number
     */
    get errorCode() {
        return this._errorCode;
    }

    /**
     * The API error message if any error has occurred
     *
     * @returns string
     */
    get errorMessage() {
        return this._errorMessage;
    }

    /**
     * For client-side errors or exceptions get the underlying cause
     *
     * @returns Error | null
     */
    get errorCause() {
        return this._errorCause;
    }

    /**
     * Create an API response for JSON data
     * 
     * @param statusCode 
     * @param contentType 
     * @param data 
     * @returns 
     */
    static ofData(statusCode, contentType, data) {
        return new APIResponse(data, null, statusCode, contentType, 0, "", null);
    }

    /**
     * Create an API response for file data
     * 
     * @param statusCode 
     * @param contentType 
     * @param outputFilePath 
     * @returns 
     */
    static ofOutputFilePath(statusCode, contentType, outputFilePath) {
        return new APIResponse(null, outputFilePath, statusCode, contentType, 0, "", null);
    }

    /**
     * Create an API response for status code
     * 
     * @param statusCode 
     * @param contentType 
     * @param errorCode 
     * @param errorMessage 
     * @returns 
     */
    static ofHttpStatus(statusCode, contentType, errorCode, errorMessage) {
        return new APIResponse(null, null, statusCode, contentType, errorCode, errorMessage, null);
    }

    /**
     * Create an API response for error code
     * 
     * @param statusCode 
     * @param contentType 
     * @param errorCode 
     * @returns 
     */
    static ofErrorCode(statusCode, contentType, errorCode) {
        const errorMessage = APIErrorCode.getErrorMessage(errorCode);
        return new APIResponse(null, null, statusCode, contentType, errorCode, errorMessage, null);
    }

    /**
     * Create an API response for error cause
     * 
     * @param errorCode 
     * @param errorCause 
     * @returns 
     */
    static ofCause(errorCode, errorCause) {
        const errorMessage = APIErrorCode.getErrorMessage(errorCode);
        return new APIResponse(null, null, 0, "", errorCode, errorMessage, errorCause);
    }
}

module.exports = APIResponse;
