const router = require('express').Router()
const TaskController = require('../controllers/task.controller')
const validate = require('../middlewares/validator')
const taskValidators = require('../middlewares/task.validate')


router.get('/', TaskController.getAllTasks)
router.post('', validate(taskValidators.addTaskValidator), TaskController.addTask)
router.post('/comment', validate(taskValidators.addCommentToTaskValidator), TaskController.addCommentToTask)
router.delete('/comment/:taskId/:commentId', TaskController.deleteCommentFromTask)
router.put('/:id', validate(taskValidators.updateTaskValidator), TaskController.updateTask)
router.get('/link/:taskId/:entityId', TaskController.addEntityToTask)
router.get('/unlink/:taskId/:entityId', TaskController.removeEntityFromTask)
router.delete('/:id', validate(taskValidators.deleteTaskValidator), TaskController.deleteTask)

module.exports = router
