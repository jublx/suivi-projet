const express = require('express')
const cors = require('cors')

// config
const PORT = 8080
const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use('/teams', require('./routes/team.routes'))
app.use('/projects', require('./routes/project.routes'))
app.use('/tasks', require('./routes/task.routes'))
app.use('/entities', require('./routes/entity.routes'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
