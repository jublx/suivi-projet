const { body } = require('express-validator')


module.exports.addTeamValidator = [
  body('name').exists().withMessage("Veuillez donner un nom à votre tâche. ")
              .isLength({min: 3, max: 60}).withMessage("La taille du nom de la tâche doit être comprise entre 3 et 60 caractères")
              .trim(),
  body('color').exists().withMessage("Veuillez spécifiez la couleur de votre nouvelle équipe. ")
               .trim()
               .isIn(["red",
                      "orange", 
                      "amber", 
                      "yellow", 
                      "lime",
                      "green",
                      "emerald",
                      "teal",
                      "cyan",
                      "sky",
                      "blue",
                      "indigo",
                      "violet",
                      "purple",
                      "fuchsia",
                      "pink",
                      "rose"]).withMessage("La couleur n'est pas valide. ")
]

module.exports.updateTeamValidator = [
  body('name').isLength({min: 3, max: 60}).withMessage("La taille du nom de la tâche doit être comprise entre 3 et 60 caractères")
              .trim()
              .optional(),
  body('color').trim()
               .isIn(["red",
                      "orange", 
                      "amber", 
                      "yellow", 
                      "lime",
                      "green",
                      "emerald",
                      "teal",
                      "cyan",
                      "sky",
                      "blue",
                      "indigo",
                      "violet",
                      "purple",
                      "fuchsia",
                      "pink",
                      "rose"]).withMessage("La couleur n'est pas valide. ")
               .optional()
]
