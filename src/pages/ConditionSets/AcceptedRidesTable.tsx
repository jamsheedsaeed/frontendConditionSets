// src/components/AcceptedRidesTable.js
import React, { useEffect, useState } from 'react';

const AcceptedRidesTable = () => {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState(''); // State to track the search query

  // Function to fetch accepted rides from the backend using fetch
  const fetchRides = async (currentPage: number) => {
    try {
      const response = await fetch(`http://localhost:5000/accepted_rides?page=${currentPage}&per_page=${perPage}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch rides: ${response.statusText}`);
      }

      const data = await response.json();
      setRides(data.rides);
      setTotalPages(data.total_pages);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch accepted rides.');
    }
  };

  // Fetch rides when the component is mounted or when the page changes
  useEffect(() => {
    fetchRides(page);
  }, [page]);

  // Function to handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Filtered rides based on search query
  const filteredRides = rides.filter((ride: any) => 
    ride.service_class.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.pickup_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.dropoff_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Rides</h2>

      {error && (
        <div className="text-red-500 mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by service class, address, or status..."
          className="w-full px-4 py-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Service Class</th>
            <th className="py-2 px-4 border-b text-left">Pickup Address</th>
            <th className="py-2 px-4 border-b text-left">Dropoff Address</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRides.length > 0 ? (
            filteredRides.map((ride: any, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{ride.service_class}</td>
                <td className="py-2 px-4 border-b">{ride.pickup_address}</td>
                <td className="py-2 px-4 border-b">{ride.dropoff_address}</td>
                <td className="py-2 px-4 border-b">{ride.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No accepted rides available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AcceptedRidesTable;
