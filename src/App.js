import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CategoryItems from "./pages/CategoryItems";
import Footer from "./Components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import SellerAddProduct from "./pages/dashboard/SellerAddProduct";
import SellerMyProduct from "./pages/dashboard/SellerMyProduct";
import SellerPaymentMethod from "./pages/dashboard/SellerPaymentMethod";
import SellerPaymentMethodList from "./pages/dashboard/SellerPaymentMethodList";
import SellerPendingPayments from "./pages/dashboard/SellerPendingPayments";
import Error404 from "./pages/Error404";
import AdminOverview from "./pages/dashboard/AdminOverview";
import AllBuyer from "./pages/dashboard/AllBuyer";
import AllSeller from "./pages/dashboard/AllSeller";
import ReportedItem from "./pages/dashboard/ReportedItem";
import Payment from "./pages/dashboard/Payment";
import SellerRoute from "./routes/SellerRoute";
import AdminRoute from "./routes/AdminRoute";
import BuyerRoute from "./routes/BuyerRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <section className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories/:name" element={<CategoryItems />} />
          //dashboard parent
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            //---------------dashboard child //BuyerDashboard
            <Route
              path="/dashboard/myOrder"
              element={
                <BuyerRoute>
                  <BuyerDashboard />
                </BuyerRoute>
              }
            />
            //SellerDashboard
            <Route
              path="/dashboard/addProduct"
              element={
                <SellerRoute>
                  <SellerAddProduct />
                </SellerRoute>
              }
            />
            <Route path="/dashboard/myProducts" element={<SellerMyProduct />} />
            <Route
              path="/dashboard/paymentMethod"
              element={<SellerRoute><SellerPaymentMethod /></SellerRoute>}
            />
            <Route
              path="/dashboard/myPaymentMethods"
              element={<SellerRoute><SellerPaymentMethodList /></SellerRoute>}
            />
            <Route
              path="/dashboard/pendingPayments"
              element={<SellerRoute><SellerPendingPayments /></SellerRoute>}
            />
            <Route
              path="/dashboard/overview"
              element={<AdminRoute><AdminOverview /></AdminRoute>}
            />
            <Route
              path="/dashboard/allBuyer"
              element={
                <AdminRoute>
                  <AllBuyer />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/allSeller"
              element={
                <AdminRoute>
                  <AllSeller />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard/reportedItem"
              element={
                <AdminRoute>
                  <ReportedItem />
                </AdminRoute>
              }
            />
          </Route>
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
        <Toaster />
      </section>
      <Footer />
    </>
  );
};

export default App;
