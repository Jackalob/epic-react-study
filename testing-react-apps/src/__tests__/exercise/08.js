// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {renderHook, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count ', async () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 5}})

  expect(result.current.count).toBe(5)
  act(() => result.current.increment())
  expect(result.current.count).toBe(6)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(5)
})

test('allows customization of the step ', async () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 3}})

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

/* eslint no-unused-vars:0 */
