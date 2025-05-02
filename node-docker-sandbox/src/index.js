const http = require('http');
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/health-check', (req, res) => {
    return res.send({ message: 'App running...' });
});

http
    .createServer(app)
    .listen(PORT, () => {
        console.log(`Server listening on port: ${PORT}`);
    });

