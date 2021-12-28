const router = require('express').Router()
const TeamController = require('../controllers/team.controller')
const validate = require('../middlewares/validator')
const teamValidators = require('../middlewares/team.validate')


router.get('', TeamController.getAllTeams)
router.get('/:id', TeamController.getTeam)
router.post('', validate(teamValidators.addTeamValidator), TeamController.addTeam)
router.put('/:id', validate(teamValidators.updateTeamValidator), TeamController.updateTeam)
router.delete('/:id', TeamController.deleteTeam)

module.exports = router
