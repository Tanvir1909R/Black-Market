import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import { urlProvider } from "../contexts/UrlContext";
import { authProvider } from "../contexts/UserContext";
import { BsFillCheckCircleFill, BsSearch } from "react-icons/bs";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { MdReport } from "react-icons/md";
import BookingModal from "../Components/BookingModal";
import ReportModal from "../Components/ReportModal";
import useUserState from "../hooks/useUserState";

const Products = () => {
  const { user } = useContext(authProvider);
  const { baseUrl } = useContext(urlProvider);
  const [userState] = useUserState(user?.email);
  const [reportedProduct, setReportedProduct] = useState(null);
  const [itemBook, setItemBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/products`);
      const data = res.json();
      return data;
    },
  });

  const handleBooking = (item) => {
    setItemBook(item);
  };

  const handleReport = (item) => {
    setReportedProduct(item);
  };

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="Container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">All Phones</h1>
          <p className="text-gray-500 text-lg">
            Browse our collection of {products.length} phones
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <BsSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search phones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No phones found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                  {userState?.isBuyer && (
                    <label
                      htmlFor="report-modal"
                      onClick={() => handleReport(item)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full cursor-pointer hover:bg-red-50 transition-colors"
                    >
                      <MdReport className="text-red-500 text-xl" title="Report" />
                    </label>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <span>Seller: {item.sellerName}</span>
                    {item.userVerified && (
                      <BsFillCheckCircleFill className="text-blue-500" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-orange-500" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-orange-500" />
                      {item.used} years used
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-orange-500">
                        ৳{item.resalePrice}
                      </p>
                      <p className="text-sm text-gray-400 line-through">
                        ৳{item.originalPrice}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Posted</p>
                      <p className="text-sm text-gray-600">{item.date}</p>
                    </div>
                  </div>

                  {userState?.isBuyer ? (
                    <label
                      htmlFor="Booking-modal"
                      className="w-full btn bg-orange-500 hover:bg-orange-600 text-white border-none"
                      onClick={() => handleBooking(item)}
                    >
                      Book Now
                    </label>
                  ) : (
                    <Link
                      to="/login"
                      className="w-full btn bg-orange-500 hover:bg-orange-600 text-white border-none"
                    >
                      Login to Book
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modals */}
        {itemBook && (
          <BookingModal
            itemBook={itemBook}
            setItemBook={setItemBook}
            baseUrl={baseUrl}
          />
        )}
        {reportedProduct && (
          <ReportModal
            reportedProduct={reportedProduct}
            setReportedProduct={setReportedProduct}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
