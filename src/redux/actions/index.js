const ACTION_TYPES = {
  SET_USER: 'SET_USER'
}

export const setUser = (user) => {
  return {
    type: ACTION_TYPES.SET_USER,
    user
  }
}

export default ACTION_TYPES