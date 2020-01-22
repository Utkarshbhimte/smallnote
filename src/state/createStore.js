import { createStore as reduxCreateStore, combineReducers } from "redux"

// reducers
import { editorReducer } from "./reducers/editor.reducer"
import { searchReducer } from "./reducers/search.reducer"
import { notesReducer } from "./reducers/notes.reducer"

const rootReducer = combineReducers({
  search: searchReducer,
  editor: editorReducer,
  notes: notesReducer,
})

const createStore = () => reduxCreateStore(rootReducer)
export default createStore
