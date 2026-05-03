require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.static('dist'))

app.use(express.json())

const Person = require('./models/person')

const generateId = () => {
  return String(Math.floor(Math.random() * 10000) + 1);
}

app.post('/api/persons', (request, response) => {
  console.log(request.body)
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number || false,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})








// app.use(express.json())

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

// app.get('/api/persons', (request, response) => {
//   response.json(persons)
// })

// app.get('/info', (request, response) => {
//   const length = persons.length
//   const datenow = new Date();
//   response.send(`
//     Phonebook has info for ${length} people\n
//     ${datenow}
//     `)
// })

// app.get('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   const foundPerson = persons.find((person) => person.id === id)

//   if (foundPerson) {
//     response.json(foundPerson)
//   } else {
//     response.status(404).end()
//   }
// })

// const generateId = () => {
//   return String(Math.floor(Math.random() * 10000) + 1);
// }

// app.post('/api/persons', (request, response) => {
//   const body = request.body
//   if (!body.name || !body.number) {
//     return response.status(400).json({
//       error: 'name or number is missing',
//     })
//   }

//   if (persons.find((person) => person.name === body.name)) {
//     return response.status(409).json({
//       error: 'name must be unique',
//     })
//   }

//   const person = {
//     id: generateId(),
//     name: body.name,
//     number: body.number,
//   }

//   persons = persons.concat(person)

//   response.json(person)
// })

// app.delete('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   persons = persons.filter((person) => person.id !== id)

//   response.status(204).end()
// })

// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
