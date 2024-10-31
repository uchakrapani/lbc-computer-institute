import React, { useState } from 'react';
import axios from 'axios';
import { API_URLS } from '../../constants/apiConstants'; // Adjust the path if needed

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user) {
      setError("User not found!");
      return;
    }

    try {
      const response = await axios.put(API_URLS.UPDATE_PASSWORD.replace(':id', user._id), { password: newPassword });
      setMessage("Password updated successfully!");
      // Do not navigate; just display the message
    } catch (err) {
      setError("Failed to update password. Please try again.");
      // Logout the user if there's an error
      sessionStorage.removeItem('user'); // Remove user data from session storage
      window.location.reload(); // Reload the application to log the user out
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update Your Password</h2>
      <p className="text-muted mb-4">
        Please enter your new password below. Ensure it matches the confirmation field.
      </p>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Password</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
