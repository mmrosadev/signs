const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')
const app = express()
const PORT = 3000


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(cors())
app.use(express.json())

const db = new sqlite3.Database('./signs.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message)
    } else {
        console.log('Connected to SQLite database.')
    }
})


db.run(`
  CREATE TABLE IF NOT EXISTS signs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    element TEXT NOT NULL,
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    traits TEXT NOT NULL
  )
`)

app.get('/signs', (req, res) => {
    db.all('SELECT * FROM signs', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(rows)
    })
})

app.get('/signs/:id', (req, res) => {
    db.get('SELECT * FROM signs WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message })
        if (!row) return res.status(404).json({ error: 'Sign not found' })
        res.json(row)
    })
})

app.post('/signs', (req, res) => {
    const { name, element, startDate, endDate, traits } = req.body
    db.run(
        'INSERT INTO signs (name, element, startDate, endDate, traits) VALUES (?, ?, ?, ?, ?)',
        [name, element, startDate, endDate, traits],
        function (err) {
            if (err) return res.status(500).json({ error: err.message })
            res.status(201).json({ id: this.lastID, name, element, startDate, endDate, traits })
        }
    )
})

app.put('/signs/:id', (req, res) => {
    const { name, element, startDate, endDate, traits } = req.body
    db.run(
        'UPDATE signs SET name = ?, element = ?, startDate = ?, endDate = ?, traits = ? WHERE id = ?',
        [name, element, startDate, endDate, traits, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message })
            if (this.changes === 0) return res.status(404).json({ error: 'Sign not found' })
            res.json({ id: req.params.id, name, element, startDate, endDate, traits })
        }
    )
})

app.patch('/signs/:id', (req, res) => {
    const fields = Object.keys(req.body).map(field => `${field} = ?`).join(', ')
    const values = Object.values(req.body)
    values.push(req.params.id)

    db.run(
        `UPDATE signs SET ${fields} WHERE id = ?`,
        values,
        function (err) {
            if (err) return res.status(500).json({ error: err.message })
            if (this.changes === 0) return res.status(404).json({ error: 'Sign not found' })
            res.json({ id: req.params.id, ...req.body })
        }
    )
})

app.delete('/signs/:id', (req, res) => {
    db.run('DELETE FROM signs WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message })
        if (this.changes === 0) return res.status(404).json({ error: 'Sign not found' })
        res.status(204).send()
    })
})

app.listen(PORT, () => {
    console.log(`Signs API running at http://localhost:${PORT}`)
})