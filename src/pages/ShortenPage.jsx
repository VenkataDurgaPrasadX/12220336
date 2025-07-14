import React, { useState, useEffect } from 'react';
import './ShortenPage.css';
import { logEvent } from '../utils/logger';

const ShortenPage = () => {
    const [longUrl, setLongUrl] = useState('');
    const [validity, setValidity] = useState('');
    const [shortcode, setShortcode] = useState('');
    const [shortened, setShortened] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('shortUrls')) || [];
        setShortened(stored);
    }, []);

    const generateRandomCode = () => Math.random().toString(36).substring(2, 8);

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleShorten = () => {
        if (!longUrl || !isValidUrl(longUrl)) {
            alert('Enter a valid URL');
            return;
        }

        const code = shortcode || generateRandomCode();
        const minutes = parseInt(validity) || 30;
        const expiresAt = new Date(Date.now() + minutes * 60000);

        const stored = JSON.parse(localStorage.getItem('shortUrls')) || [];

        if (stored.find(s => s.shortcode === code)) {
            alert('Shortcode already in use!');
            return;
        }

        const newEntry = {
            longUrl,
            shortcode: code,
            expiresAt,
            clicks: [],
        };

        const updated = [...stored, newEntry];
        localStorage.setItem('shortUrls', JSON.stringify(updated));
        setShortened(updated);

        // 🔐 Logging middleware
        logEvent('URL_SHORTENED', {
            longUrl,
            shortcode: code,
            validity: `${minutes} minutes`,
            timestamp: new Date().toISOString()
        });

        setLongUrl('');
        setValidity('');
        setShortcode('');
    };

    return (
        <div className="shorten-container">
            <h2>URL Shortener</h2>
            <div className="form">
                <input
                    placeholder="Enter Long URL"
                    value={longUrl}
                    onChange={e => setLongUrl(e.target.value)}
                />
                <input
                    placeholder="Validity in minutes"
                    value={validity}
                    onChange={e => setValidity(e.target.value)}
                />
                <input
                    placeholder="Custom Shortcode (optional)"
                    value={shortcode}
                    onChange={e => setShortcode(e.target.value)}
                />
                <button onClick={handleShorten}>Shorten</button>
            </div>

            <div className="results">
                <h3>Shortened URLs</h3>
                {shortened.map((item, idx) => (
                    <div key={idx} className="url-item">
                        <a
                            href={`http://localhost:3000/${item.shortcode}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {`http://localhost:3000/${item.shortcode}`}
                        </a>
                        <p>Expires At: {new Date(item.expiresAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShortenPage;
