let events = [];

const getAllEvents = () => events;

const getEventById = (id) => events.find(event => event.id === id);

const createEvent = (eventData) => {
    const newEvent = { id: events.length + 1, ...eventData };
    events.push(newEvent);
    return newEvent;
};

const updateEvent = (id, eventData) => {
    const index = events.findIndex(event => event.id === id);
    if (index === -1) return null;
    events[index] = { ...events[index], ...eventData };
    return events[index];
};

const deleteEvent = (id) => {
    const index = events.findIndex(event => event.id === id);
    if (index === -1) return false;
    events.splice(index, 1);
    return true;
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
