import { createStore as reduxCreateStore, combineReducers } from "redux"

// reducers
import { editorReducer } from "./reducers/editor.reducer"
import { searchReducer } from "./reducers/search.reducer"

const rootReducer = combineReducers({
  search: searchReducer,
  editor: editorReducer,
})

const createStore = () => reduxCreateStore(rootReducer)
export default createStore
