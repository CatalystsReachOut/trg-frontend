export const ROUTES = {
    User: {
        Login: '/login',
        SignUp: '/signup',
        ForgotPassword: '/forgotpassword',
        OTP: '/reset-otp',
        Reset: '/resetpassword'
    },
    Recruitment: {
        Master: {
            Rounds: '/recruitment/master/rounds',
            InterviewRounds: '/recruitment/master/interview-rounds',
            QuestionBank: '/recruitment/master/question-bank',
            State: '/recruitment/master/state',
            Department: '/recruitment/master/department',
            Country: '/recruitment/master/country',
            City: '/recruitment/master/city',
            Bussiness: '/recruitment/master/bussiness',
            WorkType: '/recruitment/master/work-type',
            WorkShift: '/recruitment/master/work-shift',
            WorkStyle: '/recruitment/master/work-style',
            JobDescription: '/recruitment/master/job-description',
            band: '/recruitment/master/band',
            compensation: '/recruitment/master/compensation',
            currency: '/recruitment/master/currency',
        },
        CreateJob: '/recruitment/create-job',
        Job: '/recruitment/job',
        ViewJobs: '/recruitment/view-job',
        TrackJobProgrees: '/recruitment/track-job',
        Profile: '/recruitment/profile',
        Approval1: '/approval1',
        Approval2: '/approval2',
        Approval3: '/approval3',
        Approval4: '/approval4',
        progress: '/job/progress'
    },
    Home: '/',
    About: '/about',
    Profile:{
        Initial:{
            Root:'/new-user',
            Registration:'registration',
            VerifyOTP:'verify-otp',
            Basic:'basic',
        }
    }
}


export const USER_ROUTES = {
    Home:'/user/home',
    ViewJobs:'user/view-jobs',
    EidtJob:'user/job',

}