import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button, Pagination } from "react-bootstrap";
import { API_URLS } from "../../constants/apiConstants";

const BannersList = () => {
  const [banners, setBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const bannersPerPage = 5; // Number of banners per page

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${API_URLS.BANNERS}`);
        setBanners(response.data);
        setFilteredBanners(response.data);
      } catch (error) {
        console.error("Error fetching banner list:", error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const results = banners.filter((banner) =>
      banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBanners(results);
    setCurrentPage(1); // Reset to the first page on new search
  }, [searchTerm, banners]);

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
        await axios.delete(`${API_URLS.BANNERS}/${deleteId}`);
        setBanners(banners.filter((banner) => banner._id !== deleteId));
        setFilteredBanners(
          filteredBanners.filter((banner) => banner._id !== deleteId)
        );
        setSuccessMessage("Banner deleted successfully.");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error deleting banner:", error);
      } finally {
        closeDeleteModal();
      }
    }
  };

  // Pagination calculations
  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = filteredBanners.slice(
    indexOfFirstBanner,
    indexOfLastBanner
  );
  const totalPages = Math.ceil(filteredBanners.length / bannersPerPage);

  return (
    <div className="container">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h2>Banner List</h2>

        <div
          style={{
            flexGrow: 1,
            height: "2px",
            backgroundColor: "#d1d1d1",
            marginLeft: "10px",
          }}
        ></div>

        <Link to="/admin/banners-create" className="btn btn-primary">
          Create New
        </Link>
      </header>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <div className="mb-3">
        <input
          type="text"
          className="form-control w-100 w-md-50"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBanners.length > 0 ? (
              currentBanners.map((banner, index) => (
                <tr key={banner._id}>
                  <td>{indexOfFirstBanner + index + 1}</td>
                  <td>{banner.title}</td>
                  <td>{banner.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        banner.status === "active" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {banner.status}
                    </span>
                  </td>
                  <td>
                    {banner.image ? (
                      <img
                        src={banner.image}
                        alt="Banner"
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
                        to={`/admin/banners-edit/${banner._id}`}
                        className="btn btn-sm btn-warning me-2"
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </Link>
                      <button
                        onClick={() => openDeleteModal(banner._id)}
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
                <td colSpan="6" className="text-center">
                  No banners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination className="justify-content-center mt-3">
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
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
          Are you sure you want to delete this banner? This action cannot be
          undone.
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

export default BannersList;
