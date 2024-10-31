import React, { useState } from 'react';
import axios from 'axios';
import { API_URLS } from '../../constants/apiConstants';

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
        <div className="container">
            <h2>Download Database Details</h2>
            <p>Click the button below to download the complete database details as a JSON file.</p>
            <button className="btn btn-primary" onClick={handleDownload}>
                Download JSON
            </button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default DatabaseBackup;
