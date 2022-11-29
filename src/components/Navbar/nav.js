import { FiHome, FiUser } from "react-icons/fi";
import { ROUTES } from "../../routes/RouterConfig";

const stat = 's'
const drop = 'd'

export const defaultNavbarData = [
    {
        title: 'Home',
        route: ROUTES.Home,
        type: stat,
        icon: <FiHome />
    },

    {
        title: 'Recruitment',
        type: drop,
        icon: <FiUser />,
        data: [
            {
                title: 'Create Job',
                route: ROUTES.Recruitment.CreateJob,
                type: stat
            },
            {
                title: 'View Jobs',
                route: ROUTES.Recruitment.ViewJobs,
                type: stat
            }
        ]
    }

]


export const adminNavbarData = [
    {
        title: 'Home',
        route: ROUTES.Home,
        type: stat,
        icon: <FiHome />
    },

    {
        title: 'Recruitment',
        type: drop,
        icon: <FiUser />,
        data: [
            {
                title: 'Profile',
                route: ROUTES.Recruitment.Profile,
                type: stat
            },
            {
                title: 'Create Job',
                route: ROUTES.Recruitment.CreateJob,
                type: stat
            },
            {
                title: 'View Jobs',
                route: ROUTES.Recruitment.ViewJobs,
                type: stat
            },
            {
                title: 'Master',
                type: drop,
                data: [
                    {
                        title: 'Bussiness',
                        route: ROUTES.Recruitment.Master.Bussiness,
                        type: stat
                    },
                    {
                        title: 'City',
                        route: ROUTES.Recruitment.Master.City,
                        type: stat
                    },
                    {
                        title: 'State',
                        route: ROUTES.Recruitment.Master.State,
                        type: stat
                    },
                    {
                        title: 'Country',
                        route: ROUTES.Recruitment.Master.Country,
                        type: stat
                    },
                    {
                        title: 'Department',
                        route: ROUTES.Recruitment.Master.Department,
                        type: stat
                    },
                    {
                        title: 'Rounds',
                        route: ROUTES.Recruitment.Master.Rounds,
                        type: stat
                    },
                    {
                        title: 'Interview Rounds',
                        route: ROUTES.Recruitment.Master.InterviewRounds,
                        type: stat
                    },
                    {
                        title: 'Question Bank',
                        route: ROUTES.Recruitment.Master.QuestionBank,
                        type: stat
                    },
                    {
                        title: 'Work Type',
                        route: ROUTES.Recruitment.Master.WorkType,
                        type: stat
                    },
                    {
                        title: 'Work Shift',
                        route: ROUTES.Recruitment.Master.WorkShift,
                        type: stat
                    },
                    {
                        title: 'Job Description',
                        route: ROUTES.Recruitment.Master.JobDescription,
                        type: stat
                    },
                ]
            },
        ]
    }

]