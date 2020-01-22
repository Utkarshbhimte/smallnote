import { noteActions } from "../actions/notes.actions"

export const notesReducer = (
  state = { data: {}, activeNote: null, list: [] },
  action
) => {
  const { type, payload } = action
  console.log("TCL: action", action)

  switch (type) {
    case [noteActions.ADD_NOTE]: {
      return { ...state, editor: payload.noteData }
    }

    default:
      return state
  }
}
