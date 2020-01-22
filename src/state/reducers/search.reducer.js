import { searchActions } from "../actions/search.actions"

export const searchReducer = (state = { searchTerm: "" }, action) => {
  const { type, payload } = action

  switch (type) {
    case [searchActions.UPDATE_SEARCH_TERM]: {
      return { ...state, searchTerm: payload.searchTerm }
    }

    case [searchActions.RESET_SEARCH_TERM]: {
      return { ...state, searchTerm: "" }
    }

    default:
      return state
  }
}
