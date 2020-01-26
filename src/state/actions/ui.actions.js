export const uiActions = {
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  OPEN_SIDEBAR: "OPEN_SIDEBAR",
  CLOSE_SIDEBAR: "CLOSE_SIDEBAR",
  UPDATE_ACTIVE_TAB: "UPDATE_ACTIVE_TAB",
  RESET_ACTIVE_TAB: "RESET_ACTIVE_TAB",

  SET_THEME: "SET_THEME",
}

export const toggleSidebar = () => ({
  type: uiActions.TOGGLE_SIDEBAR,
})

export const openSidebar = () => ({
  type: uiActions.OPEN_SIDEBAR,
})

export const closeSidebar = () => ({
  type: uiActions.CLOSE_SIDEBAR,
})

export const updateActiveTab = ({ activeTab }) => ({
  type: uiActions.UPDATE_ACTIVE_TAB,
  payload: { activeTab },
})
export const resetActiveTab = () => ({
  type: uiActions.RESET_ACTIVE_TAB,
})

export const setTheme = ({ selectedTheme }) => ({
  type: uiActions.SET_THEME,
  payload: { selectedTheme },
})
