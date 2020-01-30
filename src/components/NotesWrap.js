import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { NoteCard } from "./NoteCard"
import { CONSTANTS } from "../utils"

export const NoteCardGridHeader = styled.div`
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 1px;
  font-size: 0.8rem;
  margin-top: 2rem;
`

export const NoteCardGrid = styled.div`
  margin: 0.5rem 0;
  display: grid;
  grid-gap: ${CONSTANTS.gridRowGap}px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${CONSTANTS.gridColDenominator}px, 1fr)
  );
  grid-auto-rows: ${CONSTANTS.gridRowDenominator}px;
`

export const NotesWrap = () => {
  const { activeList, activeTab, pinnedNotes, otherNotes } = useSelector(
    state => {
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

      // chunking the non archived notes between pinned and others
      const [pinnedNotes, otherNotes] = list
        .filter(a => !!state.notes.data[a] && !state.notes.data[a].archived)
        .reduce(
          (total, curr) => {
            const data = state.notes.data[curr]

            total = data.pinned
              ? [[...total[0], curr], total[1]]
              : [total[0], [...total[1], curr]]
            return total
          },
          [[], []]
        )

      return { activeList: list || [], activeTab, pinnedNotes, otherNotes }
    }
  )

  return (
    <>
      {/* filtered view */}
      {activeTab ? (
        <NoteCardGrid>
          {activeList.map(noteId => (
            <NoteCard key={noteId} noteId={noteId} />
          ))}
        </NoteCardGrid>
      ) : (
        <>
          {/* default view */}
          {pinnedNotes && !!pinnedNotes.length && (
            <>
              <NoteCardGridHeader>Pinned</NoteCardGridHeader>
              <NoteCardGrid>
                {pinnedNotes.map(noteId => (
                  <NoteCard key={noteId} noteId={noteId} />
                ))}
              </NoteCardGrid>
            </>
          )}

          {otherNotes && !!otherNotes.length && (
            <>
              <NoteCardGridHeader>Active</NoteCardGridHeader>
              <NoteCardGrid>
                {otherNotes
                  .filter(a => !a.pinned)
                  .map(noteId => (
                    <NoteCard key={noteId} noteId={noteId} />
                  ))}
              </NoteCardGrid>
            </>
          )}
        </>
      )}
    </>
  )
}
