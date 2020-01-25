import React from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import CloseIcon from "../images/close.svg"
import {
  updateSearchTerm,
  resetSearchTerm,
} from "../state/actions/search.actions"

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
    right: -1.5rem;
    transform: translateY(-50%);
    will-change: transform, opacity;
    transition: all 0.3s ease-out;
    display: flex;
    align-items: center;

    cursor: pointer;
    padding: 0.5rem;

    svg {
      height: 1rem;
      width: 1rem;
      pointer-events: none;
    }

    &.show {
      opacity: 0.5;
      transform: translateY(-50%) translateX(-2rem);
      color: ${props => props.theme.primaryText};

      &:hover {
        opacity: 1;
      }
    }
  }
`

const SearchBar = () => {
  const dispatch = useDispatch()

  const { searchTerm } = useSelector(state => ({
    searchTerm: state.search.searchTerm,
  }))

  const handleChange = event => {
    const searchTerm = event.target.value
    dispatch(updateSearchTerm({ searchTerm }))
  }

  const resetSearch = () => {
    dispatch(resetSearchTerm())
  }

  return (
    <SearchBarStyled>
      <input
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <div
        className={`close-btn ${!!searchTerm.length ? "show" : ""}`}
        onClick={resetSearch}
      >
        <CloseIcon />
      </div>
    </SearchBarStyled>
  )
}

export default SearchBar
