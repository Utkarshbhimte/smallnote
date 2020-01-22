import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"

const NoteCardStyled = styled.div`
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
`

export const NoteCard = ({ noteId }) => {
  const { noteData } = useSelector(state => ({
    noteData: state.notes.data[noteId],
  }))
  return <NoteCardStyled>{noteData.text}</NoteCardStyled>
}
