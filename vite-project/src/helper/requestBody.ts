import { methods } from "./requestMethods";

/**
 * for making request with request body
 * @template T - request body
 * @template R - response body
 */
export class RequestBody<T, R> {
    method: string;
    url: string;
    body: T

    constructor(method: string, url: string, body: T) {
        this.method = method;
        this.url = url;
        this.body = body;
    }

    /**
     * make request with body
     * @returns response body
     */
    async makeRequestWithBody(): Promise<R> {
        if (!methods.includes(this.method)) {
            throw new Error("invalid method");
        }
    
        const response = await fetch(this.url, {
            method: this.method,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': 'http://localhost:8080'
            },
            credentials: "include",
            body: JSON.stringify(this.body)
        })
    
        const responseData: R = await response.json()
        return responseData
    }
}