const Courses = ({ courses }) => {
    return <div>
    {courses.map(course =>
      <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={
          course.parts.reduce((sum, part) => sum + part.exercises, 0)
        }
      />
    </div>
        )}
    </div>
}

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map(part =>
          <Part key={part.id} part={part} /> 
        )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>Total of {props.total} exercises</p>

export default Courses