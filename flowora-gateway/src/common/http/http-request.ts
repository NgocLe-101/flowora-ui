import { HttpMethod } from "./constant";
import type { RequestHeader, RequestHeaderValues } from "./type";

export default class HttpRequest {
    private _uri: string;
    private _method: HttpMethod;
    private _headers: Map<RequestHeader, RequestHeaderValues>;
    private _body: URLSearchParams;

    constructor(uri: string, method: HttpMethod, headers: Map<RequestHeader, RequestHeaderValues>, body: URLSearchParams) {
        this._uri = uri;
        this._method = method;
        this._headers = headers;
        this._body = body;
    }

    public get uri() { return this._uri; };
    public set uri(uri: string) { this._uri = uri; };

    public get method() { return this._method; };
    public set method(method: HttpMethod) { this._method = method; };

    public get headers() { return this._headers; };
    public set headers(headers: Map<RequestHeader, RequestHeaderValues>) { this._headers = headers; };

    public get body() { return this._body; };
    public set body(body: URLSearchParams) { this._body = body; };
}
