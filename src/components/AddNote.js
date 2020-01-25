import React, { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { addNote } from "../state/actions/notes.actions"
import AddPinIcon from "../images/add-pin.svg"
import DonePinIcon from "../images/done-pin.svg"

const AddNoteStyled = styled.div`
  border-top: 1px solid white;
  padding-top: 1rem;

  .pin-btn {
    will-change: transform, opacity;
    opacity: 0;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
    z-index: 5;
  }

  .show-when-focused {
    display: ${props => (props.expand ? "block !important" : "")};
    opacity: ${props => (props.expand ? "1" : "")};
    transform: ${props => (props.expand ? "scale(1)" : "")};
  }

  .note-input,
  .title-input {
    transition: all 0.3s ease-in-out;
    border: none;
    padding: 0 1rem;
    width: 100%;
    display: block;
    outline: none;
    font-size: 0.7rem;
    background: white;
    line-height: 1.2rem;
    position: relative;

    &:not(:empty) {
      &::after {
        display: none;
      }
    }
  }

  .title-input {
    margin-bottom: 0.5rem;
    &:empty {
      display: none;
    }

    &::after {
      content: "Title";
      position: absolute;
      display: block;
      top: 0;
      left: 1rem;
    }
  }
  .note-input {
    z-index: 4;

    &::after {
      content: "Add a note";
      position: absolute;
      display: block;
      top: 0;
      left: 1rem;
    }
  }

  .input-wrapper {
    margin: 0;
    position: relative;
    margin: 0 auto;
    width: 500px;
    display: block;
    border-radius: 0.5rem;
    background: white;
    transition: all 0.3s ease-in-out;
    padding: 0.5rem 0;
    margin-top: 0.2rem;
  }

  .button-wrapper {
    padding: 0 1rem;
    height: ${props => (props.expand ? "1.5rem" : 0)};
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    margin-top: 1rem;
    display: flex;
    font-size: 0.8rem;
    line-height: 1.5rem;
    justify-content: space-between;

    > div[role="button"] {
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
    }
  }

  [contenteditable="true"] {
    min-height: 1.2rem;
  }

  .icon-btn {
    height: 1.5rem;
    width: 1.5rem;
    text-align: center;
    padding: 0 !important;
    color: ${props => props.theme.background};
    display: inline-grid;
    place-items: center;

    svg {
      margin: 0;
      height: 1rem;
      width: 1rem;
      pointer-events: none;
    }

    &.active {
      background-color: ${props => props.theme.background};
      color: white;
    }
  }
`

export const AddNote = () => {
  const dispatch = useDispatch()

  const wrapperRef = useRef()
  const inputRef = useRef()
  const titleInputRef = useRef()

  const [isFocused, setIsFocused] = useState(false)

  const [isPinned, setIsPinned] = useState(false)

  const handleFocus = () => setIsFocused(true)

  const shutForm = () => {
    inputRef.current.innerHTML = ""
    titleInputRef.current.innerHTML = ""
    setIsFocused(false)
    setIsPinned(false)
  }

  const handleSubmit = event => {
    event && event.preventDefault()
    const title = titleInputRef.current.innerHTML
    const value = inputRef.current.innerHTML
    dispatch(addNote({ noteData: { title, text: value, isPinned } }))

    shutForm()
  }

  const handleNoteChange = event => {
    const content = event.target.innerHTML
    if (content === "<br>") {
      event.target.innerHTML = ""
    }
  }

  const togglePinned = event => {
    event.stopPropagation()
    setIsPinned(a => !a)
  }

  const handleBlur = () => {
    const note = inputRef.current.innerHTML
    const title = titleInputRef.current.innerHTML
    const isValidNote = title || note

    if (isValidNote) {
      handleSubmit()
    } else {
      shutForm()
    }
  }

  const detectBlur = event => {
    const hasClickedOutside = !wrapperRef.current.contains(event.target)
    if (hasClickedOutside) {
      handleBlur()
    }
  }

  const handleTitleChange = event => {
    if (event.charCode === 13) {
      event.preventDefault()
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    if (isFocused) {
      document.addEventListener("click", detectBlur)
    } else {
      document.removeEventListener("click", detectBlur)
    }

    return () => {
      document.removeEventListener("click", detectBlur)
    }
  }, [detectBlur, isFocused])

  return (
    <AddNoteStyled expand={isFocused}>
      <form onSubmit={handleSubmit} className="input-wrapper" ref={wrapperRef}>
        <div
          contentEditable
          ref={titleInputRef}
          type="text"
          onKeyPress={handleTitleChange}
          className="title-input show-when-focused"
        />
        <div
          contentEditable
          ref={inputRef}
          onInput={handleNoteChange}
          onFocus={handleFocus}
          type="text"
          className="note-input"
        />
        {isFocused && (
          <div className="button-wrapper">
            <div
              role="button"
              className={`icon-btn ${isPinned ? "active" : ""}`}
              onClick={togglePinned}
            >
              {isPinned ? <DonePinIcon /> : <AddPinIcon />}
            </div>
            <div role="button" onClick={shutForm}>
              Close
            </div>
          </div>
        )}
      </form>
    </AddNoteStyled>
  )
}
