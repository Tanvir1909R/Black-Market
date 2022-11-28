import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import CategoryItems from "./pages/CategoryItems";
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import SellerAddProduct from './pages/dashboard/SellerAddProduct'
import SellerMyProduct from "./pages/dashboard/SellerMyProduct";
import Error404 from "./pages/Error404";
import AllBuyer from './pages/dashboard/AllBuyer'
import AllSeller from "./pages/dashboard/AllSeller";
import ReportedItem from "./pages/dashboard/ReportedItem";
import Payment from "./pages/dashboard/Payment";
import SellerRoute from './routes/SellerRoute'
import AdminRoute from "./routes/AdminRoute";
import BuyerRoute from "./routes/BuyerRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <section className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/categories/:name"
            element={
              <PrivateRoute>
                <CategoryItems />
              </PrivateRoute>
            }
          />
          //dashboard parent
          <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            //---------------dashboard child
            //BuyerDashboard
              <Route path="/dashboard/myOrder" element={ <BuyerRoute><BuyerDashboard/></BuyerRoute> }/>
              //SellerDashboard
              <Route path="/dashboard/addProduct" element={ <SellerRoute><SellerAddProduct/></SellerRoute> }/>
              <Route path="/dashboard/myProducts" element={ <SellerMyProduct/> }/>
              <Route path="/dashboard/allBuyer" element={ <AdminRoute><AllBuyer /></AdminRoute> }/>
              <Route path="/dashboard/allSeller" element={ <AdminRoute><AllSeller /></AdminRoute> }/>
              <Route path="/dashboard/reportedItem" element={ <AdminRoute><ReportedItem /></AdminRoute> }/>
          </Route>
          <Route path="/payment/:id" element={ <Payment/> }/>
          <Route path="/*" element={ <Error404/> }/>
        </Routes>
        <Toaster />
      </section>
      <Footer />
    </>
  );
};

export default App;
