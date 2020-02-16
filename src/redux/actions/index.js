const ACTION_TYPES = {
  SET_USER: 'SET_USER',
  SET_ACCOUNT_STATUS: 'SET_ACCOUNT_STATUS',
  SET_DIALOG_SCREEN: 'SET_DIALOG_SCREEN',
  DISMISS_DIALOG_SCREEN: 'DISMISS_DIALOG_SCREEN',
  SET_LOADING_SCREEN: 'SET_LOADING_SCREEN',
  DISMISS_LOADING_SCREEN: 'DISMISS_LOADING_SCREEN'
}

export const setUser = (user) => {
  return {
    type: ACTION_TYPES.SET_USER,
    user
  }
}

export const setAccountStatus = (accountStatus) => {
  return {
    type: ACTION_TYPES.SET_ACCOUNT_STATUS,
    accountStatus
  }
}

export const setDialogScreen = (text, onDismiss) => {
  return {
    type: ACTION_TYPES.SET_DIALOG_SCREEN,
    text,
    onDismiss
  }
}

export const dismissDialogScreen = () => {
  return {
    type: ACTION_TYPES.DISMISS_DIALOG_SCREEN
  }
}

export const setLoadingScreen = (text, onDismiss) => {
  return {
    type: ACTION_TYPES.SET_LOADING_SCREEN,
    text,
    onDismiss
  }
}

export const dismissLoadingScreen = () => {
  return {
    type: ACTION_TYPES.DISMISS_LOADING_SCREEN
  }
}

export default ACTION_TYPES