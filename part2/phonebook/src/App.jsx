import { useState } from 'react'

import ShowNames from './components/ShowNames'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
const [persons, setPersons] = useState([
  { id: 1, name: 'Arto Hellas', phoneNo: '040-123456' },
{ id: 2, name: 'Ada Lovelace', phoneNo: '39-44-5323523' },
   { id: 3, name: 'Dan Abramov', phoneNo: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', phoneNo: '39-23-6423122' }
  ])

const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

const addPerson = function(event) {
    event.preventDefault()
 const exists = persons.some(
   person => person.name === newName
    )
if (exists) {
  alert(`${newName} already added to phonebook`)
  return
    }
const newperson = {
    id: persons.length + 1,
     name: newName,
    phoneNo: newNumber
    }
  const holder = [...persons]
    holder.push(newperson)
    setPersons(holder)
    setNewName('')
    setNewNumber('')
  }
const showOnInput = function(event) {
    setNewName(event.target.value)
  }
const showOnNumber = function(event) {
    setNewNumber(event.target.value)
  }
const addToFilter = function(event) {
    setFilter(event.target.value)
  }
const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )
  return (
  <div>
     <h2>Phonebook</h2>
   <Filter filter={filter} addToFilter={addToFilter} />

   <h2>Add a new</h2>

  <PersonForm
     addPerson={addPerson}
    newName={newName}
    showOnInput={showOnInput}
    newNumber={newNumber}
    showOnNumber={showOnNumber}
      />

   <h2>Numbers</h2>

      <ShowNames persons={personsToShow} />
    </div>
  )
}

export default App
