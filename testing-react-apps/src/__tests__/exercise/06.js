// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import Location from '../../examples/location'

window.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
}

function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 30,
      longitude: 125,
    },
  }

  const {promise, resolve} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(cb => {
    promise.then(() => cb(fakePosition))
  })

  render(<Location />)
  // await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.queryByLabelText(/loading/i)).toBeInTheDocument()

  await act(async () => {
    resolve()
    await promise
  })

  screen.debug()

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

/*
eslint
  no-unused-vars: "off",
*/
