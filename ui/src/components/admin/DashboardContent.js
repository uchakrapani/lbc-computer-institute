import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers, faFileAlt, faExclamationTriangle, faCreditCard, faCogs, faEnvelope, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

const iconMap = {
    appinfos: faCogs,
    courseoffers: faBook,
    courses: faClipboardList,
    complaints: faExclamationTriangle,
    studentpayments: faCreditCard,
    students: faUsers,
    errorlogs: faFileAlt,
    branches: faClipboardList,
    admins: faUsers,
    contactus: faEnvelope,
    banners: faBullhorn,
};

const DashboardContent = () => {
    const [collectionData, setCollectionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollectionCounts = async () => {
            try {
                const response = await fetch('https://lbc-computer-institute-api.vercel.app/api/collection-counts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCollectionData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCollectionCounts();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>;
    }

    return (
        <div style={styles.dashboardContent}>
            <h2>Welcome Administrator</h2>
            <p>Welcome administrator to the admin dashboard where you can do many things. Add charts, tables, or statistics.</p>

            <h3>Here are the collection of data: {collectionData.totalCollections}</h3>
            <div style={styles.collectionBoxes}>
                {Object.entries(collectionData.collections).map(([collectionName, count]) => (
                    <div key={collectionName} style={styles.collectionBox}>
                        <div style={styles.iconContainer}>
                            <FontAwesomeIcon icon={iconMap[collectionName]} size="2x" />
                        </div>
                        <div>
                            <h4>{collectionName}</h4>
                            <p>Total Records: {count}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    dashboardContent: {
        padding: '20px',
        backgroundColor: '#f9f9f9', // Light background color for the dashboard
        borderRadius: '8px',
    },
    collectionBoxes: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    collectionBox: {
        flex: '1 0 30%',
        minWidth: '200px',
        margin: '10px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff', // White background for each box
        transition: 'transform 0.2s, box-shadow 0.2s', // Smooth hover effect
    },
    iconContainer: {
        marginRight: '10px',
    },
};

// Add hover effect to collectionBox
const hoverEffect = {
    ':hover': {
        transform: 'scale(1.05)', // Scale effect on hover
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Darker shadow on hover
    },
};

// Apply hover effect to collectionBox
const collectionBoxWithHover = {
    ...styles.collectionBox,
    ...hoverEffect,
};

export default DashboardContent;
