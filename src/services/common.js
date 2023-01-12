import * as storageConstants from '../utils/storageConstants.js';
import imgError from "../assets/images/logo/trg-black.png"


export function storeLocalData(type, name, data) {
    try {
        if (type === storageConstants.SESSION) {
            sessionStorage.setItem(name, JSON.stringify(data, (k, v) => v === undefined ? null : v));
        }
        else if (type === storageConstants.LOCAL) {
            localStorage.setItem(name, JSON.stringify(data, (k, v) => v === undefined ? null : v));
        }
        return true;
    } catch (e) {
        alert('Your web browser does not support storing settings locally. Some settings may not save or some features may not work properly for you.');
        return false;
    }

}


export function fetchLocalData(type, name) {
    try {
        if (type === storageConstants.SESSION) {
            JSON.parse(sessionStorage.getItem(name))
        }
        else if (type === storageConstants.LOCAL) {
            JSON.parse(localStorage.getItem(name))
        }
        return true;
    } catch (e) {
        alert('Your web browser does not support storing settings locally. Some settings may not save or some features may not work properly for you.');
        return false;
    }

}


export const fallBackImage = imgError;