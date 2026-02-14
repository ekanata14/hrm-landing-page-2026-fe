import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getActivities, deleteActivity } from "../../../services/api";
import { Edit, Trash2, Plus, Search } from "lucide-react";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      console.error("Failed to fetch activities", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await deleteActivity(id);
        fetchActivities();
      } catch (error) {
        console.error("Failed to delete activity", error);
        alert("Failed to delete activity");
      }
    }
  };

  const filteredActivities = activities.filter((activity) =>
    activity.title.en.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Activities
        </h1>
        <Link
          to="/admin/activities/new"
          className="flex items-center gap-2 px-4 py-2 bg-brand-gold hover:bg-brand-gold-dark text-black font-medium rounded-lg transition-colors"
        >
          <Plus size={20} />
          <span>Add Activity</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-500 font-medium text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredActivities.map((activity) => (
              <tr
                key={activity.id}
                className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        import.meta.env.VITE_API_URL.replace("/api", "") +
                        activity.image
                      }
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover bg-gray-200"
                    />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {activity.title.en}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {activity.date}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {activity.location}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/activities/edit/${activity.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(activity.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredActivities.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No activities found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityList;
