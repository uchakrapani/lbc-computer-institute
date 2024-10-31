import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URLS } from '../../constants/apiConstants';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; 

const AppInfoList = () => {
    const [appInfoList, setAppInfoList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null); // Track the ID to be deleted
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [filteredAppInfoList, setFilteredAppInfoList] = useState([]); // State for filtered list

    useEffect(() => {
        const fetchAppInfoList = async () => {
            try {
                const response = await axios.get(`${API_URLS.APP_INFO_LIST}`);
                setAppInfoList(response.data); // Assuming the API returns an array of app info
                setFilteredAppInfoList(response.data); // Initialize filtered list
            } catch (error) {
                setError('Failed to load application information.');
                console.error('Error fetching app info list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppInfoList();
    }, []);

    useEffect(() => {
        // Filter appInfoList based on the search term
        const results = appInfoList.filter(app =>
            app.app_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAppInfoList(results);
    }, [searchTerm, appInfoList]);

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
                await axios.delete(`${API_URLS.APP_INFO_LIST}/${deleteId}`); // Adjusted the endpoint for deletion
                setAppInfoList(appInfoList.filter(app => app._id !== deleteId));
                setFilteredAppInfoList(filteredAppInfoList.filter(app => app._id !== deleteId));
                closeDeleteModal();
            } catch (error) {
                console.error('Error deleting app info:', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Application Information List</h2>
                <Link to="/admin/appinfo-create" className="btn btn-primary">Create New</Link>
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control w-100 w-md-50"
                    placeholder="Search by App Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>App Name</th>
                            <th>Logo</th>
                            <th>Description</th>
                            <th>Favicon</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppInfoList.map((app, index) => (
                            <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>{app.app_name}</td>
                                <td>
                                    <img src={app.logo} alt="App Logo" style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td>{app.description}</td>
                                <td>
                                    <img src={app.favicon} alt="Favicon" style={{ width: '20px', height: '20px' }} />
                                </td>
                                <td>
                                    <span className={`badge ${app.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                        {app.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-around">
                                        <Link to={`/admin/appinfo-edit/${app._id}`} className="btn btn-sm btn-warning me-2">
                                            <i className="fa fa-pencil" aria-hidden="true"></i> {/* Edit icon */}
                                        </Link>
                                        <button onClick={() => openDeleteModal(app._id)} className="btn btn-sm btn-danger">
                                            <i className="fa fa-trash" aria-hidden="true"></i> {/* Delete icon */}
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
                    Are you sure you want to delete this application info? This action cannot be undone.
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

export default AppInfoList;
