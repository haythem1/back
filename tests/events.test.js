const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { validateEvent } = require('../helpers/validators');
const { getAllEvents, createEvent } = require('../events');
const app = express();

app.use(bodyParser.json());

app.get('/events', (req, res) => res.json(getAllEvents()));
app.post('/events', (req, res) => {
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).json({ message: error });
  const event = createEvent(req.body);
  res.status(201).json(event);
});

describe('API Tests', () => {
  it('devrait renvoyer tous les événements', async () => {
    const res = await request(app).get('/events');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('devrait créer un nouvel événement', async () => {
    const newEvent = { title: 'Test Event', description: 'Description', date: '2025-01-17', category: 'General' };
    const res = await request(app).post('/events').send(newEvent);
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual('Test Event');
  });
});
