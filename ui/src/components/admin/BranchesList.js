import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button, Pagination } from "react-bootstrap"; // Added Pagination import
import { API_URLS } from "../../constants/apiConstants";

const BranchesList = () => {
  const [branches, setBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 10; // Number of branches per page

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(`${API_URLS.BRANCHES}`);
        setBranches(response.data);
        setFilteredBranches(response.data);
      } catch (error) {
        console.error("Error fetching branch list:", error);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    const results = branches.filter((branch) =>
      branch.branch_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBranches(results);
  }, [searchTerm, branches]);

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await axios.delete(`${API_URLS.BRANCHES}/${deleteId}`);
        setBranches(branches.filter((branch) => branch._id !== deleteId));
        setFilteredBranches(
          filteredBranches.filter((branch) => branch._id !== deleteId)
        );
        setSuccessMessage("Branch deleted successfully.");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error deleting branch:", error);
      } finally {
        closeDeleteModal();
      }
    }
  };

  // Pagination calculations
  const indexOfLastBranch = currentPage * adminsPerPage;
  const indexOfFirstBranch = indexOfLastBranch - adminsPerPage;
  const currentBranches = filteredBranches.slice(indexOfFirstBranch, indexOfLastBranch);
  const totalPages = Math.ceil(filteredBranches.length / adminsPerPage);

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Branch List</h2>
        <div
          style={{
            flexGrow: 1,
            height: "2px",
            backgroundColor: "#d1d1d1",
            marginLeft: "10px",
            marginRight: '10px',
          }}
        ></div>

        <Link to="/admin/branches-create" className="btn btn-primary">
          Create New
        </Link>
      </div>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div className="mb-3">
        <input
          type="text"
          className="form-control w-100 w-md-50"
          placeholder="Search by branch name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Branch Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Banner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBranches.length > 0 ? (
              currentBranches.map((branch, index) => (
                <tr key={branch._id}>
                  <td>{index + 1 + (currentPage - 1) * adminsPerPage}</td>
                  <td>{branch.branch_name}</td>
                  <td>{branch.address}</td>
                  <td>{branch.phone}</td>
                  <td>{branch.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        branch.status === "active" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {branch.status}
                    </span>
                  </td>
                  <td>
                    {branch.banner_url ? (
                      <img
                        src={branch.banner_url}
                        alt="Branch Banner"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <Link
                        to={`/admin/branches-edit/${branch._id}`}
                        className="btn btn-sm btn-warning me-2"
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </Link>
                      <button
                        onClick={() => openDeleteModal(branch._id)}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No branches found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <Pagination className="justify-content-center mt-3">
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={closeDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this branch? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BranchesList;
