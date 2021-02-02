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
router.get('/notes/:noteId', auth, async (req, res) => {
  const _id = req.params.noteId;

  try {
    const note = await Note.findOne({ _id, owner: req.user._id });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/notes/:noteId', auth, async (req, res) => {
  const _id = req.params.noteId;
  const allowedUpdates = ['title', 'body'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid update' });
  }

  try {
    const note = await Note.findOne({ _id, owner: req.user._id });
    if (!note) {
      return res.status(404).send();
    }
    updates.forEach((update) => (note[update] = req.body[update]));
    await note.save();
    res.send(note);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/notes/:noteId', (req, res) => {});

module.exports = router;
