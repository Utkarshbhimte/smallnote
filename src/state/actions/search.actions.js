export const searchActions = {
  UPDATE_SEARCH_TERM: "UPDATE_SEARCH_TERM",
  RESET_SEARCH_TERM: "RESET_SEARCH_TERM",
}

export const updateSearchTerm = ({ searchTerm }) => ({
  type: searchActions.UPDATE_SEARCH_TERM,
  payload: { searchTerm },
})

export const resetSearchTerm = ({ term }) => ({
  type: searchActions.RESET_SEARCH_TERM,
})
