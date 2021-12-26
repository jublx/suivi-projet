const { prisma } = require('../prisma/prisma')


module.exports.getAllProjects = async (req, res) => {
  const projects = await prisma.project.findMany({
    include: {
      tasks: {
        include: {
          responsibles: true,
          comments: true
        }
      }
    }
  })
  return res.json(projects)
}

module.exports.getCurrentProjects = async (req, res) => {
  const projects = await prisma.project.findMany({
    where: {
      isArchived: false
    },
    include: {
      tasks: {
        include: {
          responsibles: true,
          comments: true
        }
      }
    }
  })
  return res.json(projects)
}

module.exports.getArchivedProjects = async (req, res) => {
  const projects = await prisma.project.findMany({
    where: {
      isArchived: true
    },
    include: {
      tasks: {
        include: {
          responsibles: true,
          comments: true
        }
      }
    }
  })
  return res.json(projects)
}

module.exports.getProject = async (req, res) => {
  const project = await prisma.project.findUnique({
    where: {
      id: parseInt(req.params.id)
    },
    include: {
      tasks: {
        include: {
          responsibles: true,
          comments: true
        }
      }
    }
  })
  if(!project) return res.status(404).end()
  else return res.json(project)
}

module.exports.addProject = async (req, res) => {
  const { name } = req.body
  const result = await prisma.project.create({
    data: {
      name
    }
  })
  return res.json(result)
}

module.exports.updateProject = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        name
      },
      include: {
        responsibles: true,
        comments: true
      }
    })
    return res.json(project)
  } catch(err) {
    return res.json({ error: `Le projet d'ID = ${id} n'existe pas. ` })
  }
}

module.exports.archiveProject = async (req, res) => {
  const { id } = req.params
  try {
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        isArchived: true
      }
    })
    return res.json(project)
  } catch(err) {
    return res.json({ error: `Le projet d'ID = ${id} n'existe pas. ` })
  }
}

module.exports.deleteProject = async (req, res) => {
  const { id } = req.params
  const project = await prisma.project.delete({
    where: { id: Number(id) }
  })
  return res.json(project)
}
