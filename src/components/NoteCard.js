import React, { useRef } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { IconButton } from "../components/IconButton"

import {
  updateNote,
  deleteNote,
  setActiveNote,
} from "../state/actions/notes.actions"

import PinnedIcon from "../images/pinned-icon.svg"
import UnpinnedIcon from "../images/unpinned-icon.svg"
import DeleteIcon from "../images/delete-icon.svg"
import ArchiveIcon from "../images/archive-icon.svg"

const NoteCardStyled = styled.div`
  width: 100%;
  background-color: ${props => props.theme.cardBackground};
  border-radius: 0.5rem;
  padding: 1rem 1rem 3rem;
  display: grid;
  grid-template-rows: min-content min-content;
  grid-gap: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.2rem;
  max-height: 250px;

  .action-wrapper {
    position: relative;
    height: 2.5rem;
  }

  .note-content {
    height: calc(250px - 4rem);
    overscroll-behavior: contain;
    overflow-y: scroll;
  }

  &:hover {
    .action-btn {
      opacity: 1;
    }
  }

  .action-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    will-change: opacity;
    transition: all 0.3s ease-in-out;
  }

  .pin-btn {
    left: 0.5rem;
  }

  .archive-btn {
    left: 2.5rem;
  }

  .delete-btn {
    right: 0.5rem;
    color: ${props => props.theme.danger} !important;
  }

  .title-input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
  }
`

export const NoteCard = React.memo(({ noteId, closeModal, editable }) => {
  const inputRef = useRef()
  const dispatch = useDispatch()

  const { noteData } = useSelector(state => ({
    noteData: state.notes.data[noteId],
  }))

  const togglePinned = event => {
    event.stopPropagation()
    dispatch(
      updateNote({
        noteData: { ...noteData, pinned: !noteData.pinned, archived: false },
      })
    )
  }

  const toggleArchived = event => {
    event.stopPropagation()
    dispatch(
      updateNote({
        noteData: {
          ...noteData,
          archived: !noteData.archived,
          pinned: false,
        },
      })
    )
  }

  const handleDeleteIconClick = event => {
    event.stopPropagation()
    dispatch(deleteNote({ noteId: noteData.id }))

    closeModal && closeModal()
  }

  const handleCardClick = () => {
    dispatch(setActiveNote({ noteData }))
  }

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

  return (
    <NoteCardStyled onClick={handleCardClick}>
      <div className="note-content">
        {(noteData.title || editable) && (
          <div
            contentEditable={editable}
            placeholder="Title"
            onKeyPress={handleTitleChange}
            className="title-input"
            dangerouslySetInnerHTML={{ __html: noteData.title }}
          />
        )}
        {(noteData.text || editable) && (
          <div
            contentEditable={editable}
            placeholder="Add a note"
            ref={inputRef}
            onInput={handleNoteChange}
            className={`body-input ${!noteData.title.length && "no-title"}`}
            dangerouslySetInnerHTML={{ __html: noteData.text }}
          />
        )}
      </div>

      <div className="action-wrapper">
        <IconButton
          role="button"
          active={noteData.pinned}
          className="action-btn pin-btn"
          onClick={togglePinned}
        >
          {noteData.pinned ? <PinnedIcon /> : <UnpinnedIcon />}
        </IconButton>

        <IconButton
          role="button"
          active={noteData.archived}
          className="action-btn archive-btn"
          onClick={toggleArchived}
        >
          <ArchiveIcon />
        </IconButton>

        <IconButton
          role="button"
          className="action-btn delete-btn"
          onClick={handleDeleteIconClick}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </NoteCardStyled>
  )
})
