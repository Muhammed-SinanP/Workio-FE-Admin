import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ContactPageIcon from '@mui/icons-material/ContactPage';

export const SidebarData = [

    {
        icon:<DashboardIcon fontSize="small" className='p-1'/>,
        title:"Dashboard",
        path:"/"
    },
    {
        icon:<GroupIcon fontSize="small" className='p-1'/>,
        title:"Users",
        children:[
            {
                title:"All users",
                path:"/allUsers"
            },
            {
                title:"Job seekers",
                path:"/allJobSeekers"
            },
            {
                title:"Employers",
                path:"/allEmployers"
            },
        ]
    },
    {
        icon:<NewspaperIcon fontSize="small" className='p-1'/>,
        title:"Job posts",
        children:[
            {
                title:"All job posts",
                path:"/allJobPosts"
            },
            {
                title:"Verified posts",
                path:"/jobPosts/verified"
            },
            {
                title:"Pending posts",
                path:"/jobPosts/pending"
            },
        ]
    },
   
]