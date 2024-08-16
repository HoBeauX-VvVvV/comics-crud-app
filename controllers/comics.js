const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// INDEX
router.get('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      res.render('comics/index.ejs', {
      comics: currentUser.comicsCollection
      });
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

// SHOW

router.get('/:comicId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const comic = currentUser.comicsCollection.id(req.params.comicId);
      res.render('comics/show.ejs', {
        comic: comic
      });
    } catch (error) {
      console.log(error);
        res.redirect('/')
    }
});

// DELETE

router.delete('/:comicId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.comicsCollection.id(req.params.comicId).deleteOne();
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/comics`);
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
});

// EDIT
router.get('/:comicId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const comic = currentUser.comicsCollection.id(req.params.comicId);
      res.render('comics/edit.ejs', {
        comic: comic
      });
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
});

router.put('/:comicId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const comic = currentUser.comicsCollection.id(req.params.comicId);
      comic.set(req.body);
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/comics/${req.params.comicId}`);
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
});


module.exports = router;