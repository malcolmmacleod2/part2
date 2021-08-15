import React, { useState, useEffect } from 'react'
import Filter from './filter'
import PersonForm from './personform'
import Persons from './persons'
import personService from './services/persons'
import Notification from './notification'
import Error from './error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification] = useState('')
  const [ error, setError] = useState('')

  const hook = () => {
    console.log('effect')
    personService.getAll()
      .then(returnedPersons => {
        console.log('promise fulfilled')
        setPersons(returnedPersons)
      })
  }

  useEffect(hook, [])

  const handleSave = (event) => {
    event.preventDefault()

    const exists = persons.find(p => p.name === newName)

    if (exists && exists.number !== newNumber) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        exists.number = newNumber

        personService.update(exists.id, exists)
        .then((updated) => {
          setNotification(
          `Person '${updated.name}' has a new number`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          personService.getAll()
          .then(returnedPersons => {
            console.log('promise fulfilled')
            setPersons(returnedPersons)
            setNewName('')
            setNewNumber('')
            })
        })
         .catch(error => {
           setError(
          `Information of ${exists.name} has already been removed from the server`
          )
        })
      }

      return
    }

    if (exists) {
      alert(`${newName} is already added to phonebook`) 

      return
    }

    const person = {
      id: newName,
      name: newName,
      number: newNumber
    }

    personService.create(person)
    .then(returnedPerson => {
      setNotification(
          `Added '${returnedPerson.name}' to phone book`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
      console.log(returnedPerson)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = (person) => {
    
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      console.log("Going to delete person", person.name)
      personService.deletePerson(person.id)
      .then(() => 
      personService.getAll()
      .then(returnedPersons => {
        console.log('promise fulfilled')
        setPersons(returnedPersons)
      })
      )
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = filter.length > 0 ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <h2>add a new</h2>
      <PersonForm name={newName} number={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSave={handleSave} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App