import ACTION_TYPES from "../actions";

const defaultState = {
  user: null,
  authLoading: true,
  accountStatus: {
    question: null,
    gameId: null
  },
  statusLoading: true
}

const global = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: action.user,
        authLoading: false
      }
    case ACTION_TYPES.SET_ACCOUNT_STATUS:
      return {
        ...state,
        accountStatus: action.accountStatus,
        statusLoading: false
      }
    default:
      return state
  }
}

export default global