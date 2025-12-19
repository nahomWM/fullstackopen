const Filter = function({ filter, addToFilter }) {
  return (
<div>
filter shown with 
<input value={filter} onChange={addToFilter} />
</div>
  )
}

export default Filter
