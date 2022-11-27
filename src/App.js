import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
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

const App = () => {
  return (
    <>
      <Navbar />
      <section className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
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
              <Route path="/dashboard/myOrder" element={ <BuyerDashboard/> }/>
              //SellerDashboard
              <Route path="/dashboard/addProduct" element={ <SellerAddProduct/> }/>
              <Route path="/dashboard/myProducts" element={ <SellerMyProduct/> }/>
              <Route path="/dashboard/allBuyer" element={<AllBuyer />}/>
              <Route path="/dashboard/allSeller" element={ <AllSeller /> }/>
              <Route path="/dashboard/reportedItem" element={ <ReportedItem /> }/>
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
