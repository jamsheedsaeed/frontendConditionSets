import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const [selectedTab, setSelectedTab] = useState(location.pathname); // Initialize with the current path

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen flex flex-col shadow-lg">
      {/* Header Section */}
      <div className="p-6 text-2xl font-semibold border-b border-gray-700 flex items-center justify-center">
        <span className="text-blue-400">Rider</span>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto mt-4">
        <ul>
        <li>
            <Link
              to="/createconditionSets"
              onClick={() => setSelectedTab('/createconditionSets')}
              className={`block px-6 py-3 mx-3 my-2 text-lg font-medium rounded-lg transition-all 
                ${selectedTab === '/createconditionSets' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
              `}
            >
              Create Condition Sets
            </Link>
          </li>
          <li>
            <Link
              to="/conditionSets"
              onClick={() => setSelectedTab('/conditionSets')}
              className={`block px-6 py-3 mx-3 my-2 text-lg font-medium rounded-lg transition-all 
                ${selectedTab === '/conditionSets' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
              `}
            >
              View Condition Sets
            </Link>
          </li>
          <li>
            <Link
              to="/offers"
              onClick={() => setSelectedTab('/offers')}
              className={`block px-6 py-3 mx-3 my-2 text-lg font-medium rounded-lg transition-all 
                ${selectedTab === '/offers' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
              `}
            >
              View Incoming Offers
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button Section */}
      <div className="p-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 transition-all rounded-lg text-white text-lg font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
