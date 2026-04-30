const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://user:${password}@cluster0.uwld1hf.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const generateId = () => {
  return String(Math.floor(Math.random() * 10000) + 1);
}

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: Number 
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})
} else {
    const person = new Person({
  id: generateId(),
  name: process.argv[3],
  number: process.argv[4],
})
    person.save().then(result => {
  console.log(`added ${person.name} number ${person.number} to phonebook`)
  mongoose.connection.close()
})
}

