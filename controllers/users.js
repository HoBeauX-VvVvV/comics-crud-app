const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// Index
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.render('users/index.ejs', { allUsers });
    } catch (error) {
        res.status(400).send({ msg: error.message });
        res.redirect('/')
    }
  });
  
  // Show
  router.get('/:userId', async (req, res) => {
    try {
        const pageOwner = await User.findById(req.params.userId);
        res.render('users/show.ejs', {
            pageOwner
      });
    } catch (error) {
        res.status(400).send({ msg: error.message });
        res.redirect('/')
    }
  });
  
  module.exports = router;