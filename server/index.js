const express = require('express')

// config
const PORT = 8080
const app = express()
app.use(express.json())

// routes
app.use('/projects', require('./routes/project.routes'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
