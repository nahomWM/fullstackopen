import { useState } from "react";
function Statistics(props){
  if(!props.good && !props.neutral && !props.bad){
return (
  <>
  <Titlename title={props.title}/>
  <h2>No Feedback Given</h2>
  </>
)
  }
return(<>
<Titlename title={props.title}/>
<table>
  <tbody>
<StatsticsLine name="good" value={props.good}/>
<StatsticsLine name="neutral" value={props.neutral}/>
<StatsticsLine name="bad" value={props.bad}/>
<StatsticsLine name="total"value={props.total}/>
<StatsticsLine name="average" value={props.average}/>
<StatsticsLine name="Positive" value={props.positive}/>
</tbody>
</table></>)
}
 function App(){
  const header="Give feedback";
  const [good, setGood]=useState(0);
  const [neutral,setNeurtal]=useState(0);
  const [bad,setBad]=useState(0);
  const title="Statistics";
  
  function goodCounter(){
     setGood(good+1);
 
  }
  function neutralCounter(){
     setNeurtal(neutral+1);
     
  }
    function badCounter(){
     setBad(bad+1);
     
  }

const total=good+neutral+bad;
const average= total === 0 ? 0 : (good - bad) / total;
const positive=total === 0 ? 0 : (good*100)/total

  return(<>
  <Header header={header}/>
  <Button onclick={goodCounter} text="Good" />
  <Button onclick={neutralCounter} text="Neutral" />
  <Button onclick={badCounter} text="Bad" />
  <Statistics title={title} good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
</>)

  
}
function Header({header}){
  return <h1>{header}</h1>
}
function Button({onclick,text}){
  return(
    <div>
      <button onClick={onclick}>{text}</button>
    </div>
  )

}
function Titlename({title}){
  return( <h1>{title}</h1>)
}
function StatsticsLine({name,value}){
  return(
    <tr>
    <td>{name}</td>
    <td>{value}</td>
    </tr>
 )
}


export default App;