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

const EmptyState = styled.div`
  padding: 4rem 0;
  text-align: center;
  user-select: none;
  color: ${props => props.theme.primaryText};
  opacity: 0.6;
  font-size: 1rem;
`

const sectionCaptionMapper = {
  archived: "Archived",
  pinned: "Pinned",
  others: "Others",
}

export const NotesWrap = () => {
  const { noteSections } = useSelector(state => {
    const {
      ui: { activeTab },
      search: { searchTerm },
    } = state

    let { list } = state.notes
    let noteSections = []

    if (searchTerm && !!searchTerm.length) {
      const filteredNotes = list.filter(noteId => {
        const noteData = state.notes.data[noteId]
        return (
          (noteData.title &&
            noteData.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (noteData.text &&
            noteData.text.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      })

      const noteSectionsMap = filteredNotes.reduce(
        (total, currNoteId) => {
          const noteData = state.notes.data[currNoteId]

          if (noteData.archived) {
            total.archived = [currNoteId, ...(total.archived || [])]
          } else if (noteData.pinned) {
            total.pinned = [currNoteId, ...(total.pinned || [])]
          } else {
            total.others = [currNoteId, ...(total.others || [])]
          }

          return total
        },
        {
          pinned: [],
          others: [],
          archived: [],
        }
      )

      noteSections = Object.keys(noteSectionsMap).map(sectionKey => ({
        key: sectionKey,
        label: sectionCaptionMapper[sectionKey],
        notes: noteSectionsMap[sectionKey],
      }))
    } else if (!!activeTab) {
      const filteredNotes = list.filter(noteId => {
        const noteData = state.notes.data[noteId]
        return noteData[activeTab]
      })

      noteSections = [
        {
          key: activeTab,
          label: null,
          notes: filteredNotes,
        },
      ]
    } else {
      const nonArchivedNotes = list.filter(noteId => {
        const noteData = state.notes.data[noteId]
        return !noteData.archived
      })

      const noteSectionsMap = nonArchivedNotes.reduce(
        (total, currNoteId) => {
          const noteData = state.notes.data[currNoteId]
          if (noteData.pinned) {
            total.pinned = [currNoteId, ...(total.pinned || [])]
          } else {
            total.others = [currNoteId, ...(total.others || [])]
          }
          return total
        },
        { pinned: [], others: [] }
      )

      noteSections = Object.keys(noteSectionsMap).map(sectionKey => ({
        key: sectionKey,
        label: sectionCaptionMapper[sectionKey],
        notes: noteSectionsMap[sectionKey],
      }))
    }

    noteSections = noteSections.filter(section => !!section.notes.length)
    return { noteSections }
  })
  return (
    <>
      {/* default view */}
      {noteSections.map(section => (
        <React.Fragment key={section.key}>
          {section.label && noteSections.length > 1 && (
            <NoteCardGridHeader>{section.label}</NoteCardGridHeader>
          )}
          <NoteCardGrid>
            {section.notes.map(noteId => (
              <NoteCard key={noteId} noteId={noteId} />
            ))}
          </NoteCardGrid>
        </React.Fragment>
      ))}

      {/* Empty State */}
      {!noteSections.length && (
        <EmptyState>
          <span>There are no notes</span>
        </EmptyState>
      )}
    </>
  )
}
