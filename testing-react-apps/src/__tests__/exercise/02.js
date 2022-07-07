  // simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import Counter from '../../components/counter'
import { render, fireEvent } from '@testing-library/react'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment

test('counter increments and decrements when the buttons are clicked', () => {
  const { container } = render(<Counter />)
  const [decrement, increment] = container.querySelectorAll('button')
  const message = container.firstChild.querySelector('div')

  expect(message).toHaveTextContent('Current count: 0')

  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  
  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
