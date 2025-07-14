// src/components/UrlList.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';

const UrlList = ({ urls }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>Shortened URLs</Typography>
            <Stack spacing={2}>
                {urls.map((item, idx) => (
                    <Card key={idx} variant="outlined">
                        <CardContent>
                            <Typography><strong>Original:</strong> {item.url}</Typography>
                            <Typography>
                                <strong>Shortcode:</strong>{' '}
                                <a href={`/${item.shortcode}`} target="_blank" rel="noreferrer">
                                    {item.shortcode}
                                </a>
                            </Typography>
                            <Typography><strong>Expires At:</strong> {item.expiry}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
};

export default UrlList;
