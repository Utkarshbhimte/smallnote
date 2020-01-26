import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { setTheme } from "../state/actions/ui.actions"

const ThemeSwitchStyled = styled.label`
  height: 1.2rem;
  width: 2rem;
  position: relative;
  background: ${props => props.theme.secondaryText};
  border-radius: 1rem;
  display: block;
  opacity: 0.6;
  transition: all 0.3s ease-in-out;

  .thumb {
    position: absolute;
    top: -0.1rem;
    background: ${props => props.theme.primaryText};
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 50%;
    transform: ${props =>
      props.checked ? "translateX(1.2rem)" : "translateX(-0.5rem)"};
    transition: all 0.3s ease-in-out;
  }

  input {
    transform: scale(0);
  }

  &:hover,
  &:focus-within {
    opacity: 1;
  }

  > * {
    pointer-events: none;
  }
`

const ThemeSwitch = () => {
  const dispatch = useDispatch()
  const { isDarkMode } = useSelector(state => ({
    isDarkMode: state.ui.selectedTheme === "dark",
  }))

  const toggleTheme = e => {
    const checked = e.target.checked
    dispatch(setTheme({ selectedTheme: checked ? "dark" : "light" }))
  }

  return (
    <ThemeSwitchStyled checked={isDarkMode}>
      <div className="thumb"></div>
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
    </ThemeSwitchStyled>
  )
}

export default ThemeSwitch
