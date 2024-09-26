import React, { useEffect, useState } from 'react';

// Modal Component
const Modal: React.FC<{ show: boolean, onClose: () => void, children: React.ReactNode }> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

interface Condition {
  id: number;
  service_class: string;
  pickup_address: string;
  dropoff_address: string;
  status: string | null;
  count: number;
  matched_offer_ids: string[];
}

interface ApiResponse {
  allconditions: Condition[];
  total_pages: number;
  total_records: number;
  page: number;
  per_page: number;
}

const AcceptedRidesTable: React.FC = () => {
  const [allConditions, setAllConditions] = useState<Condition[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editCondition, setEditCondition] = useState<Condition | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null); // Store the ID of the item being deleted
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false); // State for table loading

  const fetchRides = async (currentPage: number) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/accepted_rides?page=${currentPage}&per_page=${perPage}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch rides: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      setAllConditions(data.allconditions || []);
      setTotalPages(data.total_pages);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch accepted rides.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle deleting a ride
  const handleDelete = async (id: number) => {
    if (deletingId !== null) return; // Prevent double-clicks
    setDeletingId(id); // Set the ID of the item being deleted
    setIsTableLoading(true); // Show a loading state for the table

    try {
        // Make the DELETE API call
        const response = await fetch(`http://localhost:5000/conditions/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
            // If the response is not OK, throw an error
            throw new Error(data.error || 'Failed to delete condition.');
        }

        // Only update the state if the deletion was successful
        setAllConditions((prevConditions) =>
            prevConditions.filter((condition) => condition.id !== id)
        );

        // Optionally, log or display the deleted condition information
        console.log("Deleted condition:", data.deleted_condition);

    } catch (err: any) {
        // Show an error message if the deletion fails
        setError(err.message || 'Failed to delete condition.');
    } finally {
        // Reset the deleting ID and loading state regardless of the outcome
        setDeletingId(null);
        setIsTableLoading(false);
    }
};



  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editCondition) {
      try {
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `http://localhost:5000/conditions/${editCondition.id}` : 'http://localhost:5000/conditions';
        
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_class: editCondition.service_class,
            pickup_address: editCondition.pickup_address,
            dropoff_address: editCondition.dropoff_address,
            status: editCondition.status,
            count: editCondition.count,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to ${isEditing ? 'edit' : 'add'} condition: ${response.statusText}`);
        }

        const updatedCondition = await response.json();

        if (isEditing) {
          setAllConditions((prevConditions) =>
            prevConditions.map((condition) =>
              condition.id === editCondition.id ? updatedCondition : condition
            )
          );
        } else {
          setAllConditions((prevConditions) => [...prevConditions, updatedCondition]);
        }

        setIsEditing(false);
        setEditCondition(null);
        setIsModalOpen(false);
      } catch (err: any) {
        setError(err.message || `Failed to ${isEditing ? 'edit' : 'add'} condition.`);
      }
    }
  };

  const handleEditClick = (condition: Condition) => {
    setEditCondition(condition);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchRides(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleAddNewCondition = () => {
    setEditCondition({
      id: 0,
      service_class: '',
      pickup_address: '',
      dropoff_address: '',
      status: '',
      count: 0,
      matched_offer_ids: [],
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const filteredConditions = allConditions.filter((condition) =>
    condition.service_class?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    condition.pickup_address?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    condition.dropoff_address?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Rides</h2>

      {error && (
        <div className="text-red-500 mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by service class, address, or status..."
          className="w-full px-4 py-2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block border-4 border-blue-500 border-dotted rounded-full w-12 h-12 animate-spin"></div>
          <p>Loading rides...</p>
        </div>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-200 mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Service Class</th>
                <th className="py-2 px-4 border-b">Pickup Address</th>
                <th className="py-2 px-4 border-b">Dropoff Address</th>
                <th className="py-2 px-4 border-b">Matched Offer IDs</th>
                <th className="py-2 px-4 border-b">Count</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredConditions.length > 0 ? (
                filteredConditions.map((condition) => (
                  <tr key={condition.id} className={isTableLoading && deletingId === condition.id ? 'opacity-50' : ''}>
                    <td className="py-2 px-4 border-b">{condition.service_class}</td>
                    <td className="py-2 px-4 border-b">{condition.pickup_address}</td>
                    <td className="py-2 px-4 border-b">{condition.dropoff_address}</td>
                    <td className="py-2 px-4 border-b">{condition.matched_offer_ids.join(', ')}</td>
                    <td className="py-2 px-4 border-b">{condition.count}</td>
                    <td className="py-2 px-4 border-b">{condition.status}</td>
                    <td className="py-2 px-4 border-b flex space-x-2">
                      {deletingId === condition.id ? (
                        <div className="flex items-center">
                          <div className="animate-spin border-2 border-blue-500 rounded-full w-4 h-4 mr-2"></div>
                          Deleting...
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(condition)}
                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(condition.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            disabled={isTableLoading} // Disable all buttons if table is loading
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-2 px-4 text-center">No conditions found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || isTableLoading} // Disable button if at first page or table is loading
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || isTableLoading} // Disable button if at last page or table is loading
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal for Adding/Editing Conditions */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Condition' : 'Add New Condition'}</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Service Class</label>
            <input
              type="text"
              value={editCondition?.service_class || ''}
              onChange={(e) => setEditCondition({ ...editCondition!, service_class: e.target.value })}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Pickup Address</label>
            <input
              type="text"
              value={editCondition?.pickup_address || ''}
              onChange={(e) => setEditCondition({ ...editCondition!, pickup_address: e.target.value })}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Dropoff Address</label>
            <input
              type="text"
              value={editCondition?.dropoff_address || ''}
              onChange={(e) => setEditCondition({ ...editCondition!, dropoff_address: e.target.value })}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <input
              type="text"
              value={editCondition?.status || ''}
              onChange={(e) => setEditCondition({ ...editCondition!, status: e.target.value })}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Count</label>
            <input
              type="number"
              value={editCondition?.count || 0}
              onChange={(e) => setEditCondition({ ...editCondition!, count: parseInt(e.target.value) })}
              className="w-full border px-2 py-1 rounded"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            {isEditing ? 'Update Condition' : 'Add Condition'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AcceptedRidesTable;
