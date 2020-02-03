import ACTION_TYPES from "../actions";

const defaultState = {
  user: null,
  authLoading: true
}

const global = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: action.user,
        authLoading: false
      }
    default:
      return state
  }
}

export default global