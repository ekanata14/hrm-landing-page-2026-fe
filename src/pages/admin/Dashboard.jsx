import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 font-medium mb-2">Total Activities</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">--</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 font-medium mb-2">
            Total Gallery Images
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">--</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-500 font-medium mb-2">
            Active Announcements
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">--</p>
        </div>
      </div>
      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Welcome to HRM Admin Panel!
        </h2>
        <p className="text-blue-700 dark:text-blue-200">
          Use the sidebar to manage your website content. You can add new
          activities, upload gallery images, and manage announcements.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
