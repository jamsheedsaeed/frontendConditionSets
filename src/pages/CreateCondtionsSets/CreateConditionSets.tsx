import React, { useState } from 'react';

// Define the type for each condition in the list
type Condition = {
  name: string;
};

// Define the type for the condition set that will be created
type ConditionSet = {
  description: string;
  count: number;
  priority: number;
  enabled: boolean;
  action: string;
  conditions: Condition[];
};

const CreateConditionSets: React.FC = () => {
  // States to manage form inputs
  const [description, setDescription] = useState<string>('');
  const [count, setCount] = useState<number>(1);
  const [priority, setPriority] = useState<number>(1);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [action, setAction] = useState<string>('ACCEPT');
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Sample dropdown options
  const conditionOptions: string[] = [
    'Start Date',
    'Pickup',
    'Drop off',
    'Relative Start Time',
    'Booking Type',
    'Service Class',
    'Distance',
    'Day',
    'Start Time',
    'End Time',
  ];

  // Function to add a new condition to the list
  const addCondition = (conditionName: string) => {
    const newCondition: Condition = { name: conditionName };
    setConditions([...conditions, newCondition]);
    setIsDropdownOpen(false); // Close the dropdown after adding a condition
  };

  // Form submission handler
  const handleCreate = () => {
    const newConditionSet: ConditionSet = {
      description,
      count,
      priority,
      enabled,
      action,
      conditions,
    };

    console.log(newConditionSet);
    // Handle form submission logic here (e.g., API call)
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <div className="flex items-center mb-4">
        <label className="mr-2 font-medium">Enabled</label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className="toggle-checkbox"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter description"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-2 font-medium">Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Priority</label>
          <input
            type="number"
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Action</label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="ACCEPT">ACCEPT</option>
            <option value="REJECT">REJECT</option>
          </select>
        </div>
      </div>

      <div className="mb-4 relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Add Condition
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute left-0 mt-2 w-full bg-white shadow-md rounded-md z-10">
            {conditionOptions.map((option, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => addCondition(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Condition Set
      </button>
    </div>
  );
};

export default CreateConditionSets;
