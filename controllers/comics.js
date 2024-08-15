const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('comicss/index.ejs', {
        comics: currentUser.comicss
      });
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
});


// NEW
router.get('/new', async (req, res) => {
    res.render('comicss/new.ejs')
})

// CREATE 
router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.comics.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/comics`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
});

module.exports = router;