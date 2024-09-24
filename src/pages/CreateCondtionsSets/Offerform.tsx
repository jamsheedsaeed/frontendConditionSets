import React, { useState } from "react";

const OfferForm = () => {
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [serviceClass, setServiceClass] = useState("business");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission

    // Create request payload based on form values
    const payload = {
      pickup_address: pickupAddress,
      dropoff_address: dropoffAddress,
      service_class: serviceClass,
    };

    // Send the form data to Flask API
    const response = await fetch("http://localhost:5000/accept_offer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Send form data as JSON
    });

    const result = await response.json(); // Get API response
    setResponseMessage(result.message); // Set response message from API
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Submit Offer for Acceptance</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Pickup Location (EN):</label>
          <input
            type="text"
            value={pickupAddress}
            onChange={(e) => setPickupAddress(e.target.value)} // Update pickup address
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter pickup location"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Dropoff Location (EN):</label>
          <input
            type="text"
            value={dropoffAddress}
            onChange={(e) => setDropoffAddress(e.target.value)} // Update dropoff address
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter dropoff location"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Service Class:</label>
          <select
            value={serviceClass}
            onChange={(e) => setServiceClass(e.target.value)} // Update service class
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="business">Business</option>
            <option value="economy">Economy</option>
            <option value="first_class">First Class</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit Offer
        </button>
      </form>

      {responseMessage && (
        <p className="mt-4 text-center text-green-600 font-semibold">{responseMessage}</p>
      )}
    </div>
  );
};

export default OfferForm;
