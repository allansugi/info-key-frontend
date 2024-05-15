import { methods } from "./requestMethods";


/**
 * for making request WITHOUT request body
 * @template R - response body
 */
export class Request<R> {
    method: string;
    url: string;

    constructor(method: string, url: string) {
        this.method = method;
        this.url = url;
    }

    /**
     * make request with body
     * @returns response body
     */
    async makeRequest(): Promise<R> {
        if (!methods.includes(this.method)) {
            throw new Error("invalid method");
        }
    
        const response = await fetch(this.url, {
            method: this.method,
            mode: "cors",
            headers: {
                'Access-Control-Allow-Origin': "http://localhost:8080"
            },
            credentials: "include"
        })
    
        const responseData: R = await response.json()
        return responseData
    }
}