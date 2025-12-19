import { useState } from 'react'
const ShowNames=function({persons}){
  return(
   <div> {persons.map(person=>
      <p key={person.id}>{person.name}</p>
    )}</div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { id:1 , name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const addNAme=function(event){
   event.preventDefault();
   const newperson={
      id:persons.length + 1,
      name:newName
    }
    const holder=[...persons]
    holder.push(newperson)
    setPersons(holder)
    
  }


  const showOnInput=function(event){
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNAme}>
        <div>
          name: <input value={newName} onChange={showOnInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowNames persons={persons}/>
    </div>
  )
}

export default App