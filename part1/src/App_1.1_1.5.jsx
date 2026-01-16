const Header = ({ course }) => {
  return (
    <div>
      <h1>
        {course.name}
      </h1>
    </div>
  )
}

const Part = ({ name, exercise }) => {
  return (
    <div>
      <p>
        {name} {exercise}
      </p>
    </div>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <Part name={course.parts[0].name} exercise={course.parts[0].exercises}/>
      <Part name={course.parts[1].name} exercise={course.parts[1].exercises}/>
      <Part name={course.parts[2].name} exercise={course.parts[2].exercises}/>
    </div>
  )
}

const Total = ({ course }) => {
  const totalExercises = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}

const App = () => {
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
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
