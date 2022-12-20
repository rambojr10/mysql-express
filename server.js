const express = require('express')
const path = require('path')
const port = 3000
const app = express()
const userRouter = require('./routes/user')
const mainRouter = require('./routes/index')

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(mainRouter)

// middelware validator and user routes
app.use('/user', middelwareForUser)
app.use('/user/:id', middelwareForUser)
app.use(userRouter)

app.listen(port, () => console.log(`Server running on: http://localhost:${port}`))

function middelwareForUser(req, res, next) {
    if (req.method !== 'PUT') {
        next()
    } else {
        const message = `alert('All fields are required')`
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.send(message)
        }
        next()
    }
}