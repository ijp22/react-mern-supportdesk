const asyncHandler = require('express-async-handler');

// Models
const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');

// @descr   Get Notes
// @route   GET api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get User
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User Not Found!');
  }

  // Get Tickets
  const ticket = await Ticket.findById(req.params.ticketId);

  // Is Users Ticket?
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Get Notes
  const notes = await Note.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

// @descr   Create Note
// @route   POST api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  // Get User
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User Not Found!');
  }

  // Get Tickets
  const ticket = await Ticket.findById(req.params.ticketId);

  // Is Users Ticket?
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Get Notes
  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });
  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
