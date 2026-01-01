import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { authProvider } from "../contexts/UserContext";
import Loader from "../Components/Loader";
import { urlProvider } from "../contexts/UrlContext";
import { FaMobileAlt } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import { BsArrowRight, BsShop, BsCart3 } from "react-icons/bs";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const { Register, updateUser } = useContext(authProvider);
  const [error, setError] = useState("");
  const [accountType, setAccountType] = useState("Buyer");
  const navigate = useNavigate();
  const { baseUrl } = useContext(urlProvider);

  const handleForm = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const type = accountType;
    const user = {
      name,
      email,
      type,
    };
    setLoading(true);
    Register(email, password)
      .then((res) => {
        axios.post(`${baseUrl}/users`, user).then((res) => {
          if (res.data.acknowledged) {
            updateUser({
              displayName: name,
            }).then(() => {
              setError("");
              axios.get(`${baseUrl}/jwt?email=${email}`).then((res) => {
                localStorage.setItem("blackToken", res.data.token);
                setLoading(false);
              });
              toast.success("Registration successful!");
              navigate("/");
            });
          }
        });
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="p-2 bg-orange-500 text-white rounded-xl">
              <FaMobileAlt className="text-xl" />
            </div>
            <span className="text-2xl font-bold">
              Phone<span className="text-orange-500">Market</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-500">Join thousands of users buying and selling phones</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit(handleForm)} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiOutlineUser className="text-gray-400 text-xl" />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                  {...register("name")}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiOutlineMail className="text-gray-400 text-xl" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                  {...register("email")}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiOutlineLockClosed className="text-gray-400 text-xl" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                  {...register("password")}
                />
              </div>
            </div>

            {/* Account Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAccountType("Buyer")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    accountType === "Buyer"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <BsCart3
                    className={`text-2xl mx-auto mb-2 ${
                      accountType === "Buyer" ? "text-orange-500" : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`font-semibold ${
                      accountType === "Buyer" ? "text-orange-500" : "text-gray-600"
                    }`}
                  >
                    Buy Phones
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Find great deals</p>
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType("Seller")}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    accountType === "Seller"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <BsShop
                    className={`text-2xl mx-auto mb-2 ${
                      accountType === "Seller" ? "text-orange-500" : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`font-semibold ${
                      accountType === "Seller" ? "text-orange-500" : "text-gray-600"
                    }`}
                  >
                    Sell Phones
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Start earning</p>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Create Account <BsArrowRight />
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-8">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Register;
