// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
const ToggleContext = React.createContext()
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

ToggleContext.displayName = 'ToggleContext'

function Toggle(props) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return <ToggleContext.Provider {...props} value={{on, toggle}} />
}

function useToggle() {
  const context = React.useContext(ToggleContext)
  if (context === undefined)
    throw new Error('useToggle must be used within a <Toggle />')
  return context
}

// 📜 https://reactjs.org/docs/hooks-reference.html#usecontext
function ToggleOn({children}) {
  const {on} = useToggle()
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  const {on} = useToggle()
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton(props) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

// const App = () => <ToggleButton />
function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
