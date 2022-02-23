const asyncHandler = require('express-async-handler');

// Models
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

// @descr   Get User Tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User Not Found!');
  }

  // Get Tickets
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @descr   Get User Ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  //Get user
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User Not Found!');
  }

  // Get Ticket
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket Not Found!');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User Not Authorised!');
  }

  res.status(200).json(ticket);
});

// @descr   Create New Ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  // Check Inputs
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }

  // Get User
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User Not Found!');
  }

  // Create Ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(ticket);
});

// @descr   Delete User Ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User Not Found!');
  }

  // Get Ticket
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket Not Found!');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User Not Authorised!');
  }

  // Delete Ticket
  await ticket.remove();

  res.status(200).json({ success: true });
});

// @descr   Update User Ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user
  const user = await User.findById(req.user.id);

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('User Not Found!');
  }

  // Get Ticket
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket Not Found!');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User Not Authorised!');
  }

  // Update Ticket
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTicket,
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
};
