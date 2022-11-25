// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { authProvider } from "../../contexts/UserContext";
// import { urlProvider } from '../../contexts/UrlContext'
// import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import useUserState from "../../hooks/useUserState";

const Dashboard = () => {
  const {user} = useContext(authProvider)
  const [userState] = useUserState(user.email)
  console.log(userState);
  // const [loading, setLoading] = useState(false)
  // const {baseUrl} = useContext(urlProvider)
  // useEffect(()=>{
  //   setLoading(true)
  //   axios.get(`${baseUrl}/users?email=${user.email}`)
  //   .then(res => {
  //     setCurrentUser(res.data);
  //     setLoading(false)
  //   })
  // },[user])

  // if(loading){
  //   return <Loader/>
  // }

  return (
    <div className="Container">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <h1>bashboard</h1>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
               <li><Link to='/myOrder'>My Order</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
