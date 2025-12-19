const ShowNames = function({ persons }) {
  return (
    <div>
      {persons.map(person =>
        <p key={person.id}>
   {person.name} {person.phoneNo}
        </p>
      )}
    </div>
  )
}

export default ShowNames
