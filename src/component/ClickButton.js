import React, { useState } from 'react'

// Button with click function and text
const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const DisplayElementValue = ({value, element}) => (
  <div>Value for {element}: {value}</div>
)

const History = ({allClicks, clicksObject}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        You have not pressed any buttons yet
      </div>
    )
  }
  return (
    <div>
      <p>Click history of button presses ({allClicks.length} total): {allClicks.join(' ')}</p>
      <p>Total clicks of plus: {clicksObject.plus}</p>
      <p>Total clicks of minus: {clicksObject.minus}</p>
      <p>Total clicks of reset: {clicksObject.zero}</p>
    </div>
  )
}

// Mouse event with state hook
const ClickButton = () => {
  const [counter, setCounter] = useState(0)
  const [allClicks, setAll] = useState([])
  // https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus#monimutkaisempi-tila
  const [clicksObject, setClicks] = useState({
    plus: 0, minus: 0, zero: 0
  })

  // Function returning a function
  // Add to total button clicks and change value based on button type
  // https://fullstackopen.com/osa1/monimutkaisempi_tila_reactin_debuggaus#ehdollinen-renderointi
  const changeValue = (newValue, buttonType) => () => {
    setAll(allClicks.concat(buttonType))
    setCounter(newValue)
    // Only change the value of the one that was clicked
    let newClicks = {}
    if(buttonType === 'P')
      newClicks = {...clicksObject, plus: clicksObject.plus + 1}
    else if (buttonType === 'M')
      newClicks = {...clicksObject, minus: clicksObject.minus + 1}
    else
      newClicks = {...clicksObject, zero: clicksObject.zero + 1}
    setClicks(newClicks)
  }

  return (
    <div>
      <DisplayElementValue value={counter} element='button clicks' />
      <Button handleClick={changeValue(counter + 1, 'P')} text='Plus' />
      <Button handleClick={changeValue(counter - 1, 'M')} text='Minus' />
      <Button handleClick={changeValue(0, 'R')} text='Reset' />
      <History allClicks={allClicks} clicksObject={clicksObject}/>
    </div>
  )
}

export default ClickButton