import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logEvent } from '../utils/logger';

const RedirectHandler = () => {
    const { shortcode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('shortUrls')) || [];
        const itemIndex = stored.findIndex(item => item.shortcode === shortcode);

        if (itemIndex === -1) {
            alert('Short URL not found.');
            navigate('/');
            return;
        }

        const item = stored[itemIndex];
        const now = new Date();

        if (new Date(item.expiresAt) < now) {
            alert('This link has expired.');
            navigate('/');
            return;
        }

        const newClick = {
            timestamp: now.toISOString(),
            source: document.referrer || 'direct',
            location: 'mocked-location', // replace with real IP lookup if desired
        };

        item.clicks.push(newClick);
        stored[itemIndex] = item;
        localStorage.setItem('shortUrls', JSON.stringify(stored));

        logEvent('URL_CLICKED', { shortcode, longUrl: item.longUrl });

        window.location.href = item.longUrl;
    }, [shortcode, navigate]);

    return <p>Redirecting...</p>;
};

export default RedirectHandler;
