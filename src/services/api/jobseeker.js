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


// Auth
//login
export const login = (data) => {
    return apiProvider.post(apiConstant.Login, data)
}
//signup
export const SignUp = (data) => {
    return apiProvider.post(apiConstant.SignUp, data)
}
//verfiyOTP
export const VerifyOTP = (data) => {
    return apiProvider.post(apiConstant.VerifyOTP, data)
}

//Update Profile
export const UpdateProfile = (data) => {
    return apiProvider.put(apiConstant.updateProfile,'',data)
}

//Apply Job
export const ApplyJob = (id) => {
    console.log(id);
    return apiProvider.post(apiConstant.applyJob+'/'+id)
}

//Update Job Application includes examination
export const UpdateJobApplication = (id,data) => {
    console.log(id);
    return apiProvider.put(apiConstant.JobApplicationUpdate,id,data)
}


//Interview Exam

// get Questions
export const getInterViewQuestions = (id) => {
    console.log(id);
    return apiProvider.get(apiConstant.getInterviewQuestions,id)
}

//Submit Exam
export const EvaluateExam = (data) => {
    return apiProvider.post(apiConstant.EvaluateInterviewQuestions, data)
}