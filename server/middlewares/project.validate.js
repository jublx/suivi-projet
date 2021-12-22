const { body, param } = require('express-validator')


module.exports.addProjectValidator = [
  body('name').exists().withMessage("Veuillez donner un nom à votre projet. ")
              .isLength({min: 3, max: 60}).withMessage("La taille du nom du projet doit être comprise entre 3 et 60 caractères")
              .trim()
]

module.exports.updateProjectValidator = [
  param('id').exists(),
  body('name').isLength({min: 3, max: 60}).withMessage("La taille du nom du projet doit être comprise entre 3 et 60 caractères")
              .trim()
]

module.exports.deleteProjectValidator = [
  param('id').exists()
]
