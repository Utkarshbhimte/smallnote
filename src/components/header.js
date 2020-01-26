import { Link } from "gatsby"
import { useSelector } from "react-redux"
import styled from "styled-components"
import PropTypes from "prop-types"
import React from "react"
import SearchBar from "./SearchBar"
import Hamburger from "./Hamburger"
import ThemeSwitch from "./ThemeSwitch"

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
  }

  .header-grid {
    display: grid;
    grid-template-columns: 10rem 500px 1fr min-content;
    grid-gap: 1rem;
    align-items: center;
    grid-template-areas: "logo  search gap actions";
    padding: 0 2rem;
  }

  .logo-wrap {
    display: flex;
    align-items: center;
    .logo {
      grid-area: logo;
      margin: 0;
      line-height: 2rem;
      font-size: 1rem;
      text-transform: capitalize;
    }
  }
  .action-tabs {
    grid-area: actions;
  }
`

const Logo = () => {
  const { activeTab } = useSelector(state => ({
    activeTab: state.ui.activeTab,
  }))
  return (
    <span className="logo">
      <Link to="/">{activeTab || "SmallNote"}</Link>
    </span>
  )
}

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <div className="header-grid">
      <div className="logo-wrap">
        <Hamburger />
        <Logo />
      </div>
      <SearchBar />
      <div className="action-tabs">
        <ThemeSwitch />
      </div>
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
