import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { urlProvider } from "../../contexts/UrlContext";
import { authProvider } from "../../contexts/UserContext";
import useUserState from "../../hooks/useUserState";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  FaMobileAlt,
  FaDollarSign,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaImage,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

const SellerDashboard = () => {
  const { user } = useContext(authProvider);
  const [categories, setCategories] = useState([]);
  const [verify, setVerify] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { baseUrl } = useContext(urlProvider);

  useEffect(() => {
    axios.get(`${baseUrl}/categories`).then((res) => {
      setCategories(res.data);
    });
    axios.get(`${baseUrl}/isVerify?email=${user.email}`).then((res) => {
      setVerify(res.data.isVerify);
    });
  }, [baseUrl, user.email]);

  const handleForm = (data) => {
    setIsSubmitting(true);
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
            name: data.name,
            img: imgData.data.url,
            resalePrice: data.resalePrice,
            originalPrice: data.originalPrice,
            used: data.used,
            location: data.location,
            sellerName: data.sellerName,
            number: data.number,
            condition: data.condition,
            description: data.description,
            purchaseYear: data.purchaseYear,
            category: data.category,
            date: format(new Date(), "PP"),
            email: user.email,
            userVerified: verify,
          };
          axios.post(`${baseUrl}/products`, productData).then((res) => {
            toast.success("Product added successfully!");
            reset();
            setIsSubmitting(false);
            navigate("/dashboard/myProducts");
          });
        } else {
          toast.error("Image upload failed");
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Product</h1>
        <p className="text-gray-500">Fill in the details to list your phone for sale</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
          {/* Seller Info Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-orange-500" />
              Seller Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none cursor-not-allowed"
                  {...register("sellerName")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="e.g., +1234567890"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                    {...register("number")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaMobileAlt className="text-orange-500" />
              Product Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., iPhone 13 Pro Max"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  {...register("name")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <select
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  {...register("category")}
                >
                  <option value="iPhone">iPhone</option>
                  {categories.map((category) => (
                    <option value={category.name} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  {...register("condition")}
                >
                  <option value="">Select condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Use *
                </label>
                <input
                  type="number"
                  placeholder="e.g., 1"
                  min="0"
                  step="0.5"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  {...register("used")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Year *
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="e.g., 2022"
                    min="2000"
                    max={new Date().getFullYear()}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                    {...register("purchaseYear")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="e.g., New York, USA"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                    {...register("location")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaDollarSign className="text-orange-500" />
              Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                    {...register("originalPrice")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resale Price *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                    {...register("resalePrice")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BsInfoCircle className="text-orange-500" />
              Additional Information
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                placeholder="Add any additional details about the phone..."
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                {...register("description")}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaImage className="text-orange-500" />
              Product Image
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image *
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:cursor-pointer hover:file:bg-orange-600"
                required
                {...register("photo")}
              />
              <p className="text-sm text-gray-500 mt-2">
                Accepted formats: JPG, PNG, JPEG (Max 5MB)
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Uploading...
                </>
              ) : (
                <>
                  <FaMobileAlt />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerDashboard;
