const { prisma } = require('../prisma/prisma')


module.exports.getAllTeams = async (req, res) => {
  const teams = await prisma.team.findMany()
  return res.json(teams)
}

module.exports.getTeam = async (req, res) => {
  const team = await prisma.team.findUnique({
    where: {
      id: parseInt(req.params.id)
    },
    include: {
      projects: {
        include: {
          tasks: true
        }
      }
    }
  })
  if(!team) return res.status(404).end()
  else return res.json(team)
}

module.exports.addTeam = async (req, res) => {
  const { name, color } = req.body
  const team = await prisma.team.create({
    data: {
      name,
      color
    }
  })
  return res.json(team)
}

module.exports.updateTeam = async (req, res) => {
  const { id } = req.params
  const { name, color } = req.body
  try {
    const team = await prisma.team.update({
      where: { id: Number(id) },
      data: {
        name,
        color
      }
    })
    return res.json(team)
  } catch(err) {
    return res.status(400).json(err)
  }
}

module.exports.deleteTeam = async (req, res) => {
  const { id } = req.params
  const team = prisma.team.delete({
    where: { id: Number(id) }
  })
  return res.json(team)
}
