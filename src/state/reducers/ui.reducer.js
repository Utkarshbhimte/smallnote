import { uiActions } from "../actions/ui.actions"
import { getWindow } from "../../utils"

const defaultActiveTab =
  getWindow() && getWindow().localStorage.getItem("activeTab")

const initialState = {
  sidebar: !!defaultActiveTab,
  activeTab: defaultActiveTab || null,
}

export const uiReducer = (state = initialState, action) => {
  const { type, payload } = action

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
      getWindow() && getWindow().localStorage.removeItem("activeTab")
      return { ...state, activeTab: null }
    }

    case uiActions.UPDATE_ACTIVE_TAB: {
      getWindow() &&
        getWindow().localStorage.setItem("activeTab", payload.activeTab)
      return { ...state, activeTab: payload.activeTab }
    }

    default:
      return state
  }
}
