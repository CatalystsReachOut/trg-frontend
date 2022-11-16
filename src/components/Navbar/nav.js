import { FiHome, FiUser } from "react-icons/fi";
import { ROUTES } from "../../routes/RouterConfig";

const stat = 's'
const drop = 'd'

export const navbarData = [
    {
        title:'Home',
        route:ROUTES.Home,
        type:stat,
        icon:<FiHome/>
    },
    
    {
        title:'Recruitment',
        type:drop,
        icon:<FiUser/>,
        data:[
            {
                title:'Profile',
                route:ROUTES.Recruitment.Profile,
                type:stat
            },
            {
                title:'Create Job',
                route:ROUTES.Recruitment.CreateJob,
                type:stat
            },
            {
                title:'View Jobs',
                route:ROUTES.Recruitment.ViewJobs,
                type:stat
            },
            {
                title:'Master',
                type:drop,
                data:[
                    {
                        title:'Bussiness',
                        route:ROUTES.Recruitment.Master.Bussiness,
                        type:stat
                    },
                    {
                        title:'City',
                        route:ROUTES.Recruitment.Master.City,
                        type:stat
                    },
                    {
                        title:'State',
                        route:ROUTES.Recruitment.Master.State,
                        type:stat
                    },
                    {
                        title:'Country',
                        route:ROUTES.Recruitment.Master.Country,
                        type:stat
                    },
                ]
            },
        ]
    }

]