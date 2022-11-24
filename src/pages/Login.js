import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const handleForm = (data)=>{
    console.log(data);
  }
  return (
    <div className="Container mb-72">
        <h1 className="text-4xl text-center">Login ..</h1>
      <div className="flex justify-center items-center mt-20">
        <form className="w-[450px] p-10 border rounded-md" onSubmit={handleSubmit(handleForm)}>

          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text text-xl">Enter your email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
              {...register('email') }
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
              {...register('password') }
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
