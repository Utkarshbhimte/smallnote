import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"

const NoteCardStyled = styled.div`
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  display: grid;
  grid-gap: 1rem;

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const NoteCard = ({ noteId }) => {
  const { noteData } = useSelector(state => ({
    noteData: state.notes.data[noteId],
  }))

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
          className="body"
          dangerouslySetInnerHTML={{ __html: noteData.text }}
        />
      )}
    </NoteCardStyled>
  )
}
