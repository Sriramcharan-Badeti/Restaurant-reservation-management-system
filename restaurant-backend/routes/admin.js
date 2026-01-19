// routes/admin.js
const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

// Get all reservations (with optional filters)
router.get('/reservations', auth, adminOnly, async (req, res) => {
  try {
    const { date, status } = req.query;
    const query = {};

    // Filter by date if provided
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    const reservations = await Reservation.find(query)
      .populate('user', 'name email')
      .populate('table', 'tableNumber capacity')
      .sort({ date: 1, timeSlot: 1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update reservation
router.put('/reservations/:id', auth, adminOnly, async (req, res) => {
  try {
    const { status, timeSlot, numberOfGuests } = req.body;
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    // Update fields if provided
    if (status) reservation.status = status;
    if (timeSlot) reservation.timeSlot = timeSlot;
    if (numberOfGuests) reservation.numberOfGuests = numberOfGuests;

    await reservation.save();
    await reservation.populate('user table');

    res.json({
      message: 'Reservation updated successfully',
      reservation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel any reservation (admin can cancel anyone's reservation)
router.delete('/reservations/:id', auth, adminOnly, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    reservation.status = 'cancelled';
    await reservation.save();

    res.json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all tables
router.get('/tables', auth, adminOnly, async (req, res) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new table
router.post('/tables', auth, adminOnly, async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;

    const table = new Table({ tableNumber, capacity });
    await table.save();

    res.status(201).json({
      message: 'Table created successfully',
      table
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;