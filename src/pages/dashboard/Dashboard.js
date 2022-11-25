import React, { useContext } from "react";
import { authProvider } from "../../contexts/UserContext";
import { Link, Outlet } from "react-router-dom";
import useUserState from "../../hooks/useUserState";

const Dashboard = () => {
  const { user } = useContext(authProvider);
  const [userState] = useUserState(user.email);

  return (
    <div className="Container">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <h1 className="text-center text-3xl mb-5">Dashboard</h1>
          <Outlet/>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            {userState.isBuyer && (
              <li>
                <Link to="/dashboard/myOrder">My Order</Link>
              </li>
            )}
            {userState.isSeller && (
              <>
                <li>
                  <Link to="dashboard/addProduct">Add Product</Link>
                </li>
                <li>
                  <Link to="/dashboard">My Products</Link>
                </li>
              </>
            )}
            {
              userState.isAdmin &&
              <>
                <li>
                  <Link to="/dashboard">All Buyer</Link>
                </li>
                <li>
                  <Link to="dashboard/myProduct">All Seller</Link>
                </li>
                <li>
                  <Link to="dashboard/myProduct">Reported Items</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
