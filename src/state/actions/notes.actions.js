export const noteActions = {
  ADD_NOTE: "ADD_NOTE",
  UPDATE_NOTE: "UPDATE_NOTE",
  DELETE_NOTE: "DELETE_NOTE",

  SET_ACTIVE_NOTE: "SET_ACTIVE_NOTE",
  RESET_ACTIVE_NOTE: "RESET_ACTIVE_NOTE",
}

export const setActiveNote = ({ noteData }) => ({
  type: noteActions.SET_ACTIVE_NOTE,
  payload: { noteData },
})

export const resetActiveNote = () => ({
  type: noteActions.RESET_ACTIVE_NOTE,
})

export const addNote = ({ noteData }) => ({
  type: noteActions.ADD_NOTE,
  payload: { noteData },
})

export const updateNote = ({ noteData }) => ({
  type: noteActions.UPDATE_NOTE,
  payload: { noteData },
})

export const deleteNote = ({ noteId }) => ({
  type: noteActions.DELETE_NOTE,
  payload: { noteId },
})
