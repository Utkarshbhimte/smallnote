import { uiActions } from "../actions/ui.actions"
import { getWindow } from "../../utils"

const defaultActiveTab =
  getWindow() && getWindow().localStorage.getItem("activeTab")

const defaultSelectedTheme =
  getWindow() && getWindow().localStorage.getItem("selectedTheme")

// getting the OS defaults
const getPreferredTheme = () =>
  getWindow() &&
  getWindow().matchMedia &&
  getWindow().matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"

const initialState = {
  sidebar: !!defaultActiveTab,
  activeTab: defaultActiveTab || null,
  selectedTheme: defaultSelectedTheme || getPreferredTheme(),
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

    case uiActions.SET_THEME: {
      getWindow() &&
        getWindow().localStorage.setItem("selectedTheme", payload.selectedTheme)
      return { ...state, selectedTheme: payload.selectedTheme }
    }

    default:
      return state
  }
}
