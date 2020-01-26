import { noteActions } from "../actions/notes.actions"
import { generateId } from "../../utils"

export const notesReducer = (
  state = { data: {}, activeNote: null, list: [] },
  action
) => {
  const { type, payload } = action
  console.log(action)
  switch (type) {
    case noteActions.ADD_NOTE: {
      const newID = generateId()
      return {
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
    }

    case noteActions.UPDATE_NOTE: {
      return {
        ...state,
        data: {
          ...state.data,
          [payload.noteData.id]: payload.noteData,
        },
      }
    }

    default:
      return state
  }
}
