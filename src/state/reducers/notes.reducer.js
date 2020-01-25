import { noteActions } from "../actions/notes.actions"
import { generateId } from "../../utils"

export const notesReducer = (
  state = { data: {}, activeNote: null, list: [] },
  action
) => {
  const { type, payload } = action
  switch (type) {
    case noteActions.ADD_NOTE: {
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
