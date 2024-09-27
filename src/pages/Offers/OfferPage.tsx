import React from 'react';
import OffersList from './OffersList';

const OffersPage: React.FC = () => {
  return (
      <div className=" bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Incomming Rides</h2>
        <OffersList />
    </div>
  );
};

export default OffersPage;
