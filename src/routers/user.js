const e = require('express');
const express = require('express');
const User = require('../models/user');
const router = new express.Router();

//CRUD Operations

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/users', (req, res) => {});
router.get('/users/:userId', (req, res) => {});

router.patch('/users/:userId', (req, res) => {});

router.delete('/users/:userId', (req, res) => {});

module.exports = router;
