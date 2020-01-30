import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { toggleSidebar } from "../state/actions/ui.actions"

const HamburgerStyled = styled.div`
  grid-area: hamburger;
  padding: 0.5rem;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  &:focus,
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.cardBackground};
  }

  .line {
    width: 100%;
    height: 3px;
    background-color: ${props => props.theme.primaryText};
    display: block;
    border-radius: 0.5rem;
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;

    &:first-child {
      transform: ${props =>
        props.active && "scaleX(0.5) rotateZ(-35deg) translate(-9px,-4.5px)"};
    }
    &:last-child {
      transform: ${props =>
        props.active && "scaleX(0.5) rotateZ(35deg) translate(-9px,4.5px)"};
    }
  }
`

const Hamburger = () => {
  const dispatch = useDispatch()
  const { active } = useSelector(state => ({ active: state.ui.sidebar }))

  const handleClick = () => dispatch(toggleSidebar())

  return (
    <HamburgerStyled active={active} role="button" onClick={handleClick}>
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </HamburgerStyled>
  )
}

export default Hamburger
