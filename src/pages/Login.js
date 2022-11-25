import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authProvider } from "../contexts/UserContext";
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { urlProvider } from "../contexts/UrlContext";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { Login, ProviderLogin } = useContext(authProvider);
  const googleProvider = new GoogleAuthProvider()
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {baseUrl} = useContext(urlProvider)

  const handleForm = (data) => {
    const email = data.email;
    const password = data.password;

    Login(email, password)
      .then((res) => {
        setError("");
        toast.success("login successful");
        navigate(from, { replace: true });
      })
      .catch((e) => setError(e.message));
  };

  const handleGoogleLogin = ()=>{
    ProviderLogin(googleProvider)
    .then(res =>{
      axios.post(`${baseUrl}/users`,{
        name:res.user.displayName,
        email:res.user.email,
        type:"Buyer"
      })
      .then(res =>{})
    })
  }

  return (
    <div className="Container mb-72">
      <h1 className="text-4xl text-center">Login ..</h1>
      <div className="flex justify-center items-center mt-20">
        <form
          className="w-[450px] p-10 border rounded-md"
          onSubmit={handleSubmit(handleForm)}
        >
          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text text-xl">Enter your email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
              {...register("email")}
            />
          </div>
          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text text-xl">Enter your password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
              {...register("password")}
            />
          </div>
          <p className="my-2">
            New to black market?{" "}
            <Link to="/register" className="text-orange-500">
              Create account
            </Link>
          </p>
          {error && <p className="text-rose-600 my-2">{error}</p>}
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
      <div className="inline-flex justify-center items-center w-full">
        <hr className="my-8 w-64 h-px bg-gray-700 border-0 dark:bg-gray-700" />
        <span className="absolute left-1/2 px-3 font-medium text-gray-900 bg-white -translate-x-1/2 dark:text-white dark:bg-gray-900">
          or
        </span>
      </div>
      <div className="flex justify-center cursor-pointer" onClick={handleGoogleLogin}>
        <div className="flex justify-center items-center text-xl border rounded-lg px-5 py-3">
        <p className="inline">Google Login </p>
        <FcGoogle className="ml-4" />
        </div>
      </div>
    </div>
  );
};

export default Login;
