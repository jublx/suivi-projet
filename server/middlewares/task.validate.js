const { body, param } = require('express-validator')


module.exports.addTaskValidator = [
  body('name').exists().withMessage("Veuillez donner un nom à votre tâche. ")
              .isLength({min: 3, max: 60}).withMessage("La taille du nom de la tâche doit être comprise entre 3 et 60 caractères")
              .trim(),
  body('isImportant').isBoolean().withMessage("L'attribut 'isImportant' doit être de type booléen. ")
                     .optional(),
  body('isUrgent').isBoolean().withMessage("L'attribut 'isUrgnet' doit être de type booléen. ")
                  .optional(),
  body('startDate').isDate().withMessage("La date n'est pas valide. "),
  body('projectId').exists().withMessage("Erreur : l'ID du projet doit être spécifié. ")
                   .isNumeric()
]

module.exports.updateTaskValidator = [
  param('id').exists(),
  body('name').isLength({min: 3, max: 60}).withMessage("La taille du nom de la tâche doit être comprise entre 3 et 60 caractères")
              .trim(),
  body('isImportant').isBoolean().withMessage("L'attribut 'isImportant' doit être de type booléen. ")
                     .optional(),
  body('isUrgent').isBoolean().withMessage("L'attribut 'isUrgnet' doit être de type booléen. ")
                  .optional(),
  body('startDate').isDate().withMessage("La date n'est pas valide. ")
                   .optional(),
  body('necessaryDays').isInt({min: 0})
                       .optional(),
  body('state').isInt({min: 0, max: 100}).withMessage("L'état d'avancement doit être compris entre 0 et 100. ")
               .optional(),
  body('blocking').isBoolean()
                  .optional(),
  body('additionnalNeeds').isBoolean()
                          .optional()
]

module.exports.addCommentToTaskValidator = [
  body('taskId').exists(),
  body('text').exists()
              .isString()
              .isLength({min: 3, max: 2048})
              .trim()
]

module.exports.deleteTaskValidator = [
  param('id').exists()
]
