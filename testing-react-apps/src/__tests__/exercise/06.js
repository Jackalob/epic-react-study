// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 30,
      longitude: 125,
    },
  }

  let setPosition
  function useMockCurrentPosition() {
    const [state, setState] = React.useState([])
    setPosition = setState
    return state
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)
  expect(screen.queryByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setPosition([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays error message when geolocation is not supported', async () => {
  const fakeError = new Error(
    'Geolocation is not supported or permission denied',
  )
  let setPosition

  function useMockCurrentPositionFailed() {
    const [state, setState] = React.useState([])
    setPosition = setState
    return state
  }

  useCurrentPosition.mockImplementation(useMockCurrentPositionFailed)

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setPosition([null, fakeError])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByRole(/alert/i)).toHaveTextContent(fakeError.message)
})

/*
eslint
  no-unused-vars: "off",
*/
