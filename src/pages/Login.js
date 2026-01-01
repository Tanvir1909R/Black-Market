import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authProvider } from "../contexts/UserContext";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { urlProvider } from "../contexts/UrlContext";
import { FaMobileAlt } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { Login, ProviderLogin } = useContext(authProvider);
  const googleProvider = new GoogleAuthProvider();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { baseUrl } = useContext(urlProvider);

  const handleForm = (data) => {
    const email = data.email;
    const password = data.password;
    setIsLoading(true);

    Login(email, password)
      .then((res) => {
        setError("");
        toast.success("Login successful!");
        axios.get(`${baseUrl}/jwt?email=${email}`).then((res) => {
          localStorage.setItem("blackToken", res.data.token);
        });
        navigate(from, { replace: true });
      })
      .catch((e) => {
        setError(e.message);
        setIsLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    ProviderLogin(googleProvider).then((res) => {
      const email = res.user.email;
      axios
        .post(`${baseUrl}/users`, {
          name: res.user.displayName,
          email: res.user.email,
          type: "Buyer",
        })
        .then((res) => {
          axios.get(`${baseUrl}/jwt?email=${email}`).then((res) => {
            localStorage.setItem("blackToken", res.data.token);
          });
        });
    });
  };

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-500">Sign in to continue buying and selling phones</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit(handleForm)} className="space-y-5">
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

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  Sign In <BsArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300"
          >
            <FcGoogle className="text-2xl" />
            <span className="font-medium text-gray-700">Sign in with Google</span>
          </button>

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-600">
            New to PhoneMarket?{" "}
            <Link
              to="/register"
              className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
