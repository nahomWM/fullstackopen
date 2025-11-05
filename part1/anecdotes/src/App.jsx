import { useState } from 'react'
function Button({onclick, text
  
}){
  
return(
  <>
  <button onClick={onclick}>{text}</button>

  </>
)}
function Mostvote({votedAnecdotes, vote}){
 return(<><h2>{votedAnecdotes}</h2>
 <p>has {vote} votes</p></> )
}

const App = () => {
  function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes]=useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  function buttonClick(){
    const randInt=getRandomNumber(0, anecdotes.length-1);
    setSelected(randInt)
  
  }
  function voteClick(){
    const newVote=[...votes];
     newVote[selected]=newVote[selected]+1;
     setVotes(newVote)
 
  }
const maxValue=Math.max(...votes)
const indexOfMax=votes.indexOf(maxValue)
  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <h2>{anecdotes[selected]}</h2>  
      <p>has {votes[selected]} votes</p> 
    <Button onclick={buttonClick} text="next anecdotes" />
     <Button onclick={voteClick} text="vote"/>
     <h1>Anecdotes with most votes</h1>
     <Mostvote votedAnecdotes={anecdotes[indexOfMax]} vote={maxValue}/>
     </div>
  )
}

export default App