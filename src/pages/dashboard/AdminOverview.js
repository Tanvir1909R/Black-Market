import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { urlProvider } from '../../contexts/UrlContext';
import { FaUsers, FaStore, FaExclamationTriangle, FaCheckCircle, FaBoxOpen, FaClock } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const AdminOverview = () => {
  const { baseUrl } = useContext(urlProvider);

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/adminStats`);
      const data = await res.json();
      return data;
    },
  });

  const statsCards = [
    {
      title: 'Total Buyers',
      value: stats.totalBuyers || 0,
      icon: FaUsers,
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Total Sellers',
      value: stats.totalSellers || 0,
      icon: FaStore,
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts || 0,
      icon: FaBoxOpen,
      color: 'from-indigo-500 to-indigo-600',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Completed Deals',
      value: stats.completedDeals || 0,
      icon: FaCheckCircle,
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments || 0,
      icon: FaClock,
      color: 'from-orange-500 to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Reported Items',
      value: stats.totalReportedItems || 0,
      icon: FaExclamationTriangle,
      color: 'from-red-500 to-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <MdDashboard className="text-orange-500" />
          Admin Overview
        </h1>
        <p className="text-gray-500">
          Monitor your platform's performance and statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-r ${stat.color} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <p className="text-sm opacity-90 mb-1">{stat.title}</p>
                    <p className="text-4xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.iconBg} p-4 rounded-full`}>
                    <Icon className={`text-3xl ${stat.iconColor}`} />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last updated</span>
                  <span className="text-gray-500">Just now</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaUsers className="text-blue-500" />
            User Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">
                  {(stats.totalBuyers || 0) + (stats.totalSellers || 0)}
                </p>
              </div>
              <FaUsers className="text-4xl text-blue-500 opacity-20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Buyers</p>
                <p className="text-xl font-bold text-blue-600">{stats.totalBuyers || 0}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Sellers</p>
                <p className="text-xl font-bold text-purple-600">{stats.totalSellers || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            Transaction Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.completedDeals && stats.totalProducts
                    ? Math.round((stats.completedDeals / stats.totalProducts) * 100)
                    : 0}
                  %
                </p>
              </div>
              <FaCheckCircle className="text-4xl text-green-500 opacity-20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Completed</p>
                <p className="text-xl font-bold text-green-600">{stats.completedDeals || 0}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Pending</p>
                <p className="text-xl font-bold text-orange-600">{stats.pendingPayments || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Section */}
      {stats.totalReportedItems > 0 && (
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-red-500 text-2xl mt-1" />
            <div>
              <h4 className="font-semibold text-red-900 mb-1">Attention Required</h4>
              <p className="text-red-800">
                You have <strong>{stats.totalReportedItems}</strong> reported item(s) that need review.
                Please check the Reported Items section.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOverview;
