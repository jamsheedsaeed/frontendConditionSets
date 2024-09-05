import React from 'react';
import LoginForm from './LoginForm'; // Example of importing a component

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
