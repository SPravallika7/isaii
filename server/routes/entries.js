const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// GET all entries
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new entry
// POST new entry
router.post('/', async (req, res) => {
  const { title, content, mood, date } = req.body;

  console.log("Received entry:", req.body); // Log input for debugging

  // Validation check
  if (!title || !content || !mood || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newEntry = new Entry({ title, content, mood, date });

  try {
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// PUT update entry by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE entry by ID
router.delete('/:id', async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
