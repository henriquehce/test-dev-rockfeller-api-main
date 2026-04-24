const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3009

app.use(cors())
app.use(express.json())

const initSqlJs = require('sql.js')
const DB_PATH = path.join(__dirname, 'students.db')

let db

initSqlJs().then((SQL) => {
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH)
    db = new SQL.Database(fileBuffer)
  } else {
    db = new SQL.Database()
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      course TEXT NOT NULL
    )
  `)

  const result = db.exec('SELECT COUNT(*) as count FROM students')
  const count = result[0].values[0][0]
  if (count === 0) {
    db.run("INSERT INTO students (name, course) VALUES ('Ana Souza', 'Computer Science')")
    db.run("INSERT INTO students (name, course) VALUES ('Bruno Lima', 'Information Systems')")
    db.run("INSERT INTO students (name, course) VALUES ('Carla Mendes', 'Software Engineering')")
    saveDb()
    console.log('Dados iniciais inseridos no banco.')
  }

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})

function saveDb() {
  const data = db.export()
  fs.writeFileSync(DB_PATH, Buffer.from(data))
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/students', (req, res) => {
  const result = db.exec('SELECT * FROM students')
  if (result.length === 0) return res.json([])
  const { columns, values } = result[0]
  const students = values.map(row =>
    Object.fromEntries(columns.map((col, i) => [col, row[i]]))
  )
  res.json(students)
})

app.post('/students', (req, res) => {
  const { name, course } = req.body
  if (!name || !course) {
    return res.status(400).json({ error: 'Os campos "name" e "course" são obrigatórios.' })
  }
  db.run('INSERT INTO students (name, course) VALUES (?, ?)', [name, course])
  saveDb()
  const result = db.exec('SELECT * FROM students ORDER BY id DESC LIMIT 1')
  const { columns, values } = result[0]
  const newStudent = Object.fromEntries(columns.map((col, i) => [col, values[0][i]]))
  res.status(201).json(newStudent)
})