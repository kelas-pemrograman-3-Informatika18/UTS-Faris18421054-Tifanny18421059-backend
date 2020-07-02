const router = require('express').Router()
const userController = require('../controller/User')

router.post('/register', (req,res) => {
  userController.register(req.body)
  .then(result => {
    res.json(result)
  }).catch((err) => {
    res.json(err)
  })
})

router.post('/login', (req, res) => {
  userController.login(req.body)
  .then(result => res.json(result))
  .catch((err) => res.json(err))
})

router.get('/tampil', (req, res) => {
  userController.tampilUser()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.put('/edit/:id', (req, res) => {
  userController.editUser(req.body, req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/tampilsatu/:id', (req, res) => {
  userController.tampilUserOne(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.delete('/hapus/:id', (req, res) => {
  userController.hapusData(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

module.exports = router