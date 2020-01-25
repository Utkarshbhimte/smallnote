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
    const {
      ui: { activeTab },
      search: { searchTerm },
    } = state

    let { list } = state.notes

    list = list.filter(noteId => {
      const noteData = state.notes.data[noteId]
      // filtering by active tab
      const tabCondition = !activeTab || noteData[activeTab]

      // filtering by active search
      const searchCondition =
        !(searchTerm && !!searchTerm.length) ||
        (noteData.title && noteData.title.includes(searchTerm)) ||
        (noteData.text && noteData.text.includes(searchTerm))

      return tabCondition && searchCondition
    })

    return { list: list || [] }
  })
  return (
    <NoteCardGrid>
      {list.map(noteId => (
        <NoteCard key={noteId} noteId={noteId} />
      ))}
    </NoteCardGrid>
  )
}
