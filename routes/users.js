const express = require("express")
const router = express.Router()
const controller = require('../controllers/users')

router.get('/g', controller.getAll)
router.post('/p', controller.create)
router.get('/g/:userId',controller.getById)
router.patch('/u/:userId', controller.update)
router.delete('/d/:userId', controller.remove)

module.exports = router