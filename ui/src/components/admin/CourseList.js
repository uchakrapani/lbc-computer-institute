import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button, Pagination } from "react-bootstrap";
import { API_URLS } from "../../constants/apiConstants";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added error message state
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Track the ID to be deleted

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10; // Number of courses per page
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true); // Set loading to true before the request
      try {
        const response = await axios.get(`${API_URLS.COURSES}`); // Ensure this API_URLS constant is defined
        setCourses(response.data);
        setFilteredCourses(response.data);
      } catch (error) {
        console.error("Error fetching course list:", error);
        setErrorMessage("Failed to load courses. Please try again."); // Add error message
      } finally {
        setLoading(false); // Set loading to false after the request
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const results = courses.filter((course) =>
      course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchTerm, courses]);

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
        await axios.delete(`${API_URLS.COURSES}/${deleteId}`);
        setCourses(courses.filter((course) => course._id !== deleteId));
        setFilteredCourses(
          filteredCourses.filter((course) => course._id !== deleteId)
        );
        setSuccessMessage("Course deleted successfully.");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error deleting course:", error);
        setErrorMessage("Failed to delete course. Please try again."); // Add error message
      } finally {
        closeDeleteModal();
      }
    }
  };

  // Pagination calculations
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Course List</h2>
        <Link to="/admin/courses-create" className="btn btn-primary">
          Create New Course
        </Link>
      </div>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="mb-3">
        <input
          type="text"
          className="form-control w-100 w-md-50"
          placeholder="Search by course name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">Loading courses...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Level</th>
                <th>Price</th>
                <th>Status</th>
                <th>Banner</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1 + (currentPage - 1) * coursesPerPage}</td>
                  <td>{course.course_name}</td>
                  <td>{course.description}</td>
                  <td>{course.duration}</td>
                  <td>{course.level}</td>
                  <td>{course.price}</td>
                  <td>
                    <span
                      className={`badge ${
                        course.status === "active" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td>
                    {course.banner_url ? (
                      <img
                        src={course.banner_url}
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
                        to={`/admin/courses-edit/${course._id}`}
                        className="btn btn-sm btn-warning me-2"
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </Link>
                      <button
                        onClick={() => openDeleteModal(course._id)}
                        className="btn btn-sm btn-danger"
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentCourses.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Component */}

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
          Are you sure you want to delete this course? This action cannot be
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

export default CourseList;
