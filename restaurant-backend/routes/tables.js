// routes/tables.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Table = require('../models/Table');
const Reservation = require('../models/Reservation');

// Check table availability
router.get('/available', auth, async (req, res) => {
  try {
    const { date, timeSlot, numberOfGuests } = req.query;

    if (!date || !timeSlot || !numberOfGuests) {
      return res.status(400).json({
        error: 'Date, timeSlot, and numberOfGuests are required'
      });
    }

    // Find all tables with sufficient capacity
    const suitableTables = await Table.find({
      capacity: { $gte: parseInt(numberOfGuests) },
      isActive: true
    });

    // Check which tables are available
    const availableTables = [];

    for (const table of suitableTables) {
      const existingReservation = await Reservation.findOne({
        table: table._id,
        date: new Date(date),
        timeSlot: timeSlot,
        status: 'confirmed'
      });

      if (!existingReservation) {
        availableTables.push({
          id: table._id,
          tableNumber: table.tableNumber,
          capacity: table.capacity
        });
      }
    }

    res.json({
      available: availableTables.length > 0,
      tables: availableTables,
      message: availableTables.length > 0
        ? `${availableTables.length} table(s) available`
        : 'No tables available for this time slot'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available time slots
router.get('/timeslots', (req, res) => {
  res.json({
    timeSlots: [
      '12:00-14:00',
      '14:00-16:00',
      '18:00-20:00',
      '20:00-22:00'
    ]
  });
});

module.exports = router;