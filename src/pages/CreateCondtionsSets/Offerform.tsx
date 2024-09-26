import React, { useState } from "react";

const OfferForm = () => {
  // State variables for form inputs
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [serviceClass, setServiceClass] = useState("business");
  const [count, setCount] = useState(1); // New state for count

  // State variables for handling API responses and loading
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Set loading state to true before making the API call

    // Create request payload based on form values
    const payload = {
      pickup_address: pickupAddress,
      dropoff_address: dropoffAddress,
      service_class: serviceClass,
      count: count // Include count in the payload
    };

    try {
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
    } catch (error) {
      setResponseMessage("Error: Failed to submit offer.");
    } finally {
      setIsLoading(false); // Set loading state back to false after the API call is complete
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Submit Offer for Acceptance</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Pickup Address Input */}
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
        
        {/* Dropoff Address Input */}
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
        
        {/* Service Class Dropdown */}
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

        {/* Count Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Count:</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            placeholder="Enter count"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-3 rounded-md transition duration-300 ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Processing..." : "Create Condition"}
        </button>
      </form>

      {/* Display response message */}
      {responseMessage && (
        <p className={`mt-4 text-center font-semibold ${responseMessage.includes("Error") ? "text-red-600" : "text-green-600"}`}>
          {responseMessage}
        </p>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
        </div>
      )}
    </div>
  );
};

export default OfferForm;
