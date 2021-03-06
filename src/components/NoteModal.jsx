import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { useSelector } from "react-redux"
import {
  resetActiveNote,
  updateNote,
  deleteNote,
} from "../state/actions/notes.actions"
import { NoteCard } from "./NoteCard"

const NoteModalStyled = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000bb;
  z-index: 10;
  overflow-y: scroll;

  .card {
    background: white;
    border-radius: 0.5rem;
    width: 95%;
    margin: 0 auto;
    max-width: 420px;

    > div {
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 1rem;

      .note-content {
        min-height: calc(50vh - 4rem);
        display: grid;
        grid-template-rows: min-content 1fr;
      }

      .action-btn {
        opacity: 1;
        color: ${props => props.theme.primaryText};
      }

      .action-wrapper {
        position: relative;
        margin: 0 1rem;
      }
    }
  }
`
const NoteModal = () => {
  const dispatch = useDispatch()
  const cardRef = useRef()
  const { activeNote } = useSelector(state => ({
    activeNote: state.notes.activeNote,
  }))

  const closeModal = e => {
    if (e && cardRef.current && cardRef.current.contains(e.target)) {
      return
    }

    const title = cardRef.current.querySelector(".title-input").innerHTML
    const text = cardRef.current.querySelector(".body-input").innerHTML

    const noteData = { ...activeNote }

    if ((title && !!title.length) || (text && !!text.length)) {
      dispatch(
        updateNote({
          noteData: {
            ...noteData,
            title,
            text,
          },
        })
      )
    } else {
      dispatch(deleteNote({ noteId: noteData.id }))
    }

    dispatch(resetActiveNote())
  }

  useEffect(() => {
    if (activeNote) {
      document.addEventListener("click", closeModal)
    } else {
      document.removeEventListener("click", closeModal)
    }

    return () => {
      document.removeEventListener("click", closeModal)
    }
  }, [activeNote])

  return (
    <>
      {activeNote && (
        <NoteModalStyled>
          <div className="card" ref={cardRef}>
            {activeNote && (
              <NoteCard
                editable
                closeModal={closeModal}
                noteId={activeNote.id}
              />
            )}
          </div>
        </NoteModalStyled>
      )}
    </>
  )
}

export default NoteModal
