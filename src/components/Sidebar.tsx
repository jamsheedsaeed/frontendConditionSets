import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path as needed

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-4 text-xl font-semibold border-b border-gray-700">
        
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          <li>
            <Link to="/conditionSets" className="block px-4 py-2 hover:bg-gray-700">
              View Condition Sets
            </Link>
          </li>
          <li>
            <Link to="/createconditionSets" className="block px-4 py-2 hover:bg-gray-700">
              Create Condition Sets
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
