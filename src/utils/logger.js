// src/utils/logger.js

export const logEvent = (action, details = {}) => {
    const logs = JSON.parse(localStorage.getItem('logs')) || [];

    const log = {
        timestamp: new Date().toISOString(),
        action,
        ...details,
    };

    logs.push(log);
    localStorage.setItem('logs', JSON.stringify(logs));
};
