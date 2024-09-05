import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/FormInput'; // Assuming FormInput is a reusable component
import axios from 'axios'; // Import axios
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

const RegisterForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('http://localhost:5000/api/users', {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Show success message
        toast.success('Registration successful! You can now log in.');

        // Clear the form fields
        resetForm();

        // Optionally, redirect to login page or other action
        // e.g., navigate('/login');
      } catch (error: any) {
        // Handle errors from API response
        if (error.response && error.response.data && error.response.data.message) {
          // Show error message from API response
          toast.error(`Registration failed: ${error.response.data.message}`);
        } else {
          // Show generic error message
          toast.error('Registration failed. Please try again.');
        }
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          id="fullName"
          name="fullName"
          type="text"
          label="Full Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : undefined}
        />

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

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : undefined}
        />

        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>

      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
