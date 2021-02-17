import React from 'react'
import ReactDOM from 'react-dom'
import Note from './component/Note'
import ClickButton from './component/ClickButton'
import Counter from './component/Counter'
import BaseContent from './component/BaseContent'
import Country from './component/Country'
import './index.css'


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

const App = () => {
  const timeOutC1 = 1000, timeOutC2 = 500;

  return (
    <>
      <BaseContent course={course} />
      <Counter timeOut={timeOutC1}/>
      <Counter timeOut={timeOutC2}/>
      <ClickButton />
      <Note />
      <Country />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)