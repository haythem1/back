function validateEvent(data) {
    if (!data.title) return { error: 'Title is required' };
    if (!data.date) return { error: 'Date is required' };
  
    // Vérifier si la date est au bon format
    if (isNaN(Date.parse(data.date))) {
      return { error: 'Invalid date format' };
    }
  
    return { error: null };
  }
  
  module.exports = { validateEvent };
  