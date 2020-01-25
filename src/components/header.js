import { Link } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"
import React from "react"
import SearchBar from "./SearchBar"

const StyledHeader = styled.header`
  padding: 1rem 0;
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.background};
  z-index: 9;

  a {
    text-decoration: none;
    color: ${props => props.theme.primaryText};
    font-size: 1.3rem;
  }

  .header-grid {
    display: grid;
    grid-template-columns: min-content 2rem 500px 1fr min-content;
    grid-gap: 1rem;
    grid-template-areas: "logo gap1 search gap actions";
    padding: 0 2rem;
  }

  .logo {
    grid-area: logo;
    margin: 0;
  }
  .action-tabs {
    grid-area: actions;
  }
`

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <div className="header-grid">
      <h1 className="logo">
        <Link to="/">SmallNote</Link>
      </h1>
      <SearchBar />
      <div className="action-tabs"></div>
    </div>
  </StyledHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
