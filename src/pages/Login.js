import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { authProvider } from "../contexts/UserContext";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { Login } = useContext(authProvider)
  const [error, setError] = useState('')

  const handleForm = (data)=>{
    const email = data.email;
    const password = data.password;

    Login(email, password)
    .then(res =>{
      console.log(res.user);
      setError('')
      toast.success('login successful')
    })
    .catch(e => setError(e.message))
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
          <p className="my-2">New to black market? <Link to='/register' className="text-orange-500">Create account</Link></p>
          {error && <p className='text-rose-600 my-2'>{error}</p>}
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
