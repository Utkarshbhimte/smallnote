import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"

import { hideNotification } from "../state/actions/ui.actions"

const NotificationStyled = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.background};
  color: ${props => props.theme.primaryText};
  min-width: 12rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  will-change: transform;
  transform: ${props => `translateY(${props.show ? "0" : "4rem"})`};
  max-width: calc(100% - 2rem);
  font-size: 0.8rem;
  min-height: 2rem;
`

const Notification = () => {
  const timeoutRef = useRef()
  const dispatch = useDispatch()

  const { notificationText } = useSelector(state => ({
    notificationText: state.ui.notificationText,
  }))

  const handleNotificationTimeout = () => {
    dispatch(hideNotification())
  }

  useEffect(() => {
    if (!!notificationText) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(handleNotificationTimeout, 3000)
    }
  }, [notificationText])
  return (
    <NotificationStyled show={!!notificationText && !!notificationText.length}>
      {notificationText}
    </NotificationStyled>
  )
}

export default Notification
