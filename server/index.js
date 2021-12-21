const express = require('express')

const PORT = 8080

const app = express()

// routes
app.use('/projects', require('./routes/project.routes'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
