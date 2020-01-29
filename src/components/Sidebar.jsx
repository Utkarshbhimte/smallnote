import React from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import {
  updateActiveTab,
  resetActiveTab,
  closeSidebar,
} from "../state/actions/ui.actions"
import { getWindow } from "../utils"

import CloseIcon from "../images/close.svg"

const SidebarStyled = styled.div`
  position: fixed;
  top: 6rem;
  left: 0;
  transition: all 0.3s ease-in-out;
  transform: ${props => (props.active ? "translateX(0)" : "translateX(-100%)")};
  width: 9rem;
  height: 100vh;
  z-index: 10;

  @media (max-width: 600px) {
    width: 100vw;
    background: ${props => props.theme.background};
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    color: ${props => props.theme.primaryText};

    &:hover {
      color: ${props => props.theme.secondaryText};
    }

    @media (max-width: 600px) {
      padding-right: 1rem;
    }

    li {
      user-select: none;
      padding: 0.3rem 1.5rem;
      border-radius: 0 0.5rem 0.5rem 0;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      text-transform: capitalize;
      position: relative;

      @media (max-width: 600px) {
        padding: 1rem 1.5rem;
        max-width: 300px;
      }

      .close-btn {
        position: absolute;
        top: 50%;
        right: 0.25rem;
        transform: translateY(-50%);

        outline: none;
        border: none;
        background: transparent;
        display: flex;

        svg {
          height: 0.8rem;
          color: ${props => props.theme.background};
          width: 0.8rem;
        }
      }

      &.active {
        color: ${props => props.theme.background};
        background-color: ${props => props.theme.primaryText};
      }

      &:hover {
        &:not(.active) {
          color: ${props => props.theme.primaryText};
        }
      }
    }
  }
`

const sidebarTabs = ["pinned", "archived"]

const Sidebar = () => {
  const dispatch = useDispatch()
  const { active, activeTab } = useSelector(state => ({
    activeTab: state.ui.activeTab,
    active: state.ui.sidebar,
  }))

  const handleTabClick = event => {
    const selectedTab = event.currentTarget.getAttribute("data-value")
    dispatch(updateActiveTab({ activeTab: selectedTab }))

    if (getWindow() && getWindow().innerWidth <= 600) {
      setTimeout(() => {
        dispatch(closeSidebar())
      }, 500)
    }
  }

  const resetTabClick = event => {
    event.stopPropagation()
    dispatch(resetActiveTab())

    if (getWindow() && getWindow().innerWidth <= 600) {
      dispatch(closeSidebar())
    }
  }

  return (
    <SidebarStyled active={active}>
      <ul>
        {sidebarTabs.map(tab => (
          <li
            key={tab}
            onClick={handleTabClick}
            data-value={tab}
            className={activeTab === tab ? "active" : ""}
          >
            {tab}

            {activeTab === tab && (
              <button className="close-btn">
                <CloseIcon onClick={resetTabClick} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </SidebarStyled>
  )
}

export default Sidebar
