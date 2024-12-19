const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, default: "Unread" },
});

module.exports = mongoose.model('Book', BookSchema);
