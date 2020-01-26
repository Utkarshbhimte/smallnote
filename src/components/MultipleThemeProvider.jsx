import React from "react"
import { useSelector } from "react-redux"
import { ThemeProvider } from "styled-components"

import { theme } from "./theme"

const MultipleThemeProvider = props => {
  const { selectedTheme } = useSelector(state => ({
    selectedTheme: state.ui.selectedTheme,
  }))
  return (
    <ThemeProvider theme={theme[selectedTheme]}>{props.children}</ThemeProvider>
  )
}

export default MultipleThemeProvider
