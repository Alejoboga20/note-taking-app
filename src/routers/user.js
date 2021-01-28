const express = require('express');
const router = new express.Router();

//CRUD Operations

router.post('/users', (req, res) => {});

router.get('/users', (req, res) => {});
router.get('/users/:userId', (req, res) => {});

router.patch('/users/:userId', (req, res) => {});

router.delete('/users/:userId', (req, res) => {});

module.exports = router;
