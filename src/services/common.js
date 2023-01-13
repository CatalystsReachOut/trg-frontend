import * as storageConstants from '../utils/storageConstants.js';
import imgError from "../assets/images/logo/trg-black.png"


export function storeLocalData(type, name, data) {
    try {
        if (type === storageConstants.SESSION) {
            sessionStorage.setItem(name, JSON.stringify(data, (k, v) => v === undefined ? null : v));
        }
        else if (type === storageConstants.LOCAL) {
            console.log('here');
            localStorage.setItem(name, JSON.stringify(data?data:null));
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
            return JSON.parse(sessionStorage.getItem(name))
        }
        else if (type === storageConstants.LOCAL) {
            return JSON.parse(localStorage.getItem(name))
        }
        return true;
    } catch (e) {
        alert('Your web browser does not support storing settings locally. Some settings may not save or some features may not work properly for you.');
        return false;
    }

}


export const fallBackImage = imgError;