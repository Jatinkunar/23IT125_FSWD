const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to log user visits
app.use((req, res, next) => {
    const logEntry = `IP: ${req.ip}, Time: ${new Date().toISOString()}\n`;
    fs.appendFileSync('visits.log', logEntry);
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to retrieve logs
app.get('/logs', (req, res) => {
    const logs = fs.readFileSync('visits.log', 'utf8');
    const logLines = logs.split('\n').filter(line => line.trim() !== '');
    const logData = logLines.map(line => {
        const [ip, time] = line.split(', ').map(entry => entry.split(': ')[1]);
        return { ip, time };
    });
    res.json(logData);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
