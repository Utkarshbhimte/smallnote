import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ThemeProvider } from "styled-components"

import { theme } from "./theme"
import { setTheme } from "../state/actions/ui.actions"
import { getPreferredTheme, getWindow } from "../utils"

const MultipleThemeProvider = props => {
  const dispatch = useDispatch()
  const { selectedTheme } = useSelector(state => ({
    selectedTheme: state.ui.selectedTheme,
  }))

  //  fix for ssr theme bug
  useEffect(() => {
    const defaultSelectedTheme =
      getWindow() && getWindow().localStorage.getItem("selectedTheme")

    if (!defaultSelectedTheme) {
      dispatch(setTheme({ selectedTheme: getPreferredTheme() }))
    }
  }, [dispatch])

  return (
    <ThemeProvider theme={theme[selectedTheme]}>{props.children}</ThemeProvider>
  )
}

export default MultipleThemeProvider
