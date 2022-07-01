// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return React.Children.map(children, child => {
    if (!allowedTypes.includes(child.type)) return child
    // if (typeof child.type === 'string') return child
    const newChild = React.cloneElement(child, {on, toggle})
    return newChild
  })
}

const ToggleOn = ({on, children}) => (on ? children : null)
const ToggleOff = ({on, children}) => (on ? null : children)
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />
const MyToggleText = ({ on }) => <div>{on ? 'yes yes yes': 'oh boy...'}</div>

const allowedTypes = [ToggleOn, ToggleOff, ToggleButton]

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>123</div>
        <ToggleButton />
        <MyToggleText />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
