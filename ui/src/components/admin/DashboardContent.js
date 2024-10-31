import React, { useEffect, useState } from 'react';

const DashboardContent = () => {
    const [collectionData, setCollectionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch collection counts from the API
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
            <h2>Dashboard Overview</h2>
            <p>Your main content goes here. Add charts, tables, or statistics.</p>

            <h3>Total Collections: {collectionData.totalCollections}</h3>
            <div style={styles.collectionBoxes}>
                {Object.entries(collectionData.collections).map(([collectionName, count]) => (
                    <div key={collectionName} style={styles.collectionBox}>
                        <div style={styles.iconContainer}>
                            <img
                                src={`https://via.placeholder.com/40?text=${collectionName.charAt(0).toUpperCase()}`}
                                alt={`${collectionName} icon`}
                            />
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
    },
    collectionBoxes: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    collectionBox: {
        flex: '1 0 30%', // Adjust the width based on your preference
        minWidth: '200px', // Minimum width for responsive design
        margin: '10px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    iconContainer: {
        marginRight: '10px',
    },
};

export default DashboardContent;
