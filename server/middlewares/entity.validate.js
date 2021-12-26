const { body, param } = require('express-validator')


module.exports.addEntityValidator = [
  body('name').exists().withMessage("Veuillez donner un nom à l'entité. ")
              .isLength({min: 3, max: 60}).withMessage("La taille du nom de l'entité doit être comprise entre 3 et 60 caractères")
              .trim()
]

module.exports.updateEntityValidator = [
  param('id').exists(),
  body('name').isLength({min: 3, max: 60}).withMessage("La taille du nom de l'entité doit être comprise entre 3 et 60 caractères")
              .trim()
]

module.exports.deleteEntityValidator = [
  param('id').exists()
]
