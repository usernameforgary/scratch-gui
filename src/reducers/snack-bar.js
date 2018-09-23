const UPDATE_SNACK_BAR_MESSAGE = 'UPDATE_SNACK_BAR_MESSAGE'

const initialState = {
  open: false,
  variant: 'success',
  message: {
    id: '',
    defaultMessage: ''
  },
  vertical: "bottom",
  horizontal: "right",
  autoHideDuration: 6000
}

const reducer = function(state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch(action.type) {
    case UPDATE_SNACK_BAR_MESSAGE:
      return Object.assign({}, state, action.state)
    default:
      return state
  }
}

const updateSnackMessage = (open=false, variant='success', message='', vertical='top', horizontal='center', autoHideDuration=6000) => ({
  type: UPDATE_SNACK_BAR_MESSAGE,
  state: {
    open,
    variant,
    message,
    vertical,
    horizontal,
    autoHideDuration
  }
})

export {
  reducer as default,
  initialState as snackBarInitialState,
  updateSnackMessage,
}