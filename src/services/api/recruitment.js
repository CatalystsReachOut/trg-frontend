import * as apiProvider from './../provider'
import * as apiConstant from '../../utils/apiConstants'


// Business
export const getBusiness = () => {
    return apiProvider.getAll(apiConstant.Business)
}

export const createBusiness = (data) => {
    return apiProvider.post(apiConstant.Business, data)
}

export const editBusiness = (id, data) => {
    return apiProvider.put(apiConstant.Business, id, data)
}

export const getBusinessById = (id) => {
    return apiProvider.get(apiConstant.Business, id)
}


// City
export const getCity = () => {
    return apiProvider.getAll(apiConstant.City)
}

export const createCity = (data) => {
    return apiProvider.post(apiConstant.City, data)
}

export const getCityById = (id) => {
    return apiProvider.get(apiConstant.City, id)
}

// Country
export const getCountry = () => {
    return apiProvider.getAll(apiConstant.Country)
}

export const createCountry = (data) => {
    return apiProvider.post(apiConstant.Country, data)
}

export const getCountryById = (id) => {
    return apiProvider.get(apiConstant.Country, id)
}

// Department
export const getDepartment = () => {
    return apiProvider.getAll(apiConstant.Department)
}

export const createDepartment = (data) => {
    return apiProvider.post(apiConstant.Department, data)
}

export const getDepartmentById = (id) => {
    return apiProvider.get(apiConstant.Department, id)
}


// InterviewRounds
export const getInterviewRounds = () => {
    return apiProvider.getAll(apiConstant.InterviewRounds)
}

export const createInterviewRounds = (data) => {
    return apiProvider.post(apiConstant.InterviewRounds, data)
}

export const getInterviewRoundsById = (id) => {
    return apiProvider.get(apiConstant.InterviewRounds, id)
}

// QuestionBank
export const getQuestionBank = () => {
    return apiProvider.getAll(apiConstant.QuestionBank)
}

export const createQuestionBank = (data) => {
    return apiProvider.post(apiConstant.QuestionBank, data)
}

export const getQuestionBankById = (id) => {
    return apiProvider.get(apiConstant.QuestionBank, id)
}


// Round
export const getRound = () => {
    return apiProvider.getAll(apiConstant.Round)
}

export const createRound = (data) => {
    return apiProvider.post(apiConstant.Round, data)
}

export const getRoundById = (id) => {
    return apiProvider.get(apiConstant.Round, id)
}


// State
export const getState = () => {
    return apiProvider.getAll(apiConstant.State)
}

export const createState = (data) => {
    return apiProvider.post(apiConstant.State, data)
}

export const getStateById = (id) => {
    return apiProvider.get(apiConstant.State, id)
}

// User
export const loginUser = (data) => {
    return apiProvider.post(apiConstant.UserLogin, data)
}


export const createUser = (data) => {
    return apiProvider.post(apiConstant.UserSignUp, data)
}

export const getUserById = (id) => {
    return apiProvider.get(apiConstant.State, id)
}

// Job
export const getJob = () => {
    return apiProvider.getAll(apiConstant.Job)
}

export const createJob = (data) => {
    return apiProvider.post(apiConstant.Job, data)
}

export const getJobById = (id) => {
    return apiProvider.get(apiConstant.Job, id)
}

export const updateJobById = (id, data) => {
    return apiProvider.put(apiConstant.Job, id, data)
}

// Job
export const getProfile = () => {
    return apiProvider.getAll(apiConstant.Profile)
}

export const createProfile = (data) => {
    return apiProvider.post(apiConstant.Profile, data)
}

export const editProfile = (id, data) => {
    return apiProvider.put(apiConstant.Business, id, data)
}

export const updateProfile = (id, data) => {
    return apiProvider.put(apiConstant.Profile)
}