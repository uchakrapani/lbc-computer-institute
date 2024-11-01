import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead
import { API_URLS } from "../../constants/apiConstants";

const AppInfoCreate = () => {
  const [appInfo, setAppInfo] = useState({
    app_name: "",
    logo: "",
    description: "",
    favicon: "",
    social_network: [
      { facebook: "", url: "" },
      { whatsapp: "", url: "" },
      { twitter: "", url: "" },
      { instagram: "", url: "" },
      { youtube: "", url: "" },
    ],
    status: "active", // Default status
    admin_id: "", // Admin ID will be set from session storage
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setAppInfo((prev) => ({ ...prev, admin_id: user._id }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("social_network")) {
      const index = parseInt(name.split("[")[1].split("]")[0]);
      const field = name.split(".")[1];
      const newSocialNetwork = [...appInfo.social_network];
      newSocialNetwork[index][field] = value;
      setAppInfo({ ...appInfo, social_network: newSocialNetwork });
    } else {
      setAppInfo({ ...appInfo, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URLS.APP_INFO_LIST}`, appInfo);
      setMessage("AppInfo created successfully!");
      setError("");
      setTimeout(() => {
        navigate("/admin/appinfo"); // Use navigate for redirection
      }, 2000);
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "Error creating AppInfo"
      );
      setMessage("");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create AppInfo</h2>
      <p className="text-muted">
        Fill in the details to create a new AppInfo record.
      </p>
      <hr /> {/* Divider */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">App Name</label>
            <input
              type="text"
              name="app_name"
              className="form-control"
              value={appInfo.app_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Logo URL</label>
            <input
              type="url"
              name="logo"
              className="form-control"
              value={appInfo.logo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={appInfo.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Favicon URL</label>
            <input
              type="url"
              name="favicon"
              className="form-control"
              value={appInfo.favicon}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Admin ID</label>
            <input
              type="text"
              name="admin_id"
              className="form-control"
              value={appInfo.admin_id} // Admin ID set from session storage
              readOnly // Make it read-only
            />
          </div>
        </div>

        <h5>Social Networks</h5>
        {appInfo.social_network.map((social, index) => (
          <div key={index} className="mb-3">
            <div className="row">
              <div className="col">
                <label className="form-label">Platform</label>
                <input
                  type="text"
                  name={`social_network[${index}].platform`}
                  className="form-control"
                  value={social.platform}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label">URL</label>
                <input
                  type="url"
                  name={`social_network[${index}].url`}
                  className="form-control"
                  value={social.url}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div className="col-12 d-flex justify-content-between mt-3">
          <button type="submit" className="btn btn-primary btn-sm">
            Create AppInfo
          </button>
          <a href="/admin/appinfo" className="btn btn-secondary btn-sm">
            Back to AppInfo List
          </a>
        </div>
      </form>
    </div>
  );
};

export default AppInfoCreate;
