const PersonForm = function({
  addPerson,
  newName,
  showOnInput,
  newNumber,
  showOnNumber
}) {
  return (
<form onSubmit={addPerson}>
    <div>
        name: <input value={newName} onChange={showOnInput} />    
  </div>
    <div>
        number: <input value={newNumber} onChange={showOnNumber} />
  </div>
      <div>
  <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
