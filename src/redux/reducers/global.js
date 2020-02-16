import ACTION_TYPES from "../actions";

const defaultState = {
  user: null,
  authLoading: true,
  accountStatus: {
    question: null,
    gameId: null
  },
  statusLoading: true,
  dialogScreen: {
    text: null,
    show: false,
    onDismiss: null
  },
  loadingScreen: {
    text: 'authenticating',
    show: true,
    onDismiss: null
  }
}

const global = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER: {
      return {
        ...state,
        user: action.user,
        authLoading: false
      }
    }
    case ACTION_TYPES.SET_ACCOUNT_STATUS: {
      return {
        ...state,
        accountStatus: action.accountStatus,
        statusLoading: false
      }
    }
    case ACTION_TYPES.SET_DIALOG_SCREEN: {
      return {
        ...state,
        dialogScreen: {
          text: action.text,
          show: true,
          onDismiss: action.onDismiss
        }
      }
    }
    case ACTION_TYPES.DISMISS_DIALOG_SCREEN: {
      const {text, onDismiss} = state.dialogScreen
      if(onDismiss) onDismiss()
      return {
        ...state,
        dialogScreen: {
          text,
          show: false,
          onDismiss: null
        }
      }
    }
    case ACTION_TYPES.SET_LOADING_SCREEN: {
      return {
        ...state,
        loadingScreen: {
          text: action.text,
          show: true,
          onDismiss: action.onDismiss
        }
      }
    }
    case ACTION_TYPES.DISMISS_LOADING_SCREEN: {
      const {text, onDismiss} = state.loadingScreen
      if(onDismiss) onDismiss()
      return {
        ...state,
        loadingScreen: {
          text,
          show: false,
          onDismiss: null
        }
      }
    }
    default:
      return state
  }
}

export default global