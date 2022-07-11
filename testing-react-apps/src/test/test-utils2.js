import React from 'react'
import {ThemeProvider} from '../components/theme'
import {render as rtlRender} from '@testing-library/react'

function render(ui, {theme = 'light', ...options} = {}) {
  const Wrapper = ({children}) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

export * from '@testing-library/react'
export {render}
