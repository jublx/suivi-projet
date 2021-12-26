const { prisma } = require('../prisma/prisma')


module.exports.getAllEntities = async (req, res) => {
  const entities = await prisma.entity.findMany({
    include: {
      tasks: true
    }
  })
  return res.json(entities)
}

module.exports.getEntity = async (req, res) => {
  const entity = await prisma.entity.findUnique({
    where: { 
      id: parseInt(req.params.id)
    },
    include: {
      tasks: true
    }
  })
  if(!entity) return res.status(404).end()
  else return res.json(entity)
}

module.exports.addEntity = async (req, res) => {
  const { name } = req.body
  const entity = await prisma.entity.create({
    data: {
      name
    }
  })
  if(!entity) return res.status(404).end()
  else return res.json(entity)
}

module.exports.updateEntity = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const entity = await prisma.entity.update({
      where: { id: Number(id) },
      data: {
        name
      },
      include: {
        tasks: true
      }
    })
    res.json(entity)
  } catch(err) {
    res.json({ error: `Le projet d'ID = ${id} n'existe pas. ` })
  }
}

module.exports.deleteEntity = async (req, res) => {
  const { id } = req.params
  const entity = await prisma.entity.delete({
    where: { id: Number(id) }
  })
  res.json(entity)
}
