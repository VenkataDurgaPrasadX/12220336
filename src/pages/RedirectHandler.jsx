// src/pages/RedirectHandler.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
    const { shortcode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('shortUrls')) || [];
        const matched = stored.find(item => item.shortcode === shortcode);

        if (!matched) {
            alert('Shortcode not found');
            navigate('/');
            return;
        }

        const now = new Date();
        const expiry = new Date(matched.expiresAt);
        if (now > expiry) {
            alert('This link has expired');
            navigate('/');
            return;
        }

        // Log click
        const clickData = {
            timestamp: new Date().toISOString(),
            source: document.referrer || 'Direct',
            location: 'MockLocation', // you can replace this if you add IP-based location later
        };

        matched.clicks = matched.clicks || [];
        matched.clicks.push(clickData);

        const updated = stored.map(item =>
            item.shortcode === shortcode ? matched : item
        );

        localStorage.setItem('shortUrls', JSON.stringify(updated));

        // Redirect
        window.location.href = matched.longUrl;
    }, [shortcode, navigate]);

    return <p>Redirecting...</p>;
};

export default RedirectHandler;
