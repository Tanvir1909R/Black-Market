import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { authProvider } from "../contexts/UserContext";
import { urlProvider } from "../contexts/UrlContext";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { Register, updateUser } = useContext(authProvider);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { baseUrl } = useContext(urlProvider);

  const handleForm = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const type = data.type;
    const user = {
      name,
      email,
      password,
      type,
    };
    Register(email, password)
      .then((res) => {
        axios.post(`${baseUrl}/users`,user)
        .then(res =>{
          if(res.data.acknowledged){
            updateUser({
              displayName: name
            })
            .then(()=>{
              setError("");
              toast.success("register successful");
              navigate("/");
            })

          }
        })
      })
      .catch((e) => setError(e.message));
  };

  return (
    <div className="Container mb-72">
      <h1 className="text-4xl text-center">Please Register</h1>
      <div className="flex justify-center items-center mt-20">
        <form
          className="w-[450px] p-10 border rounded-md"
          onSubmit={handleSubmit(handleForm)}
        >
          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text text-xl">Enter your name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              required
              {...register("name")}
            />
          </div>
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
          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text text-xl">
                Select your account type
              </span>
            </label>
            <select
              className="select w-full select-bordered"
              {...register("type")}
            >
              <option>Buyer</option>
              <option>Seller</option>
            </select>
          </div>

          <p className="my-2">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500">
              Login
            </Link>
          </p>
          {error && <p className="text-rose-600 my-2">{error}</p>}
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
