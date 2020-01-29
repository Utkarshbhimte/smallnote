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
    /* align-items: center; */
    justify-content: space-between;
    display: grid;
    grid-template-columns: 9rem 1fr min-content;
    grid-gap: 1rem;
    grid-template-areas: "leftSide main rightSide";

    @media (max-width: 600px) {
      grid-gap: 1rem;
      grid-template-columns: 3rem 1fr min-content;
    }
  }

  .logo-wrap {
    display: flex;
    align-items: center;
    grid-area: leftSide;
    padding-left: 1rem;

    @media (max-width: 600px) {
      .logo {
        display: none;
      }
    }

    .logo {
      margin: 0;
      line-height: 2rem;
      margin-left: 0.6rem;
      font-size: 1rem;
      text-transform: capitalize;
    }
  }
  .center-wrapper {
    grid-area: main;
    display: grid;
    grid-template-columns: 1fr;
  }

  .search-wrapper {
    grid-area: main;
    display: flex;
    align-items: center;
  }

  .action-tabs {
    grid-area: rightSide;
    padding-right: 2rem;

    @media (max-width: 600px) {
      padding-right: 1rem;
    }
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
      <div className="search-wrapper">
        <SearchBar />
      </div>
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
