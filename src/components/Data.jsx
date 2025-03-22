import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ContactPageIcon from '@mui/icons-material/ContactPage';

export const SidebarData = [

    {
        icon:<DashboardIcon/>,
        title:"Dashboard",
        path:"/"
    },
    {
        icon:<GroupIcon/>,
        title:"Users",
        children:[
            {   
                parent:"Users",
                title:"All users",
                path:"/allUsers"
            },
            {
                parent: "Users",
                title:"Job seekers",
                path:"/allJobSeekers"
            },
            {
                parent: "Users",
                title:"Employers",
                path:"/allEmployers"
            },
        ]
    },
    {
        icon:<NewspaperIcon/>,
        title:"Job posts",
        children:[
            {
                parent: "Job posts",
                title:"All job posts",
                path:"/allJobPosts"
            },
            {
                parent: "Job posts",
                title:"Verified posts",
                path:"/jobPosts/verified"
            },
            {
                parent: "Job posts",
                title:"Pending posts",
                path:"/jobPosts/pending"
            },
        ]
    },
   
]