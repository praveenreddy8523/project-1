import { useEffect, useState } from "react";
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'



const Dashboard = () =>{
    const [isAdmin,setIsAdmin] = useState(localStorage.getItem("isAdmin")=="true"? true : false);
    
    return (<>
        
        
            {
                isAdmin ? <AdminDashboard/> : <UserDashboard/>
            }
        
    </>);
}

export default Dashboard;