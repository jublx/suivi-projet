const prisma = require('../prisma/prisma')


module.exports.getAllProjects = async (req, res) => {
  const projects = await prisma.project.findMany()
  return res.send(projects)
}

module.exports.getProject = async (req, res) => {
  const project = await prisma.project.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  })
  if(project) return res.send(project)
  else return res.status(404).end()
}

