import { searchActions } from "../actions/search.actions"
import { getWindow } from "../../utils"

const defaultSearchTerm =
  (getWindow() && getWindow().localStorage.getItem("searchTerm")) || ""

export const searchReducer = (
  state = { searchTerm: defaultSearchTerm },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case searchActions.UPDATE_SEARCH_TERM: {
      localStorage.setItem("searchTerm", payload.searchTerm)
      return { ...state, searchTerm: payload.searchTerm }
    }

    case searchActions.RESET_SEARCH_TERM: {
      localStorage.setItem("searchTerm", "")
      return { ...state, searchTerm: "" }
    }

    default:
      return state
  }
}
