const events = [];
let nextId = 1;

// Récupérer tous les événements
function getAllEvents() {
  return events;
}

// Récupérer un événement par ID
function getEventById(id) {
  return events.find((event) => event.id === parseInt(id));
}

// Créer un nouvel événement
function createEvent(data) {
  const newEvent = {
    id: nextId++,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
  };
  events.push(newEvent);
  return newEvent;
}

// Modifier un événement
function updateEvent(id, data) {
  const event = getEventById(id);
  if (!event) return null;

  event.title = data.title;
  event.description = data.description;
  event.date = data.date;
  event.category = data.category;

  return event;
}

// Supprimer un événement
function deleteEvent(id) {
  const index = events.findIndex((event) => event.id === parseInt(id));
  if (index === -1) return false;

  events.splice(index, 1);
  return true;
}

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
