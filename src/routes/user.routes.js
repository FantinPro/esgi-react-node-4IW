const express = require('express');
const usersController = require('../controllers/user.controller');
const { authorized } = require('../middlewares/auth');

const router = express.Router();

router.get('/token', authorized(), usersController.getUserByToken);

module.exports = router;
