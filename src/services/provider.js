import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 
import * as storageConstants from '../utils/storageConstants';
import * as apiConstant from './../utils/apiConstants'

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = apiConstant.BASE_URL;
const auth = JSON.parse(sessionStorage.getItem(storageConstants.AUTH));

const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${auth}`,
        'Content-Type': 'application/json',
};

/** @param {string} resource */ 
export const getAll = (resource, model = '') => { 
  return axios 
    .get(`${BASE_URL}${resource}${model}`, { headers: headers }) 
    .then(handleResponse) 
    .catch(handleError); 
};


export const post = (resource, model) => { 
    return axios 
        .post(`${BASE_URL}${resource}`, model, { headers: headers }) 
        .then(handleResponse) 
        .catch(handleError); 
};


export const get = (resource, id) => { 
    return axios 
      .get(`${BASE_URL}${resource}${id}`, { headers: headers }) 
      .then(handleResponse) 
      .catch(handleError); 
};