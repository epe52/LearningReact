import React from 'react'
import ReactDOM from 'react-dom'
import Note from './component/Note'
import ClickButton from './component/ClickButton'
import Counter from './component/Counter'
import BaseContent from './component/BaseContent'
import Country from './component/Country'
import './index.css'


const App = () => {
  const timeOutC1 = 1000, timeOutC2 = 500;
  return (
    <>
      <BaseContent />
      <Counter timeOut={timeOutC1}/>
      <Counter timeOut={timeOutC2}/>
      <ClickButton />
      <Note />
      <Country />
    </>
  )
}

ReactDOM.render( <App />, document.getElementById('root') )