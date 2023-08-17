const express = require('express');
const router = express.Router();
const db = require('../database/queries/userQueries');

router.get('/', db.getUsers);
router.get('/:id', db.getUserById);
router.put('/:id', db.updateUser);
router.delete('/:id', db.deleteUser);

module.exports = router;