const express = require('express');
const router = express.Router();
const users = require("../models/User");

/* GET home page */
router.get('/', (req, res, next) => {
  users.find()
    .then((usersFound) => {
      res.render('users/index', { usersFound })
    })
});

router.get('/:id', (req, res, next) => {
  users.findOne({ _id: req.params.id })
    .then((userFound) => {
      res.render('users/show', userFound)
    })
    .catch(() => {
      next()
    })

});

// router.get('/:id/edit', (req, res, next) => {
//   res.render('users/edit',user)
// });

router.post('/:id', (req, res, next) => {
  users.updateOne(
    {_id: req.body.id},
    {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      }
    )
    .then(()=>{
      res.redirect('/users')
    })

})

router.post('/:id/edit', (req, res, next) => {
  users.findOne({ _id: req.body.id })
    .then((user) => {
      res.render('users/edit', user)
    })
    .catch(() => {
      next()
    })
});

router.post('/:id/delete', (req, res, next) => {
  users.findByIdAndRemove(req.body.id)
    .then(() => {
      res.redirect('/users')
    })
    .catch(() => {
      next()
    })
});


router.get('/new', (req, res, next) => {
  res.render('users/new')

});

router.post('/', (req, res, next) => {
  users.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  })
    .then(() => {
      res.redirect('/users')
    })
});

module.exports = router;