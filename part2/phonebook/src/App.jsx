import { useState } from 'react'
const ShowNames=function({persons}){
  return(
   <div> {persons.map(person=>
      <p key={person.id}>{person.name} {person.phoneNo}</p>
    )}</div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { id:1 , name: 'Arto Hellas', phoneNo:"040 1234567" }
  ]) 
  const [newName, setNewName] = useState('')
   const [newNumber, setNewNumber] = useState('')
  const addPerson=function(event){
    event.preventDefault();
   const exists = persons.some(
    person => person.name === newName
  )

  if (exists) {
    alert(`${newName} already added to phonebook`)
    return
  }
   const newperson={
      id:persons.length + 1,
      name:newName,
      phoneNo:newNumber
    }
    const holder=[...persons]
    holder.push(newperson)
    setPersons(holder)
    setNewName("")
    setNewNumber("")
  }


  const showOnInput=function(event){
    setNewName(event.target.value)
  }
  const showOnNumber=function(event){
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
    <form onSubmit={addPerson}>
  <div>name: <input value={newName} onChange={showOnInput}/></div>
  <div>number: <input value={newNumber} onChange={showOnNumber
  }/></div>
  <div><button type="submit">add</button></div>
</form>
      
      <h2>Numbers</h2>
      <ShowNames persons={persons}/>
    </div>
  )
}

export default App