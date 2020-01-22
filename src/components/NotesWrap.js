import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { NoteCard } from "./NoteCard"

export const NoteCardGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: minmax(min-content, 40px);
  margin: 2rem 0;
`

export const NotesWrap = () => {
  const { list } = useSelector(state => {
    console.log({ state })
    return { list: state.notes.list || [] }
  })
  return (
    <NoteCardGrid>
      {list.map(noteId => (
        <NoteCard noteId={noteId} />
      ))}
    </NoteCardGrid>
  )
}
