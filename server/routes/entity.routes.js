const router = require('express').Router()
const EntityController = require('../controllers/entity.controller')
const validate = require('../middlewares/validator')
const entityValidators = require('../middlewares/entity.validate')


router.get('/', EntityController.getAllEntities)
router.get('/:id', EntityController.getEntity)
router.post('/', validate(entityValidators.addEntityValidator), EntityController.addEntity)
router.put('/:id', validate(entityValidators.updateEntityValidator), EntityController.updateEntity)
router.delete('/:id', validate(entityValidators.deleteEntityValidator), EntityController.deleteEntity)

module.exports = router
