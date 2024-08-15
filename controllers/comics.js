const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// INDEX
router.get('/', async (req, res) => {
    try {
     // const currentUser = await User.findById(req.session.user._id);
      res.render('comics/index.ejs') //, {
       // comics: currentUser.comicss
     // });
    } catch (error) {
        res.status(400).send({ msg: error.message })
        res.redirect('/')
    }
});


// NEW
router.get('/new', async (req, res) => {
    res.render('comics/new.ejs')
})

// CREATE 
router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.comicsCollection.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/comics`);
    } catch (error) {
        res.status(400).send({ msg: error.message })
        res.redirect('/')
    }
});

module.exports = router;