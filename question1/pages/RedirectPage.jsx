// src/pages/RedirectPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RedirectPage = () => {
    const { shortcode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('shortUrls')) || [];
        const entry = stored.find(item => item.shortcode === shortcode);

        if (entry) {
            // Log the click
            entry.clicks.push({
                timestamp: new Date().toISOString(),
                source: document.referrer || 'Direct',
                location: 'Mock Location' // Replace with real API if needed
            });

            // Update localStorage with the new click
            const updated = stored.map(item =>
                item.shortcode === shortcode ? entry : item
            );
            localStorage.setItem('shortUrls', JSON.stringify(updated));

            // Redirect
            window.location.href = entry.longUrl;
        } else {
            alert('Invalid or expired link');
            navigate('/');
        }
    }, [shortcode, navigate]);

    return <p>Redirecting...</p>;
};

export default RedirectPage;
