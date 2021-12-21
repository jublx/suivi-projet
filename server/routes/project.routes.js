const router = require('express').Router()
const { application } = require('express')
const ProjectController = require('../controllers/project.controller')


router.get('/', ProjectController.getAllProjects)
router.get('/:id', ProjectController.getProject)

module.exports = router
