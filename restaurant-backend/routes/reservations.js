// routes/reservations.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

// Helper function to find available table
async function findAvailableTable(date, timeSlot, numberOfGuests) {
  // Find tables with enough capacity
  const tables = await Table.find({
    capacity: { $gte: numberOfGuests },
    isActive: true
  }).sort({ capacity: 1 }); // Get smallest suitable table first

  // Check each table for availability
  for (const table of tables) {
    const existingReservation = await Reservation.findOne({
      table: table._id,
      date: new Date(date),
      timeSlot: timeSlot,
      status: 'confirmed'
    });

    // If no existing reservation, this table is available
    if (!existingReservation) {
      return table;
    }
  }

  return null; // No tables available
}

// Get user's reservations
router.get('/', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find({
      user: req.userId,
      status: 'confirmed'
    })
      .populate('table', 'tableNumber capacity')
      .sort({ date: 1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new reservation
router.post('/', auth, async (req, res) => {
  try {
    const { date, timeSlot, numberOfGuests } = req.body;

    // Validation
    if (!date || !timeSlot || !numberOfGuests) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if date is in the past
    const reservationDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (reservationDate < today) {
      return res.status(400).json({ error: 'Cannot book for past dates' });
    }

    // Find available table
    const availableTable = await findAvailableTable(date, timeSlot, numberOfGuests);

    if (!availableTable) {
      return res.status(400).json({
        error: 'No available tables for the requested date, time, and party size'
      });
    }

    // Create reservation
    const reservation = new Reservation({
      user: req.userId,
      table: availableTable._id,
      date: reservationDate,
      timeSlot,
      numberOfGuests
    });

    await reservation.save();
    await reservation.populate('table', 'tableNumber capacity');

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel reservation
router.delete('/:id', auth, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.id,
      user: req.userId,
      status: 'confirmed'
    });

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

module.exports = router;