const express = require('express')
const userRouter = express.Router()
const connection = require('../src/database')

// configs - allow find values in statement ":id"
connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

// Get all users
userRouter.get('/users', (req, res) => {
    // Get data from database
    const query = `SELECT * FROM tblusuarios`
    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({ error })
        }
        res.status(200).json(result)
    })
})

// Get a especified user
userRouter.get('/user/:id', (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM tblusuarios WHERE PKId = :id`
    connection.query(query, {id}, (error, result) => {
        if (error) {
            res.status(500).json({ error })
        }
        res.json(result).status(200)
    })
})

// Add new user
userRouter.post('/user', (req, res) => {
    const { name, email, password } = req.body
    // Add data to database
    const query = `INSERT INTO tblusuarios (name, email, password) VALUES (?,?,?)`
    connection.query(query, [name, email, password], (error, result) => {
        if (error) throw error
        console.log(`User successfully added: ${JSON.stringify({ result })}`)

        // Response to client
        res.send({
            status: 'success',
            id: result.insertId
        })
    })
})

// Update a user
userRouter.put('/user/:id', (req, res) => {
    const { name, email, password } = req.body
    const id = req.params.id

    const query = `UPDATE tblusuarios SET name = ?, email = ?, password = ? WHERE PKId = ?`
    connection.query(query, [name, email, password, id], (error, result) => {
        if (error) throw error
        console.log(`User updated successfully: ${JSON.stringify({ result })}`)
        res.send({
            status: 'success',
            changedRows: result.changedRows,
            info: result.info
        })
    })
})

// Delete a user
userRouter.delete('/user/:id', (req, res) => {
    const id = req.params.id
    const query = `DELETE FROM tblusuarios WHERE tblusuarios.PKId = :id`
    connection.query(query, {id}, (error, result) => {
        if (error) throw error
        console.log(`User successfully deleted: ${JSON.stringify({result})}`)

        res.send({
            status: 'success',
            affectedRows: result.affectedRows
        })
    })
})

module.exports = userRouter