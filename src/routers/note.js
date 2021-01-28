const express = require('express');
const router = new express.Router();

//CRUD Operations

router.post('/notes', (req, res) => {});

router.get('/notes', (req, res) => {});
router.get('/notes/:noteId', (req, res) => {});

router.patch('/notes/:noteId', (req, res) => {});

router.delete('/notes/:noteId', (req, res) => {});

module.exports = router;
