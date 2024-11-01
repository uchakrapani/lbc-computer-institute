import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
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

// Function to generate a random color in hex format
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Function to determine if the color is light or dark
const getTextColor = (bgColor) => {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    // Calculate brightness using the luminance formula
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
    return brightness > 186 ? 'black' : 'white'; // Return black for light colors and white for dark colors
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
                {Object.entries(collectionData.collections).map(([collectionName, count]) => {
                    const cardColor = getRandomColor(); // Generate a random color for each card
                    const textColor = getTextColor(cardColor); // Determine text color based on background color
                    return (
                        <Card
                            key={collectionName}
                            style={{ width: '18rem', backgroundColor: cardColor, color: textColor }} // Set text color
                            className="mb-2"
                        >
                            <Card.Header>
                                <FontAwesomeIcon icon={iconMap[collectionName]} size="2x" />
                                {' '} {collectionName}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{collectionName.charAt(0).toUpperCase() + collectionName.slice(1)} Records</Card.Title>
                                <Card.Text>
                                    Total Records: {count}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
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
};

export default DashboardContent;
