import React, { useState } from 'react'

// Counter with state hook
const Counter = ({timeOut}) => {
  const [counter, setCounter] = useState(0)
  setTimeout(
    () => setCounter(counter + 1),
    timeOut
  )
  return (
    <div>
      <p>Counting with a timeout of {timeOut} ms: {counter}</p>
    </div>
  )
}

export default Counter