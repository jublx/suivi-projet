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
  body('comment').isString()
                 .isLength({min: 3, max: 2048}).withMessage("La taille du commentaire ne doit pas dépasser 2048 caractères")
                 .optional(),
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
                          .optional(),
  body('comment').isString()
                 .isLength({min: 3, max: 2048}).withMessage("La taille du commentaire ne doit pas dépasser 2048 caractères")
                 .optional(),
]

module.exports.deleteTaskValidator = [
  param('id').exists()
]
