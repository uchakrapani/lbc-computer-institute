import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileInfo = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get user ID from session storage
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user ? user._id : '';

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/api/admin/${userId}`);
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!profile) return <div>No profile data available</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Profile Information</h2>
            <table style={styles.table}>
                <tbody>
                    <tr>
                        <td style={styles.tableCell}><strong>Full Name:</strong></td>
                        <td style={styles.tableCell}>{profile.full_name}</td>
                    </tr>
                    <tr>
                        <td style={styles.tableCell}><strong>Email:</strong></td>
                        <td style={styles.tableCell}>{profile.email}</td>
                    </tr>
                    <tr>
                        <td style={styles.tableCell}><strong>Phone:</strong></td>
                        <td style={styles.tableCell}>{profile.phone}</td>
                    </tr>
                    <tr>
                        <td style={styles.tableCell}><strong>Login ID:</strong></td>
                        <td style={styles.tableCell}>{profile.login_id}</td>
                    </tr>
                    <tr>
                        <td style={styles.tableCell}><strong>Role:</strong></td>
                        <td style={styles.tableCell}>{profile.role}</td>
                    </tr>
                    <tr>
                        <td style={styles.tableCell}><strong>Status:</strong></td>
                        <td style={styles.tableCell}>{profile.status}</td>
                    </tr>
                    <tr>
                        <td style={styles.tableCell}><strong>Date Created:</strong></td>
                        <td style={styles.tableCell}>{new Date(profile.date_created).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style={styles.tableCell}><strong>Date Updated:</strong></td>
                        <td style={styles.tableCell}>{new Date(profile.date_updated).toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
            <Link to={`/admin/admin-edit/${profile._id}`} style={styles.editButton}>
                Edit Profile
            </Link>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        margin: '20px 0',
    },
    title: {
        marginBottom: '16px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableCell: {
        padding: '12px',
        borderBottom: '1px solid #E5E7EB',
        fontSize: '16px',
        color: '#555555',
    },
    editButton: {
        display: 'inline-block',
        marginTop: '20px',
        padding: '10px 16px',
        backgroundColor: '#4B5563',
        color: '#FFFFFF',
        textDecoration: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        textAlign: 'center',
        transition: 'background-color 0.3s ease',
    },
};

export default ProfileInfo;
