const ACTION_TYPES = {
  SET_USER: 'SET_USER',
  SET_ACCOUNT_STATUS: 'SET_ACCOUNT_STATUS'
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

export default ACTION_TYPES