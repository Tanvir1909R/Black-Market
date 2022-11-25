import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { urlProvider } from "../../contexts/UrlContext";
import { authProvider } from "../../contexts/UserContext";
import useUserState from "../../hooks/useUserState";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const { user } = useContext(authProvider);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()
  const [userState] = useUserState(user?.email);
  const { register, handleSubmit, reset } = useForm();
  const { baseUrl } = useContext(urlProvider);
  useEffect(() => {
    axios.get(`${baseUrl}/categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleForm = (data) => {
    const image = data.photo[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`,
      {
        method: "POST",
        "content-type": "multipart/form-data",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const productData = {
            name:data.name,
            img:imgData.data.url,
            resalePrice:data.resalePrice,
            originalPrice:data.originalPrice,
            used:data.used,
            location:data.location,
            sellerName:data.sellerName,
            number:data.number,
            condition:data.condition,
            description:data.description,
            purchaseYear:data.purchaseYear,
            category:data.category,
            date: format(new Date(),"PP"),
            email:user.email
          }
          axios.post(`${baseUrl}/products`,productData)
          .then(res =>{
            toast.success('product add successfully')
            reset()
            navigate('/dashboard/myProducts')
          })
        }
      });
  };
  return (
    <div className="mb-10">
      <h1>Add Product:</h1>
      <div className="mt-20">
        <form
          className="w-[450px] p-10 border rounded-md"
          onSubmit={handleSubmit(handleForm)}
        >
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered w-full"
              required
              value={user?.displayName}
              readOnly
              {...register("sellerName")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Item Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              required
              {...register("name")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Resale Price</span>
            </label>
            <input
              type="number"
              placeholder="Resale Price"
              className="input input-bordered w-full"
              required
              {...register("resalePrice")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Original Price</span>
            </label>
            <input
              type="number"
              placeholder="Original Price"
              className="input input-bordered w-full"
              required
              {...register("originalPrice")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Years of use</span>
            </label>
            <input
              type="number"
              placeholder="used"
              className="input input-bordered w-full"
              required
              {...register("used")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Number</span>
            </label>
            <input
              type="number"
              placeholder="number"
              className="input input-bordered w-full"
              required
              {...register("number")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              placeholder="location"
              className="input input-bordered w-full"
              required
              {...register("location")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Condition</span>
            </label>
            <input
              type="text"
              placeholder="condition"
              className="input input-bordered w-full"
              required
              {...register("condition")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              placeholder="Description(optional)"
              className="input input-bordered w-full"
              {...register("description")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Purchase Year</span>
            </label>
            <input
              type="number"
              placeholder="purchaseYear"
              className="input input-bordered w-full"
              required
              {...register("purchaseYear")}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Brand</span>
            </label>
            <select
              className="select w-full select-bordered"
              {...register("category")}
            >
              <option defaultValue='iPhon'>iPhon</option>
              {categories.map((category) => (
                <option value={category.name} key={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              placeholder="condition"
              className="input input-bordered w-full"
              required
              {...register("photo")}
            />
          </div>
          <button type="submit" className="btn mt-5">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerDashboard;
