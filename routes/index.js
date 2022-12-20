const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
    const file = path.resolve(__dirname, '../views/index.html')
    res.sendFile(file)
})

module.exports = router