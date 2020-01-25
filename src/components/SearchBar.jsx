import React from "react"
import styled from "styled-components"

import CloseIcon from "../images/close.svg"

const SearchBarStyled = styled.label`
  grid-area: search;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 0 1rem;
  position: relative;
  opacity: 0.6;
  will-change: opacity;
  transition: all 0.3s ease-out;

  &:focus-within {
    opacity: 1;

    .close-btn {
      opacity: 1;
      transform: translateY(-50%) translateX(-2rem);
      color: ${props => props.theme.primaryText};
    }
  }

  input {
    border: none;
    height: 45px;
    width: 100%;
    display: block;
    outline: none;
  }

  .close-btn {
    position: absolute;
    top: 50%;
    opacity: 0;
    right: -1rem;
    transform: translateY(-50%);
    will-change: transform, opacity;
    transition: all 0.3s ease-out;
    height: 1rem;
    width: 1rem;
  }
`

const SearchBar = () => {
  return (
    <SearchBarStyled>
      <input type="search" placeholder="Search" />
      <CloseIcon className="close-btn" />
    </SearchBarStyled>
  )
}

export default SearchBar
