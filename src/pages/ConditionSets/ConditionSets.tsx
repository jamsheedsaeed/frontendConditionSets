import React from 'react';

const ConditionSets = () => {
  // Sample data, you can replace this with your dynamic data
  const conditionSets = [
    { priority: 1000, description: 'Stop accepting all offers', count: 1, action: 'REJECT', enabled: false },
    { priority: 998, description: 'Bad Dropoff', count: 1, action: 'REJECT', enabled: true },
    { priority: 998, description: 'Bad Pickup', count: 1, action: 'REJECT', enabled: true },
    { priority: 998, description: 'Reject EK 209', count: 1, action: 'REJECT', enabled: true },
    { priority: 998, description: 'Reject Friday 11-3:30pm', count: 1, action: 'REJECT', enabled: true },
    { priority: 998, description: 'Reject more than 200km', count: 1, action: 'REJECT', enabled: true },
    { priority: 899, description: 'Reject nj to jfk/lga upto 45km', count: 1, action: 'REJECT', enabled: true },
    { priority: 899, description: 'Reject sedan more than 125 kilometers', count: 1, action: 'REJECT', enabled: true },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Condition Sets</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create ConditionSet
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border-b text-left">Priority</th>
            <th className="py-2 px-4 border-b text-left">Description</th>
            <th className="py-2 px-4 border-b text-left">Count</th>
            <th className="py-2 px-4 border-b text-left">Action</th>
            <th className="py-2 px-4 border-b text-left">Enabled</th>
          </tr>
        </thead>
        <tbody>
          {conditionSets.map((condition, index) => (
            <tr
              key={index}
              className={`${condition.enabled ? 'bg-red-100' : 'bg-gray-100'}`}
            >
              <td className="py-2 px-4 border-b">{condition.priority}</td>
              <td className="py-2 px-4 border-b">{condition.description}</td>
              <td className="py-2 px-4 border-b">{condition.count}</td>
              <td className="py-2 px-4 border-b">{condition.action}</td>
              <td className="py-2 px-4 border-b">
                {condition.enabled ? 'true' : 'false'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConditionSets;
