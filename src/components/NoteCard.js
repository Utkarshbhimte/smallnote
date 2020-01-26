import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"

import { IconButton } from "../components/IconButton"

import { updateNote, deleteNote } from "../state/actions/notes.actions"

import PinnedIcon from "../images/pinned-icon.svg"
import UnpinnedIcon from "../images/unpinned-icon.svg"
import DeleteIcon from "../images/delete-icon.svg"
import ArchiveIcon from "../images/archive-icon.svg"

const NoteCardStyled = styled.div`
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  padding: 1rem 1rem 3rem;
  display: grid;
  grid-template-rows: min-content min-content;
  grid-gap: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.2rem;
  max-height: 250px;
  overflow-y: hidden;
  position: relative;

  &:hover {
    .action-btn {
      opacity: 1;
    }
  }

  .action-btn {
    position: absolute;
    bottom: 0.3rem;
    opacity: 1;
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
    color: ${props => props.theme.danger};
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
  }

  .body {
    &.no-title {
      font-size: 1.3rem;
      line-height: 2rem;
    }
  }
`

export const NoteCard = React.memo(({ noteId }) => {
  const dispatch = useDispatch()
  const { noteData } = useSelector(state => ({
    noteData: state.notes.data[noteId],
  }))

  const togglePinned = () => {
    dispatch(
      updateNote({
        noteData: { ...noteData, pinned: !noteData.pinned, archived: false },
      })
    )
  }

  const toggleArchived = () => {
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

  const handleDeleteIconClick = () => {
    dispatch(deleteNote({ noteId: noteData.id }))
  }

  return (
    <NoteCardStyled>
      {noteData.title && (
        <div
          className="title"
          dangerouslySetInnerHTML={{ __html: noteData.title }}
        />
      )}
      {noteData.text && (
        <div
          className={`body ${!noteData.title.length && "no-title"}`}
          dangerouslySetInnerHTML={{ __html: noteData.text }}
        />
      )}

      <IconButton
        role="button"
        active={noteData.pinned}
        className="pin-btn action-btn"
        onClick={togglePinned}
      >
        {noteData.pinned ? <PinnedIcon /> : <UnpinnedIcon />}
      </IconButton>

      <IconButton
        role="button"
        active={noteData.archived}
        className="archive-btn action-btn"
        onClick={toggleArchived}
      >
        <ArchiveIcon />
      </IconButton>

      <IconButton
        role="button"
        className="delete-btn action-btn"
        onClick={handleDeleteIconClick}
      >
        <DeleteIcon />
      </IconButton>
    </NoteCardStyled>
  )
})
