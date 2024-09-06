import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import FormInput from '../../components/FormInput'; // Adjust the path as needed
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import axios from 'axios'; // Import axios



const LoginForm: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null); // State for error message
  const navigate = useNavigate(); // Use navigate for redirection
  const { login } = useAuth(); // Access the login function from context

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        // const response = await axios.post('http://localhost:5000/api/users/login', {
        //   email: values.email,
        //   password: values.password,
        // }, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // });

        // const { accessToken } = response.data;
        // // Save token to localStorage or context
        // localStorage.setItem('token', accessToken);
        // localStorage.setItem('userId', response.data.user.id);
        // login(accessToken);

        navigate('/conditionSets'); // Redirect to projects page or wherever you want
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // Handle error from API
          setLoginError(error.response.data.message || 'Login failed');
        } else {
          // Handle other errors
          setLoginError('An unexpected error occurred');
        }
        console.error('Login error:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormInput
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
      />

      <FormInput
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
      />

      {loginError && (
        <div className="mt-4 text-red-500 text-sm">
          {loginError}
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
        <Link to="/register" className="text-indigo-600 hover:text-indigo-900">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
