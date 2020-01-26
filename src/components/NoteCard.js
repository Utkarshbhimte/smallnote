import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"

import PinIcon from "../images/done-pin.svg"

const NoteCardStyled = styled.div`
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  display: grid;
  grid-template-rows: min-content min-content;
  grid-gap: 0.5rem;
  font-size: 0.8rem;
  line-height: 1.2rem;
  max-height: 250px;
  overflow-y: hidden;
  position: relative;

  .pin-icon {
    pointer-events: none;
    position: absolute;
    top: 1rem;
    right: 1rem;
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
  const { noteData } = useSelector(state => ({
    noteData: state.notes.data[noteId],
  }))

  return (
    <NoteCardStyled>
      {noteData.pinned && <PinIcon className="pin-icon" />}
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
    </NoteCardStyled>
  )
})
