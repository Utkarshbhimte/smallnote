import styled from "styled-components"

export const IconButton = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  text-align: center;
  padding: 0 !important;
  color: ${props =>
    props.active ? props.theme.primaryText : props.theme.background};
  background-color: ${props =>
    props.active ? props.theme.background : "transparent"};
  display: inline-grid;
  place-items: center;
  will-change: transform, opacity;
  user-select: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 0 1rem;
  border-radius: 0.5rem;

  &:hover,
  &:focus {
    &:not(.active) {
      background-color: #f3f3f3;
    }
  }

  svg {
    margin: 0;
    height: 1rem;
    width: 1rem;
    pointer-events: none;
  }
`
