import { HttpMethod } from "./constant";
import HttpRequest from "./http-request";
import type { RequestHeader, RequestHeaderValues } from "./type";

export default class RequestBuilder {

    private _uri: string = "";
    private _headers: Map<RequestHeader, RequestHeaderValues> = new Map();
    private _body: URLSearchParams = new URLSearchParams();
    private _method: HttpMethod = HttpMethod.GET;

    constructor() {

    }

    public uri(uri: string) {
        this._uri = uri;
        return this;
    }

    public headers(headers: Map<RequestHeader, RequestHeaderValues>) {
        headers.entries().forEach(([k, v]) => {
            this._headers.set(k, v);
        });
        return this;
    }

    public header(key: RequestHeader, value: RequestHeaderValues) {
        this._headers.set(key, value);
        return this;
    }

    public body(body: URLSearchParams) {
        this._body = body;
        return this;
    }

    public method(method: HttpMethod) {
        this._method = method;
        return this;
    }

    private isEmptyString(str: string) {
        return str.length === 0;
    }

    private validateRequest() {
        if (this.isEmptyString(this._uri)) {
            throw new Error("[ERROR] URI cannot be empty");
        }
    }

    public build(): HttpRequest {
        this.validateRequest();

        return new HttpRequest(
            this._uri,
            this._method,
            this._headers,
            this._body,
        )
    }
}
