const { prisma } = require('../prisma/prisma')


module.exports.addTask = async (req, res) => {
  const { name, isImportant, isUrgent, startDate, comment, projectId } = req.body
  const task = await prisma.task.create({
    data: {
      name,
      isImportant,
      isUrgent,
      startDate: new Date(startDate),
      comment,
      project: { connect: { id: projectId }}
    }
  })
  if(!task) return res.status(404).end()
  else return res.json(task)
}

module.exports.updateTask = async (req, res) => {
  const { id } = req.params
  const { name, isImportant, isUrgent, startDate, necessaryDays, state, blocking, additionnalNeeds, comment } = req.body
  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        name,
        isImportant,
        isUrgent,
        startDate,
        necessaryDays,
        state,
        blocking,
        additionnalNeeds,
        comment
      }
    })
    res.json(task)
  } catch(err) {
    res.json({ error: `La tâche d'ID = ${id} n'existe pas. ` })
  }
}

module.exports.deleteTask = async (req, res) => {
  const { id } = req.params
  const task = await prisma.task.delete({
    where: { id: Number(id) }
  })
  res.json(task)
}
