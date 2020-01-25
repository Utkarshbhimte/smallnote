import { uiActions } from "../actions/ui.actions"

const initialState = { sidebar: false, activeTab: null }

export const uiReducer = (state = initialState, action) => {
  const { type, payload } = action
  console.log("TCL: uiReducer -> type", type)

  switch (type) {
    case uiActions.OPEN_SIDEBAR: {
      return { ...state, sidebar: true }
    }

    case uiActions.TOGGLE_SIDEBAR: {
      return { ...state, sidebar: !state.sidebar }
    }

    case uiActions.CLOSE_SIDEBAR: {
      return { ...state, sidebar: false }
    }

    case uiActions.RESET_ACTIVE_TAB: {
      return { ...state, activeTab: null }
    }

    case uiActions.UPDATE_ACTIVE_TAB: {
      return { ...state, activeTab: payload.activeTab }
    }

    default:
      return state
  }
}
