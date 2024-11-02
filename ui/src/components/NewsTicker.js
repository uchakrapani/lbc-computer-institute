import React, { useEffect, useState } from 'react';

const NewsTicker = () => {
    const [courseOffers, setCourseOffers] = useState([]);

    useEffect(() => {
        const fetchCourseOffers = async () => {
            try {
                const response = await fetch('https://lbc-computer-institute-api.vercel.app/api/courseoffers');
                const data = await response.json();
                setCourseOffers(data);
            } catch (error) {
                console.error('Error fetching course offers:', error);
            }
        };

        fetchCourseOffers();
    }, []);

    const tickerStyle = {
        backgroundColor: '#f8f9fa', // Light gray background
        color: '#343a40', // Dark text color
        padding: '10px 0',
        fontSize: '1.2em',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    };

    const titleStyle = {
        backgroundColor: '#0056b3', // Dark blue background for title
        color: '#ffffff', // White text color
        padding: '10px 15px',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1,
    };

    const marqueeStyle = {
        display: 'flex',
        animation: 'ticker 30s linear infinite', // Slower speed
        whiteSpace: 'nowrap',
        paddingLeft: '160px', // Space for the title
    };

    const newsItemStyle = {
        marginRight: '50px',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
    };

    const newsTitleStyle = {
        fontWeight: 'bold',
        marginRight: '5px', // Spacing between title and date
    };

    const newsDateStyle = {
        color: '#6c757d', // Lighter color for the date
    };

    return (
        <div style={tickerStyle}>
            <div style={titleStyle}>Latest Offers</div>
            <style>
                {`
                    @keyframes ticker {
                        0% { transform: translateX(100%); }
                        100% { transform: translateX(-100%); }
                    }
                `}
            </style>
            <div style={marqueeStyle}>
                {courseOffers.map((offer) => (
                    <div key={offer._id} style={newsItemStyle}>
                        <span style={newsTitleStyle}>
                            {`${offer.course_id} - Discount: ${offer.discount_percentage}%`}
                        </span>
                        <span style={newsDateStyle}>
                            {`(Valid from ${new Date(offer.offer_start_date).toLocaleDateString()} to ${new Date(offer.offer_end_date).toLocaleDateString()})`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsTicker;
