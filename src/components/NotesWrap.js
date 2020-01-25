import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { NoteCard } from "./NoteCard"

export const NoteCardGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  grid-auto-rows: minmax(40px, min-content);
  grid-auto-flow: dense;
  margin: 2rem 0;
`

export const NotesWrap = () => {
  const { list } = useSelector(state => {
    return { list: state.notes.list || [] }
  })
  return (
    <NoteCardGrid>
      {list.map(noteId => (
        <NoteCard key={noteId} noteId={noteId} />
      ))}
    </NoteCardGrid>
  )
}
