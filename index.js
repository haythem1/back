const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventRoutes = require('./controllers/events');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

app.use('/events', eventRoutes);

// Lancer le serveur
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
