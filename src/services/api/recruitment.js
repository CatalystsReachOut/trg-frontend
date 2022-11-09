import * as apiProvider from './../provider'
import * as apiConstant from '../../utils/apiConstants'

// export const getData = () => {
//     return apiProvider.getAll('')
// }

// Round
export const getRound = () =>{
    return apiProvider.getAll(apiConstant.Round)
}

export const createRound = (data) =>{
    return apiProvider.post(apiConstant.Round,data)
}

export const getRoundById = (id) =>{
    return apiProvider.get(apiConstant.Round,id)
}


// Business
export const getBusiness = () =>{
    return apiProvider.getAll(apiConstant.Business)
}

export const createBusiness = (data) =>{
    return apiProvider.post(apiConstant.Business,data)
}

export const getBusinessById = (id) =>{
    return apiProvider.get(apiConstant.Business,id)
}


// City
export const getCity = () =>{
    return apiProvider.getAll(apiConstant.City)
}

export const createCity = (data) =>{
    return apiProvider.post(apiConstant.City,data)
}

export const getCityById = (id) =>{
    return apiProvider.get(apiConstant.City,id)
}