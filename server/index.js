const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Added CORS middleware
const individualRoutes = require('./api/individual');
const businessRoutes = require('./api/business');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Delegate routes
app.use('/api/individual', individualRoutes);
app.use('/api/business', businessRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});