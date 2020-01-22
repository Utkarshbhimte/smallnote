import { searchActions } from "../actions/search.actions"

export const editorReducer = (state = { editor: "" }, action) => {
  const { type, payload } = action

  switch (type) {
    case [searchActions.UPDATE_EDITOR]: {
      return { ...state, editor: payload.editor }
    }

    case [searchActions.RESET_EDITOR]: {
      return { ...state, editor: "" }
    }

    default:
      return state
  }
}
