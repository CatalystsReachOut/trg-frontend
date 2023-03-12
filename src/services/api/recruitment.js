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
export const getCity = (query) => {
    return apiProvider.getAll(apiConstant.City, query)
}

export const createCity = (data) => {
    return apiProvider.post(apiConstant.City, data)
}

export const getCityById = (id) => {
    return apiProvider.get(apiConstant.City, id)
}

export const editCity = (id, data) => {
    return apiProvider.put(apiConstant.City, id, data)
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

export const editCountry = (id, data) => {
    return apiProvider.put(apiConstant.Country, id, data)
}

// Department
export const getDepartment = () => {
    return apiProvider.getAll(apiConstant.Department)
}

export const createDepartment = (data) => {
    return apiProvider.post(apiConstant.Department, data)
}

export const editDepartment = (id, data) => {
    return apiProvider.put(apiConstant.Department, id, data)
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

export const editInterviewRound = (id, data) => {
    return apiProvider.put(apiConstant.InterviewRounds, id, data)
}

// QuestionBank
export const getQuestionBank = (e) => {
    return apiProvider.getAll(apiConstant.QuestionBank, e)
}

export const createQuestionBank = (data) => {
    return apiProvider.post(apiConstant.QuestionBank, data)
}

export const getQuestionBankById = (id) => {
    return apiProvider.get(apiConstant.QuestionBank, id)
}

export const editQuestionBank = (id, data) => {
    return apiProvider.put(apiConstant.QuestionBank, id, data)
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

export const editRound = (id, data) => {
    return apiProvider.put(apiConstant.Round, id, data)
}


// State
export const getState = (query) => {
    return apiProvider.getAll(apiConstant.State, query)
}

export const createState = (data) => {
    return apiProvider.post(apiConstant.State, data)
}

export const getStateById = (id) => {
    return apiProvider.get(apiConstant.State, id)
}

export const editState = (id, data) => {
    return apiProvider.put(apiConstant.State, id, data)
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

export const getJobByJobseeker = (id) => {
    return apiProvider.get(apiConstant.getJobSeekerJob, id)
}

export const updateJobById = (id, data) => {
    return apiProvider.put(apiConstant.Job, id, data)
}

// Profile
export const getProfile = (query) => {
    return apiProvider.getAll(apiConstant.Profile, query)
}

export const createProfile = (data) => {
    return apiProvider.post(apiConstant.Profile, data)
}

export const editProfile = (id, data) => {
    return apiProvider.put(apiConstant.Profile, id, data)
}

//WorkType

export const getWorkType = () => {
    return apiProvider.getAll(apiConstant.workType)
}

export const createWorkType = (data) => {
    return apiProvider.post(apiConstant.workType, data)
}

export const editWorkType = (id, data) => {
    return apiProvider.put(apiConstant.workType, id, data)
}


//WorkShift
export const getWorkShift = () => {
    return apiProvider.getAll(apiConstant.workShift)
}

export const createWorkShift = (data) => {
    return apiProvider.post(apiConstant.workShift, data)
}

export const editWorkShift = (id, data) => {
    return apiProvider.put(apiConstant.workShift, id, data)
}


//WorkStyle
export const getWorkStyle = () => {
    return apiProvider.getAll(apiConstant.workStyle)
}

export const createWorkStyle = (data) => {
    return apiProvider.post(apiConstant.workStyle, data)
}

export const editWorkStyle = (id, data) => {
    return apiProvider.put(apiConstant.workStyle, id, data)
}


// Job Description
export const getJobDescription = (query) => {
    return apiProvider.getAll(apiConstant.jobDescription, query)
}

export const createJobDescription = (data) => {
    return apiProvider.post(apiConstant.jobDescription, data)
}

export const editJobDescription = (id, data) => {
    return apiProvider.put(apiConstant.jobDescription, id, data)
}

export const getJobDescriptionById = (id) => {
    return apiProvider.get(apiConstant.jobDescription, id)
}


//Bands
export const getBands = () => {
    return apiProvider.getAll(apiConstant.band)
}

export const createBand = (data) => {
    return apiProvider.post(apiConstant.band, data)
}

export const editBand = (id, data) => {
    return apiProvider.put(apiConstant.band, id, data)
}


//Compensation
export const getCompensationModes = () => {
    return apiProvider.getAll(apiConstant.compensation)
}

export const createCompensationMode = (data) => {
    return apiProvider.post(apiConstant.compensation, data)
}

export const editCompensationMode = (id, data) => {
    return apiProvider.put(apiConstant.compensation, id, data)
}


//Currency
export const getCurrencies = () => {
    return apiProvider.getAll(apiConstant.currency)
}

export const createCurrency = (data) => {
    return apiProvider.post(apiConstant.currency, data)
}

export const editCurrency = (id, data) => {
    return apiProvider.put(apiConstant.currency, id, data)
}



// JOBSEEKERS
export const getJobseekers = () => {
    return apiProvider.getAll(apiConstant.jobseeker)
}

