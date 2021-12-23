const router = require('express').Router()
const TaskController = require('../controllers/task.controller')
const validate = require('../middlewares/validator')
const TaskValidators = require('../middlewares/task.validate')


router.post('', validate(TaskValidators.addTaskValidator), TaskController.addTask)
router.put('/:id', validate(TaskValidators.updateTaskValidator), TaskController.updateTask)
router.delete('/:id', validate(TaskValidators.deleteTaskValidator), TaskController.deleteTask)

module.exports = router
