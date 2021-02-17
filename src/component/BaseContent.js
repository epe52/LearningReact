import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Header = (props) =>  (
    <h1>{props.course.name}</h1>
)
  
const Content = (props) => {
  const parts = props.course.parts
  return (
    <> {parts?.map(part => (<p key={part.name}>{part.name} {part.exercises}</p>))} </>
  )
}
  
const Total = (props) => {
  // Destructuring
  const parts = props.course.parts

  // Help function that doesn't need parameters for props. Written in compact form with no "{}"
  const testHelpFunction = () =>
  `The year now is ${new Date().getFullYear()} and part "${parts[0].name}" has ${parts[0].exercises} exercises`

  // Total with reduce in an object array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#sum_of_values_in_an_object_array
  const total = parts?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 0
  )

  return (
    <>
      <p>Total number of exercises on the courses is {total}</p>
      <p>{testHelpFunction()}</p>
    </>
  )
}

const BaseContent = () => {

  const [courseD, setCourseD] = useState([])

  // Get notes from db
  useEffect(() => {
    axios
      .get('http://localhost:3001/course')
      .then(response => {
        console.log('promise fulfilled', response.data)
        setCourseD(response.data)
      })
  }, [])
  //console.log('render GEGE', courseD)

  // Return only after useEffect is done with use of !!courseD[0]
  return(
    <>{!!courseD[0] &&
      <div>
        <Header course={courseD[0]} />
        <Content course={courseD[1]} />
        <Total course={courseD[1]} />
      </div>
    }</>
  )
}

export default BaseContent