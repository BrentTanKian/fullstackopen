import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
  personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
}, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = (id) => {
  personService.removeRecord(id).then(() => {
    setPersons(persons.filter(person => person.id !== id))
  })
}

  const addName = (event) => {
  event.preventDefault()
  const personObject = {
    id: String(persons.length + 1),
    name: newName,
    number: newNumber
  }
  if (persons.some(person => person.name === personObject.name)) {
  alert(`${newName} is already added to phonebook`);
} else {
  personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
  setNotificationMessage(
          `'${personObject.name}' was added`
        )
  setTimeout(() => {
        setNotificationMessage(null)
        }, 5000)
  setNewName('')
  setNewNumber('')
}
}

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage && <Notification message={notificationMessage} />}
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} removeRecord={deletePerson}/>
    </div>
  )
}

export default App