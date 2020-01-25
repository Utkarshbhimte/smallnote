import React, { useState } from "react"
import { useDispatch } from "react-redux"
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
  margin-right: 0.6rem;

  &:focus,
  &:hover {
    cursor: pointer;
    background: #ffffffba;
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
  }
`

const Hamburger = () => {
  const dispatch = useDispatch()

  const handleClick = () => dispatch(toggleSidebar())

  return (
    <HamburgerStyled role="button" onClick={handleClick}>
      <span className="line"></span>
      <span className="line"></span>
      <span className="line"></span>
    </HamburgerStyled>
  )
}

export default Hamburger
