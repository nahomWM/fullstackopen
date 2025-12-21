import { useState, useEffect } from 'react'
import ShowNames from './components/ShowNames'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import phoneService from './services/phonebooks'
const App = () => {
const [persons, setPersons] = useState([ ])
useEffect(() => {
   phoneService.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
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
   
     name: newName,
    number: newNumber,
     id: persons.length + 1,
    }
  phoneService.create(newperson).then((response)=>  { setPersons(persons.concat(response))
    setNewName('')
    setNewNumber('')
  })}
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
