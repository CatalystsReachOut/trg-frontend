// response.js
import * as errors from '../constants/errors';

export function handleResponse(response) {
    if (response.status === 201 || response.status === 200) {
        response.data.isSuccess = true;
    } else {
        response.data.isSuccess = false;
    }
    return response.data;
}


export function handleError(error) {
    var { response } = error;
    if (typeof response === 'undefined') {
        response = [];
    }
    if (typeof response.data === 'undefined' || response.data === null || response.data === '') {
        response.data.data = [];
    }
    response.data.isSuccess = false;
    if (typeof response.data.message === 'undefined' || response.data.message === null || response.data.message === '') {
        response.data.message = errors.SOMETHING_WENT_WRONG;
    }
    if ((response.status === 401 && response.statusText === 'Unauthorized') || (response.status === 401 && response.data.message === 'Unauthenticated.')) {
        // localStorage.clear();
        // window.location.href = '/login';
        return;
    } else {
        return response.data;
    }

}