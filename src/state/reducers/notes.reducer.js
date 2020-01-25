import { noteActions } from "../actions/notes.actions"
import { generateId } from "../../utils"

export const notesReducer = (
  state = { data: {}, activeNote: null, list: [] },
  action
) => {
  const { type, payload } = action
  console.log("TCL: action", action)

  switch (type) {
    case noteActions.ADD_NOTE: {
      console.log("aaya")
      const newID = generateId()
      return {
        ...state,
        data: {
          ...state.data,
          [newID]: payload.noteData,
        },
        list: [newID, ...state.list],
      }
    }

    default:
      return state
  }
}
