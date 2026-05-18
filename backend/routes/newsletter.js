const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  // validate
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const existing = await pool.query(
      'SELECT id FROM newsletters WHERE email = $1',
      [email]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Already subscribed' });
    }

    // insert
    await pool.query(
      'INSERT INTO newsletters (email, subscribed_at) VALUES ($1, NOW())',
      [email]
    );

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    console.error('Newsletter subscribe error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;