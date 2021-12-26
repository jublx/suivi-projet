const router = require('express').Router()
const ProjectController = require('../controllers/project.controller')
const validate = require('../middlewares/validator')
const projectValidators = require('../middlewares/project.validate')



router.get('/', ProjectController.getAllProjects)
router.get('/current', ProjectController.getCurrentProjects)
router.get('/archived', ProjectController.getArchivedProjects)
router.get('/:id', ProjectController.getProject)
router.get('/archive/:id', ProjectController.archiveProject)
router.post('/', validate(projectValidators.addProjectValidator), ProjectController.addProject)
router.put('/:id', validate(projectValidators.updateProjectValidator), ProjectController.updateProject)
router.delete('/:id', validate(projectValidators.deleteProjectValidator), ProjectController.deleteProject)

module.exports = router
