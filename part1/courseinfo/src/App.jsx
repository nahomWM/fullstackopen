export default function App() {
const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}
      />
    </>
  );
}
function Header(props) {
  return <h1>{props.course}</h1>;
}
function Content({parts}) {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </div>
  );
}
function Total({parts}) {
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
}
function Part({part}) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
}
