import React, { useRef, useState, useCallback, useEffect } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"

import { IconButton } from "../components/IconButton"
import { addNote } from "../state/actions/notes.actions"
import PinnedIcon from "../images/pinned-icon.svg"
import UnpinnedIcon from "../images/unpinned-icon.svg"

const AddNoteStyled = styled.div`
  border-top: 1px solid ${props => props.theme.textPrimary};
  padding-top: 1rem;

  .show-when-focused {
    display: ${props => (props.expand ? "block !important" : "")};
    opacity: ${props => (props.expand ? "1" : "")};
    transform: ${props => (props.expand ? "scale(1)" : "")};
  }

  .note-input,
  .title-input {
    padding: 0 1rem;
    width: 100%;
    display: block;
    transition: all 0.3s ease-in-out;
    font-size: 0.7rem;
    line-height: 1.2rem;
    position: relative;
    color: ${props => props.theme.primaryText};
  }

  .title-input {
    margin-bottom: 0.5rem;
    &:empty {
      display: none;
    }
  }
  .note-input {
    z-index: 4;
  }

  .input-wrapper {
    margin: 0;
    position: relative;
    background-color: ${props => props.theme.cardBackground};
    margin: 0 auto;
    width: 500px;
    display: block;
    border-radius: 0.5rem;
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
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: min-content 1fr min-content min-content;
    grid-template-areas: "pinBtn gap resetBtn closeBtn";
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

  .pin-btn {
    grid-area: pinBtn;
  }
  .reset-btn {
    grid-area: resetBtn;
  }
  .close-btn {
    grid-area: closeBtn;
  }
`

export const AddNote = () => {
  const dispatch = useDispatch()

  const wrapperRef = useRef()
  const inputRef = useRef()
  const titleInputRef = useRef()

  const { defaultPinned, isInArchived } = useSelector(state => ({
    defaultPinned: state.ui.activeTab === "pinned",
    isInArchived: state.ui.activeTab === "archived",
  }))

  const [isFocused, setIsFocused] = useState(false)

  const [isPinned, setIsPinned] = useState(false)

  const handleFocus = () => setIsFocused(true)

  const resetForm = useCallback(() => {
    inputRef.current.innerHTML = ""
    titleInputRef.current.innerHTML = ""
    setIsPinned(defaultPinned)
  }, [setIsPinned, defaultPinned])

  const shutForm = useCallback(() => {
    resetForm()
    setIsFocused(false)
  }, [setIsFocused, resetForm])

  const handleSubmit = useCallback(
    event => {
      event && event.preventDefault()
      const title = titleInputRef.current.innerHTML
      const value = inputRef.current.innerHTML
      dispatch(addNote({ noteData: { title, text: value, pinned: isPinned } }))

      shutForm()
    },
    [dispatch, isPinned, shutForm]
  )

  const handleTitleChange = event => {
    if (event.charCode === 13) {
      event.preventDefault()
      inputRef.current.focus()
    }
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

  const handleBlur = useCallback(() => {
    const note = inputRef.current.innerHTML
    const title = titleInputRef.current.innerHTML
    const isValidNote = title || note

    if (isValidNote) {
      handleSubmit()
    } else {
      shutForm()
    }
  }, [shutForm, handleSubmit])

  const detectBlur = useCallback(
    event => {
      const hasClickedOutside = !wrapperRef.current.contains(event.target)
      if (hasClickedOutside) {
        handleBlur()
      }
    },
    [handleBlur]
  )

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

  useEffect(() => {
    if (!isFocused) {
      setIsPinned(defaultPinned)
    }
  }, [defaultPinned, isFocused])

  return (
    <AddNoteStyled expand={isFocused}>
      {!isInArchived && (
        <form
          onSubmit={handleSubmit}
          className="input-wrapper"
          ref={wrapperRef}
        >
          <div
            role="textbox"
            contentEditable
            placeholder="Title"
            ref={titleInputRef}
            type="text"
            onKeyPress={handleTitleChange}
            className="title-input show-when-focused"
          />
          <div
            role="textbox"
            contentEditable
            placeholder="Add a note"
            ref={inputRef}
            onInput={handleNoteChange}
            onFocus={handleFocus}
            type="text"
            className="note-input"
          />

          {isFocused && (
            <div className="button-wrapper">
              <IconButton
                role="button"
                active={isPinned}
                className="pin-btn"
                onClick={togglePinned}
              >
                {isPinned ? <PinnedIcon /> : <UnpinnedIcon />}
              </IconButton>
              <div role="button" className="reset-btn" onClick={resetForm}>
                Reset
              </div>
              <div role="button" className="close-btn" onClick={handleBlur}>
                Close
              </div>
            </div>
          )}
        </form>
      )}
    </AddNoteStyled>
  )
}
