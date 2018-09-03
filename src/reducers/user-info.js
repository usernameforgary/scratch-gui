import { URL_USER_LOGIN_SIGN_UP, URL_USER_LOGIN_SIGN_IN } from '../../urls'
import { fetchPost } from '../lib/fetchApi'
import { SECRET_KEY } from '../config'
import CryptoJS from 'crypto-js'

const USER_LOGIN_MODAL = 'scratch-gui/login/USER_LOGIN_MODAL'
const USER_LOGIN_REQUEST = 'scratch-gui/login/USER_LOGIN_REQUEST'
const USER_LOGIN_SUCCESS = 'scratch-gui/login/USER_LOGIN_SUCCESS'
const USER_LOGIN_FAIL = 'scratch-gui/login/USER_LOGIN_FAIL'
const USER_SIGN_UP_REQUEST = 'scratch-gui/login/USER_SIGN_UP_REQUEST'
const USER_SIGN_UP_SUCCESS = 'scratch-gui/login/USER_SIGN_UP_SUCCESS'
const USER_SIGN_UP_FAIL = 'scratch-gui/login/USER_SIGN_UP_FAIL'
const USER_LOGIN_CHANGE_TAB = 'scratch-gui/login/USER_LOGIN_CHANGE_TAB'

const IS_LOGIN = 'isUserLogin'
const SHOW_LOGIN_MODAL = 'showLoginModal'
const LOGIN_ERROR = 'loginError'
const LOGIN_ERROR_MESSAGE = 'loginErrorMessage'
const SERVER_INTERNAL_ERROR = 'Sever internal error'

const initialStates = {
  [IS_LOGIN]: false,
  [SHOW_LOGIN_MODAL]: false,
  userInfo: {},
  [LOGIN_ERROR]: false,
  [LOGIN_ERROR_MESSAGE]: ''
}

const reducer = function(state, action) {
  if (typeof state === 'undefined') state = initialStates;
  switch(action.type) {
    case SHOW_LOGIN_MODAL:
      return Object.assign({}, state, {
        [SHOW_LOGIN_MODAL]: !state[SHOW_LOGIN_MODAL],
        [LOGIN_ERROR]: false,
        [LOGIN_ERROR_MESSAGE]: '',
      })
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        [SHOW_LOGIN_MODAL]: false,
        [IS_LOGIN]: true,
        userInfo: action.userInfo
      })
    case USER_LOGIN_FAIL:
      return Object.assign({}, state, {
        [SHOW_LOGIN_MODAL]: true,
        [IS_LOGIN]: false,
        [LOGIN_ERROR]: true,
        [LOGIN_ERROR_MESSAGE]: action.message
      })
    case USER_SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        [SHOW_LOGIN_MODAL]: false,
        [IS_LOGIN]: true,
        userInfo: action.userInfo
      })
    case USER_SIGN_UP_FAIL:
      return Object.assign({}, state, {
        [LOGIN_ERROR]: true,
        [LOGIN_ERROR_MESSAGE]: action.message
      })
    case USER_LOGIN_CHANGE_TAB:
      return Object.assign({}, state, {
        [LOGIN_ERROR]: false,
        [LOGIN_ERROR_MESSAGE]: ''
      })
    default:
      return state
  }
}

const toggleLoginModal = () => ({
  type: SHOW_LOGIN_MODAL
})
const userLoginSuccess = (userInfo) => ({
  type: USER_LOGIN_SUCCESS,
  userInfo
})
const userLoginFail = (message) => ({
  type: USER_LOGIN_FAIL,
  message
})
const userSignUpSuccess = (userInfo) => ({
  type: USER_SIGN_UP_SUCCESS,
  userInfo
})
const userSignUpFail = (message) => ({
  type: USER_SIGN_UP_FAIL,
  message
})
const loginModalChangeTab = () => ({
  type: USER_LOGIN_CHANGE_TAB
})

const userLogin = (userInfo) => {
  return (dispatch) => {
    const userPsw = userInfo.password;
    userInfo.password = CryptoJS.AES.encrypt(userPsw, SECRET_KEY).toString() 

    return fetchPost(URL_USER_LOGIN_SIGN_IN, {user: userInfo})
      .then(
        res => res.json()
      )
      .then(json => {
        if(json.success) {
          dispatch(userLoginSuccess(json.payload.user))
        } else {
          dispatch(userLoginFail(json.error))
        }
      })
      .catch(err => {
        dispatch(userLoginFail(err.message))
      })
  }
}

const userSignUp = (userInfo) => {
  return (dispatch) => {
    if(!userInfo) {
      //TODO add international language support
      dispatch(userSignUpFail('请填写注册信息'))
      return
    }
    if(!(userInfo.username && userInfo.email && userInfo.password)) {
      dispatch(userSignUpFail('请完善注册信息'))
      return
    }
    userInfo.password = CryptoJS.AES.encrypt(userInfo.password, SECRET_KEY).toString() 

    return fetchPost(URL_USER_LOGIN_SIGN_UP, {user: userInfo})
      .then(res => {
        return res.json()
      })
      .then(json => {
        if(json.success) {
          dispatch(userSignUpSuccess(json.payload.user))
        } else {
          dispatch(userSignUpFail(json.error))
        }
      })
      .catch(err => {
        dispatch(userSignUpFail(err.message))
      })
  }
}


export {
  reducer as default,
  initialStates as userInfoInitialState,
  userLogin,
  toggleLoginModal,
  userSignUp,
  loginModalChangeTab,
  SHOW_LOGIN_MODAL,
  LOGIN_ERROR,
  LOGIN_ERROR_MESSAGE,
}