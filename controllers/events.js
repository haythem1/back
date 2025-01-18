const express = require('express');
const { validateEvent } = require('../helpers/validators');
const { getEventById, createEvent, updateEvent, deleteEvent, getAllEvents } = require('../models/events');

const router = express.Router();

// list des événements
router.get('/', (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const events = getAllEvents();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedEvents = events.slice(startIndex, endIndex);
    res.json({
        page: parseInt(page),
        limit: parseInt(limit),
        total: events.length,
        events: paginatedEvents,
    });
});

// Créer un événement
router.post('/', (req, res) => {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).json({ message: error });

    const event = createEvent(req.body);
    res.status(201).json(event);
});
// Récupérer un événement par ID
router.get('/:id', (req, res) => {
    const event = getEventById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Événement introuvable' });
    res.json(event);
});
// Mettre à jour un événement
router.put('/:id', (req, res) => {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).json({ message: error });

    const updatedEvent = updateEvent(req.params.id, req.body);
    if (!updatedEvent) return res.status(404).json({ message: 'Événement introuvable' });

    res.json(updatedEvent);
});
//supprimer un événement
router.delete('/:id', (req, res) => {
    const deleted = deleteEvent(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Événement introuvable' });

    res.status(204).send();
});

module.exports = router;
