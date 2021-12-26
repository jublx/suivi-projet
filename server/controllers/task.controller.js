const { prisma } = require('../prisma/prisma')
const { connect, param } = require('../routes/project.routes')


module.exports.getAllTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({
    include: {
      responsibles: true,
      comments: true
    }
  })
  return res.json(tasks)
}

module.exports.addTask = async (req, res) => {
  const { name, isImportant, isUrgent, startDate, projectId } = req.body
  const task = await prisma.task.create({
    data: {
      name,
      isImportant,
      isUrgent,
      startDate: new Date(startDate),
      project: { connect: { id: projectId }}
    }
  })
  if(!task) return res.status(404).end()
  else return res.json(task)
}

module.exports.updateTask = async (req, res) => {
  const { id } = req.params
  const { name, isImportant, isUrgent, startDate, necessaryDays, state, blocking, additionnalNeeds } = req.body
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
        additionnalNeeds
      }
    })
    return res.json(task)
  } catch(err) {
    return res.json({ error: `La tâche d'ID = ${id} n'existe pas. ` })
  }
}

module.exports.addCommentToTask = async (req, res) => {
  const { taskId, text } = req.body
  try {
    const task = await prisma.task.update({
      where: { id: Number(taskId) },
      data: {
        comments: {
          create: {
            text: text
          }
        }
      },
      include: {
        responsibles: true,
        comments: true
      }
    })
    return res.json(task)
  } catch(err) {
    return res.json(err)
  }
}

module.exports.deleteCommentFromTask = async (req, res) => {
  const { taskId, commentId } = req.params
  try {
    const task = await prisma.task.update({
      where: { id: Number(taskId) },
      data: {
        comments: {
          delete: {
            id: Number(commentId)
          }
        }
      },
      include: {
        responsibles: true,
        comments: true
      }
    })
    return res.json(task)
  } catch(err) {
    return res.json(err)
  }
}

module.exports.addEntityToTask = async (req, res) => {
  const { taskId, entityId } = req.params
  try {
    const task = await prisma.task.update({
      where: { id: Number(taskId) },
      data: {
        responsibles: {
          connect: { id: Number(entityId) }
        }
      },
      include: {
        responsibles: true,
      }
    })
    return res.json(task)
  } catch(err) {
    return res.json(err)
  }
}

module.exports.removeEntityFromTask = async (req, res) => {
  const { taskId, entityId } = req.params
  try {
    const task = await prisma.task.update({
      where: { id: Number(taskId) },
      data: {
        responsibles: {
          disconnect: { id: Number(entityId) }
        }
      },
      include: {
        responsibles: true
      }
    })
    return res.json(task)
  } catch(err) {
    return res.json(err)
  }
}

module.exports.deleteTask = async (req, res) => {
  const { id } = req.params
  const task = await prisma.task.delete({
    where: { id: Number(id) }
  })
  res.json(task)
}
