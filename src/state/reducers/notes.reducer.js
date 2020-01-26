import { noteActions } from "../actions/notes.actions"
import { generateId, getWindow } from "../../utils"

const defaultNotesState =
  getWindow() &&
  getWindow().localStorage.getItem("notesReducer") &&
  JSON.parse(getWindow().localStorage.getItem("notesReducer"))

export const notesReducer = (
  state = defaultNotesState || { data: {}, activeNote: null, list: [] },
  action
) => {
  const { type, payload } = action
  console.log("TCL: type", type)

  switch (type) {
    case noteActions.ADD_NOTE: {
      const newID = generateId()
      const newState = {
        ...state,
        data: {
          ...state.data,
          [newID]: {
            id: newID,
            ...payload.noteData,
          },
        },
        list: [newID, ...state.list],
      }

      localStorage.setItem("notesReducer", JSON.stringify(newState))
      return newState
    }

    case noteActions.UPDATE_NOTE: {
      const newState = {
        ...state,
        data: {
          ...state.data,
          [payload.noteData.id]: payload.noteData,
        },
      }

      localStorage.setItem("notesReducer", JSON.stringify(newState))
      return newState
    }

    case noteActions.DELETE_NOTE: {
      const newDate = { ...state.data }
      delete newDate[payload.noteId]

      const newState = {
        ...state,
        list: state.list.filter(noteId => noteId !== payload.noteId),
        data: newDate,
      }
      console.log("TCL: payload.noteId", payload.noteId)
      console.log(newState)

      localStorage.setItem("notesReducer", JSON.stringify(newState))
      return newState
    }

    default:
      return state
  }
}
