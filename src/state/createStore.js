import { createStore as reduxCreateStore, combineReducers } from "redux"

// reducers
import { searchReducer } from "./reducers/search.reducer"
import { notesReducer } from "./reducers/notes.reducer"
import { uiReducer } from "./reducers/ui.reducer"

const rootReducer = combineReducers({
  search: searchReducer,
  ui: uiReducer,
  notes: notesReducer,
})

const createStore = () => reduxCreateStore(rootReducer)
export default createStore
