import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; 
import { API_URLS } from '../../constants/apiConstants';

const AdminList = () => {
    const [admins, setAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null); // Track the ID to be deleted

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get(API_URLS.ADMIN_LIST);
                setAdmins(response.data);
                setFilteredAdmins(response.data);
            } catch (error) {
                console.error('Error fetching admin list:', error);
            }
        };

        fetchAdmins();
    }, []);

    useEffect(() => {
        const results = admins.filter(admin =>
            admin.full_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAdmins(results);
    }, [searchTerm, admins]);

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
                await axios.delete(`${API_URLS.ADMIN_LIST}/${deleteId}`);
                setAdmins(admins.filter(admin => admin._id !== deleteId));
                setFilteredAdmins(filteredAdmins.filter(admin => admin._id !== deleteId));
                setSuccessMessage('Admin deleted successfully.');
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (error) {
                console.error('Error deleting admin:', error);
            } finally {
                closeDeleteModal();
            }
        }
    };

    return (
        <div className="container" style={{ height: '100vh' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Admin List</h2>
                <Link to="/admin/admin-create" className="btn btn-primary">Create New</Link>
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
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Login ID</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAdmins.map((admin, index) => (
                            <tr key={admin._id}>
                                <td>{index + 1}</td>
                                <td>{admin.full_name}</td>
                                <td>{admin.email}</td>
                                <td>{admin.phone}</td>
                                <td>{admin.login_id}</td>
                                <td>{admin.role}</td>
                                <td>
                                    <span className={`badge ${admin.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                        {admin.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-around">
                                        <Link to={`/admin/admin-edit/${admin._id}`} className="btn btn-sm btn-warning me-2">
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                        </Link>
                                        <button onClick={() => openDeleteModal(admin._id)} className="btn btn-sm btn-danger">
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={closeDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this admin? This action cannot be undone.
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

export default AdminList;
