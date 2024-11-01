import React, { useState } from 'react';
import axios from 'axios';
import { API_URLS } from '../../constants/apiConstants';
import { Card, Button, Alert } from 'react-bootstrap';

const DatabaseBackup = () => {
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        try {
            // Fetch data from the API
            const response = await axios.get(`${API_URLS.DATABASE}`);
            const data = JSON.stringify(response.data, null, 2); // Format JSON with indentation
            
            // Create a blob for the JSON data
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Create a temporary link element
            const link = document.createElement('a');
            link.href = url;
            link.download = 'database-details.json'; // Name of the downloaded file
            document.body.appendChild(link);
            link.click();

            // Clean up the temporary URL and link
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setError(null); // Clear any previous errors
        } catch (err) {
            setError('Failed to download database details');
        }
    };

    return (
        <div className="container mt-5">
            <Card className="text-center" style={styles.card}>
                <Card.Header as="h2" style={styles.cardHeader}>Download Database Details</Card.Header>
                <Card.Body style={styles.cardBody}>
                    <Card.Text>
                        Click the button below to download the complete database details as a JSON file.
                    </Card.Text>
                    <Button variant="primary" onClick={handleDownload}>
                        Download JSON
                    </Button>
                </Card.Body>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card>
        </div>
    );
};

const styles = {
    card: {
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    cardHeader: {
        background: 'linear-gradient(to right, #007bff, #0056b3)', // Blue gradient
        color: 'white',
        padding: '20px',
    },
    cardBody: {
        backgroundColor: '#f9f9f9', // Light background for the body
    },
};

export default DatabaseBackup;
