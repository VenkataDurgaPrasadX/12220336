import React, { useState } from 'react';

const UrlInput = ({ onSubmit }) => {
    const [url, setUrl] = useState('');
    const [validity, setValidity] = useState('');
    const [shortcode, setShortcode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url.trim()) {
            alert('Please enter a valid URL');
            return;
        }

        onSubmit({
            url,
            validity: validity ? parseInt(validity) : 30, // default 30 mins
            shortcode: shortcode || null
        });

        // clear input
        setUrl('');
        setValidity('');
        setShortcode('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <input
                type="text"
                placeholder="Enter Long URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Validity in minutes"
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
                min="1"
            />
            <input
                type="text"
                placeholder="Custom Shortcode (optional)"
                value={shortcode}
                onChange={(e) => setShortcode(e.target.value)}
            />
            <button type="submit">Shorten</button>
        </form>
    );
};

export default UrlInput;
