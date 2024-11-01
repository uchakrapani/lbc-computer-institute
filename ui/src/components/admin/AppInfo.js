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
    const [deleteId, setDeleteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAppInfoList, setFilteredAppInfoList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Change this value to show more items per page

    useEffect(() => {
        const fetchAppInfoList = async () => {
            try {
                const response = await axios.get(`${API_URLS.APP_INFO_LIST}`);
                setAppInfoList(response.data);
                setFilteredAppInfoList(response.data);
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
                await axios.delete(`${API_URLS.APP_INFO_LIST}/${deleteId}`);
                setAppInfoList(appInfoList.filter(app => app._id !== deleteId));
                setFilteredAppInfoList(filteredAppInfoList.filter(app => app._id !== deleteId));
                closeDeleteModal();
            } catch (error) {
                console.error('Error deleting app info:', error);
            }
        }
    };

    const totalPages = Math.ceil(filteredAppInfoList.length / itemsPerPage);
    const currentAppInfoList = filteredAppInfoList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Application Information List</h2>
                <div style={{ flexGrow: 1, height: '2px', backgroundColor: '#d1d1d1', marginLeft: '10px', marginRight: '10px' }}></div>
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
                <table className="table table-bordered table-hover">
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
                        {currentAppInfoList.length > 0 ? (
                            currentAppInfoList.map((app, index) => (
                                <tr key={app._id} 
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'} 
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{app.app_name}</td>
                                    <td>
                                        <img src={app.logo_url} alt="App Logo" style={{ width: '50px', height: '50px' }} />
                                    </td>
                                    <td>{app.description}</td>
                                    <td>
                                        <img src={app.favicon_url} alt="Favicon" style={{ width: '20px', height: '20px' }} />
                                    </td>
                                    <td>
                                        <span className={`badge ${app.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <Link to={`/admin/appinfo-edit/${app._id}`} className="btn btn-sm btn-warning me-2">
                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                            </Link>
                                            <button onClick={() => openDeleteModal(app._id)} className="btn btn-sm btn-danger">
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No applications found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

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
