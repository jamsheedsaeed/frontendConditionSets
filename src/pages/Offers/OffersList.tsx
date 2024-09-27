import React, { useEffect, useState } from 'react';

// Define the shape of your JSON data using TypeScript interfaces
interface Address {
  DE: string;
  EN: string;
}

interface Offer {
  dropoff_address: Address;
  pickup_address: Address;
  service_class: string;
}

const OffersList: React.FC = () => {
  // State to store the fetched offers
  const [offers, setOffers] = useState<Offer[]>([]);
  const [language, setLanguage] = useState<'DE' | 'EN'>('EN'); // State to manage the display language
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error

  // Function to fetch offers data from the API
  const fetchOffers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get-offers');
      if (!response.ok) {
        throw new Error('Failed to fetch offers');
      }
      const data: Offer[] = await response.json();
      setOffers(data);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the offers when the component mounts
  useEffect(() => {
    fetchOffers();
  }, []);

  // If loading, show a loading indicator
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // If there's an error, display the error message
  if (error) {
    return <div className="text-red-500 text-center my-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Offers List</h1>

      {/* Offers table */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm text-left">Service Class</th>
              <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm text-left">Pickup Address</th>
              <th className="w-1/3 py-3 px-4 uppercase font-semibold text-sm text-left">Dropoff Address</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {offers.map((offer, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200 transition-colors duration-150`}
              >
                <td className="border-t py-3 px-4 text-left">{offer.service_class}</td>
                <td className="border-t py-3 px-4 text-left">{offer.pickup_address[language]}</td>
                <td className="border-t py-3 px-4 text-left">{offer.dropoff_address[language]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OffersList;
