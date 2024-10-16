import { check } from "k6";
import { Rate } from 'k6/metrics';

// Defining error rate
export let errorRate = new Rate('errors');

export const check_error = (response) => {
    const result = check(response, {
        'Success (2xx)': (r) => r.status === 200 || r.status === 202 || r.status === 204,
        // 'Client Errors (4xx)': (r) => r.status >= 400 && r.status < 500,
        // 'Server Errors (5xx)': (r) => r.status >= 500 && r.status <= 511,
    },
        { endpoint: response.url, status: response.status });
    if (!result) { 
        // console.warn(response.request.url, response.status, JSON.stringify(response.body))
        errorRate.add(!result);   
    }
};