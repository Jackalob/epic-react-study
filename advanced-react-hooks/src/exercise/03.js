// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import { CountProvider, useCount } from './count-context'
// 🐨 create your CountContext here with React.createContext


function CountDisplay() {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [,setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
