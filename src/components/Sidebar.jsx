import React from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { updateActiveTab, resetActiveTab } from "../state/actions/ui.actions"

import CloseIcon from "../images/close.svg"

const SidebarStyled = styled.div`
  position: fixed;
  top: 6rem;
  left: 0;
  transition: all 0.3s ease-in-out;
  transform: ${props => (props.active ? "translateX(0)" : "translateX(-100%)")};
  width: 200px;
  height: 100vh;
  z-index: 10;
  padding: 0 1rem 0 0;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    color: ${props => props.theme.primaryText};

    &:hover {
      color: ${props => props.theme.secondaryText};
    }

    li {
      user-select: none;
      padding: 0.3rem 2rem;
      border-radius: 0 0.5rem 0.5rem 0;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      text-transform: capitalize;
      position: relative;

      .close-btn{
        position: absolute;
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        height: .8rem;
        width: .8rem;
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
  }

  const resetTabClick = event => {
    event.stopPropagation()
    dispatch(resetActiveTab())
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

            {activeTab === tab && <CloseIcon className="close-btn" onClick={resetTabClick} />}
          </li>
        ))}
      </ul>
    </SidebarStyled>
  )
}

export default Sidebar
