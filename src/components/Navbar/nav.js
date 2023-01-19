import { BsJournalBookmark } from "react-icons/bs";
import { FiHome, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/RouterConfig";


const stat = 's'
const drop = 'd'

export const defaultNavbarData = [
    {
        route: ROUTES?.Home,
        label: "Home",
        key: 'home',
        children: [],
        icon: <FiHome />
    },
    {
        label: 'Jobs',
        key: 'jobs',
        icon: <BsJournalBookmark />,
        children: [
            {
                label: <Link to={ROUTES?.Recruitment?.ViewJobs || "#"} > View Jobs </Link>,
                route: ROUTES?.Recruitment.ViewJobs,
                key: 'viewjobs',
            },
            
            // {
            //     label: <Link to={ROUTES?.Recruitment?.Master?.WorkType || "#"} > Work Shift </Link>,
            //     route: ROUTES?.Recruitment?.Master?.WorkType,
            //     key: 'worktype',
            // },
            // {
            //     label: <Link to={ROUTES?.Recruitment?.Master?.WorkShift || "#"} > Work Shift</Link>,
            //     route: ROUTES?.Recruitment?.Master?.WorkShift,
            //     key: 'workshift',
            // }
        ]
    },

]


export const adminNavbarData = [
    {
        route: ROUTES?.Home,
        label: "Home",
        key: 'home',
        children: [],
        icon: <FiHome />
    },

    {
        label: "Master",
        key: 'master',
        icon: <FiUser />,
        children: [
            {
                label: <Link to={ROUTES?.Recruitment?.Master?.Bussiness || "#"} > Business </Link>,
                route: ROUTES?.Recruitment?.Master?.Bussiness,
                key: 'bussiness',
            },
            {
                label: <Link to={ROUTES?.Recruitment?.Master?.Country || "#"} > Business Location </Link>,
                route: ROUTES?.Recruitment?.Master?.Country,
                key: 'bussiness location',
            },
            {
                label: <Link to={ROUTES?.Recruitment?.Master?.Department || "#"} > Department </Link>,
                route: ROUTES?.Recruitment?.Master?.Department,
                key: 'department',
            },
            {
                label: <Link to={ROUTES?.Recruitment?.Master?.band || "#"} > Band </Link>,
                route: ROUTES?.Recruitment?.Master?.band,
                key: 'band',
            },
            {
                label: <Link to={ROUTES?.Recruitment?.Master?.compensation || "#"} > Compensation </Link>,
                route: ROUTES?.Recruitment?.Master?.compensation,
                key: 'compensation',
            },
            {
                label: <Link to={ROUTES?.Recruitment?.Master?.currency || "#"} > Currency </Link>,
                route: ROUTES?.Recruitment?.Master?.currency,
                key: 'currency',
            },
            

        ]
    },
    {
        label: 'Recruitment',
        key: 'recruitment',
        icon: <FiUser />,
        children: [
            {
                label: <Link to={ROUTES?.Recruitment?.Profile || "#"} > Profile </Link>,
                route: ROUTES?.Recruitment.Profile,
                key: 'profile',
            },
            {
                label: <Link to={ROUTES?.Recruitment?.Master?.WorkShift || "#"} > Work Mode </Link>,
                route: ROUTES?.Recruitment?.Master?.WorkShift,
                key: 'work',
            },
            {
                label: <Link to={ROUTES?.Recruitment?.Master?.JobDescription || "#"} > Job Description </Link>,
                route: ROUTES?.Recruitment?.Master?.JobDescription,
                key: 'jobdescription',
            },
            

            {
                label: <Link to={ROUTES?.Recruitment?.Master?.QuestionBank || "#"} > Question Bank </Link>,
                route: ROUTES?.Recruitment?.Master?.QuestionBank,
                key: 'questionbank',
            },
            {
                label: <Link to={ROUTES?.Recruitment?.Master?.Rounds || "#"} > Rounds </Link>,
                route: ROUTES?.Recruitment?.Master?.Rounds,
                key: 'rounds',
            },

            {
                label: <Link to={ROUTES?.Recruitment?.Master?.InterviewRounds || "#"} > Interview Rounds </Link>,
                route: ROUTES?.Recruitment?.Master?.InterviewRounds,
                key: 'interviewrounds',
            },
            
            // {
            //     label: <Link to={ROUTES?.Recruitment?.Master?.WorkType || "#"} > Work Shift </Link>,
            //     route: ROUTES?.Recruitment?.Master?.WorkType,
            //     key: 'worktype',
            // },
            // {
            //     label: <Link to={ROUTES?.Recruitment?.Master?.WorkShift || "#"} > Work Shift</Link>,
            //     route: ROUTES?.Recruitment?.Master?.WorkShift,
            //     key: 'workshift',
            // }
        ]
    },
    {
        label: 'Jobs',
        key: 'jobs',
        icon: <BsJournalBookmark />,
        children: [
            {
                label: <Link to={ROUTES?.Recruitment?.CreateJob || "#"} >Create job</Link>,
                route: ROUTES?.Recruitment.CreateJob,
                key: 'createjob',
            },
            {
                label: <Link to={ROUTES?.Recruitment?.ViewJobs || "#"} > View Jobs </Link>,
                route: ROUTES?.Recruitment.ViewJobs,
                key: 'viewjobs',
            },
            
            // {
            //     label: <Link to={ROUTES?.Recruitment?.Master?.WorkType || "#"} > Work Shift </Link>,
            //     route: ROUTES?.Recruitment?.Master?.WorkType,
            //     key: 'worktype',
            // },
            // {
            //     label: <Link to={ROUTES?.Recruitment?.Master?.WorkShift || "#"} > Work Shift</Link>,
            //     route: ROUTES?.Recruitment?.Master?.WorkShift,
            //     key: 'workshift',
            // }
        ]
    },

]