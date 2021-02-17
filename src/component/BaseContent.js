import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Header = (props) =>  {
  console.log('ffffrfr', props);
  return(
    <h1>{props.course.name}</h1>
  )
}
  
const Content = (props) => {
  console.log(props.course.name)
  const parts = props.course.parts
  console.log('Parts', props);
  return (
    <>
      {parts?.map(part => (<p key={part.name}>{part.name} {part.exercises}</p>))}
    </>
  )
}
  
const Total = (props) => {
  // Destructuring
  const {name, parts} = props.course

  console.log('ff', props.course);

  if (!!props.course)
    return null

  // Help function that doesn't need parameters for props. Written in compact form with no "{}"
  const testHelpFunction = () =>
  `The year now is ${new Date().getFullYear()} and part "${parts[0].name}" has ${parts[0].exercises} exercises`

  // Total with reduce in an object array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#sum_of_values_in_an_object_array
  const total = parts?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  )

  return (
    <>
      <p>Number of exercises {total} on the course "{name}"</p>
      <p>{testHelpFunction()}</p>
    </>
  )
}

const BaseContent = ({course}) => {

  const [courseD, setCourseD] = useState([])

  // Get notes from db
  useEffect(() => {
    axios
      .get('http://localhost:3001/course')
      .then(response => {
        console.log('promise fulfilled')
        setCourseD(response.data[1].parts)
      })
  }, [])
  console.log('render GEGE', courseD)
  // How to return only after useEffect is done?

  return(
    <>{courseD &&
      <div>
        <Header course={courseD} />
        <Content course={courseD} />
        <Total course={courseD} />
      </div>
    }</>
  )
}

export default BaseContent