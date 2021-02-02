const express = require('express');
const Note = require('../models/note');
const auth = require('../middleware/auth');
const router = new express.Router();

//CRUD Operations
router.post('/notes', auth, async (req, res) => {
  const note = new Note({
    ...req.body,
    owner: req.user._id
  });

  try {
    await note.save();
    res.status(201).send(note);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/notes', auth, async (req, res) => {
  try {
    await req.user.populate('notes').execPopulate();
    res.send(req.user.notes);
  } catch (e) {
    res.status(500).send();
  }
});
router.get('/notes/:noteId', (req, res) => {});

router.patch('/notes/:noteId', (req, res) => {});

router.delete('/notes/:noteId', (req, res) => {});

module.exports = router;
