import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

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
                path:"/users"
            },
            {
                parent: "Users",
                title:"Job seekers",
                path:"/users/jobSeekers"
            },
            {
                parent: "Users",
                title:"Employers",
                path:"/users/employers"
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
                path:"/jobPosts"
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
    {
        icon:<AdminPanelSettingsIcon/>,
        title:"Admin profile",
        path:"/adminProfile"
    }
   
]