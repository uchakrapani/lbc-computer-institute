import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../../constants/apiConstants';
import { Card } from 'react-bootstrap';

const BranchCreate = () => {
  const [branch, setBranch] = useState({
    branch_name: '',
    address: '',
    phone: '',
    email: '',
    status: 'active',
    admin_id: '',
    banner: null,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setBranch((prev) => ({ ...prev, admin_id: user._id }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranch({ ...branch, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBranch({ ...branch, banner: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setMessage(''); // Reset success message

    const formData = new FormData();
    for (const key in branch) {
      formData.append(key, branch[key]);
    }

    try {
      await axios.post(API_URLS.BRANCHES, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Branch created successfully!');
      setTimeout(() => {
        navigate('/admin/branches-list'); // Redirect after displaying success message
      }, 2000); // Redirect after 2 seconds to allow user to see the message
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error creating Branch');
    }
  };

  return (
    <div className="container">
      <Card className="mb-4">
        <Card.Body>
          <h2 className="mb-4">Create Branch</h2>
          <p className="mb-4 text-muted">
            Fill in the details to create a new branch.
          </p>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="row g-4">
            <div className="col-md-6">
              <label htmlFor="branch_name" className="form-label">Branch Name</label>
              <input
                type="text"
                className="form-control"
                id="branch_name"
                name="branch_name"
                value={branch.branch_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="phone" className="form-label">Contact Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={branch.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                value={branch.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={branch.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="admin_id" className="form-label">Admin ID</label>
              <input
                type="text"
                className="form-control"
                id="admin_id"
                name="admin_id"
                value={branch.admin_id}
                readOnly
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="banner" className="form-label">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                id="banner"
                onChange={handleFileChange}
              />
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Banner Preview"
                    style={{ width: "100%", maxHeight: "150px", objectFit: "contain" }}
                  />
                </div>
              )}
            </div>
            <div className="col-12 d-flex justify-content-between mt-3">
              <button type="submit" className="btn btn-primary btn-sm">Create Branch</button>
              <a href="/admin/branches-list" className="btn btn-secondary btn-sm">Back to Branch List</a>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BranchCreate;
