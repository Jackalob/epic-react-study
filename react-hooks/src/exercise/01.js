// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({ initialName = '', className }) {
  const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  function handleClick(e) {
    e.preventDefault()
    setName('')
  }

  return (
    <div className={className}>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
        <button onClick={handleClick}>Clean Input</button>
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting className="coo" initialName='George'  />
}

export default App
