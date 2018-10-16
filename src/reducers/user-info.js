import AudioEngine from 'scratch-audio'
import Renderer from 'scratch-render'
import { push } from 'connected-react-router'
import log from '../lib/log'
import { 
  PROTOCOL,
  SERVER_ADDRESS,
  SERVER_PORT_NUM,
  URL_USER_LOGIN_SIGN_UP,
  URL_USER_LOGIN_SIGN_IN,
  URL_USER_LOGIN,
  URL_USER_COOKIE_LOGIN,
  URL_PROJECT_DELETE,
  URL_SHARE_PROJECT_TOGGLE,
  URL_SAVE_PROJECT,
  URL_PROJECT_GET_CONTENT,
  URL_PROJECT_GET_SHARED,
  URL_PROJECT_UPDATE_DESCRIPTION,
} from '../../urls'
import { PATH_HOME_PAGE, PATH_CREATE_PROJECT } from '../const/route-path'
import { fetchPost, fetchFile } from '../lib/fetchApi'
import fetch from 'cross-fetch'
import { SECRET_KEY } from '../config'
import CryptoJS from 'crypto-js'
import { defineMessages } from 'react-intl'
import { toArrayBuffer } from '../lib/buffer-util'
import {updateSnackMessage} from './snack-bar'
import { openSavingProject, closeSavingProject } from './modals'
import { projectName, setProjectName } from './menus'
import { getCookieValueByRegEx, setCookies, removeCookies } from '../lib/cookie-util';

const USER_LOGIN_MODAL = 'scratch-gui/login/USER_LOGIN_MODAL'
const USER_LOGIN_REQUEST = 'scratch-gui/login/USER_LOGIN_REQUEST'
const USER_LOGIN_SUCCESS = 'scratch-gui/login/USER_LOGIN_SUCCESS'
const USER_LOGIN_FAIL = 'scratch-gui/login/USER_LOGIN_FAIL'
const USER_SIGN_UP_REQUEST = 'scratch-gui/login/USER_SIGN_UP_REQUEST'
const USER_SIGN_UP_SUCCESS = 'scratch-gui/login/USER_SIGN_UP_SUCCESS'
const USER_SIGN_UP_FAIL = 'scratch-gui/login/USER_SIGN_UP_FAIL'
const USER_LOGIN_CHANGE_TAB = 'scratch-gui/login/USER_LOGIN_CHANGE_TAB'
const USER_SIGN_OUT= 'scratch-gui/login/USER_SIGN_OUT'
const USER_PROJECTS_DELETE = 'scratch-gui/user/USER_PROJECTS_DELETE'
const USER_PROJECTS_SHARE = 'scratch-gui/user/USER_PROJECTS_SHARE'
const USER_PROJECTS_ADD = 'scratch-gui/user/USER_PROJECTS_ADD'
const USER_PROJECTS_EDITING = 'scratch-gui/user/USER_PROJECTS_EDITING'
const USER_PROJECTS_UPDATE = 'scratch-gui/user/USER_PROJECTS_UPDATE'
const USER_UPDATE_SHARED_PROJECTS = 'scratch-gui/user/USER_UPDATE_SHARED_PROJECTS'

const IS_LOGIN = 'isUserLogin'
const SHOW_LOGIN_MODAL = 'showLoginModal'
const LOGIN_ERROR = 'loginError'
const LOGIN_ERROR_MESSAGE = 'loginErrorMessage'
const SERVER_INTERNAL_ERROR = 'Sever internal error'

const messages = defineMessages({
  deleteProjectSuccess: {
    id: 'custom.common.recordDeleteSuccess',
    defaultMessage: 'Record delete successfully.'
  },
  deleteProjectFailed: {
    id: 'custom.common.recordDeleteFail',
    defaultMessage: 'Record delete failed.'
  },
  saveProjectFailed: {
    id: 'custom.project.saveFailed',
    defaultMessage: 'Save project failed'
  },
  saveProjectSuccess: {
    id: 'custom.project.saveSuccess',
    defaultMessage: 'Save project successfully'
  },
  shareProjectSuccess: {
    id: 'custom.project.shareSuccess',
    defaultMessage: 'Share project successfully'
  },
  shareProjectFail: {
    id: 'custom.project.shareFail',
    defaultMessage: 'Share project failed'
  },
  defaultError: {
    id: 'custom.common.operationError',
    defaultMessage: 'Error occurred while do this operation'
  },
})

const initialStates = {
  [SHOW_LOGIN_MODAL]: false,
  [IS_LOGIN]: false,
  userInfo: {},
  [LOGIN_ERROR]: false,
  [LOGIN_ERROR_MESSAGE]: '',
  editingProject: {
    projectData: null,
    projectId: null,
  },
  sharedProjects: []
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
    case USER_SIGN_OUT:
      return Object.assign({}, {...state}, {
        [IS_LOGIN]: false,
        userInfo: {} 
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
    case USER_PROJECTS_DELETE:
      return Object.assign({}, {...state}, {
        userInfo: Object.assign({}, {...state.userInfo}, {
          projects: state.userInfo.projects.filter(project => project._id !== action.projectId)
        })
      })
    case USER_PROJECTS_SHARE:
      return Object.assign({}, {...state}, {
        userInfo: Object.assign({}, {...state.userInfo}, {
          projects: [action.project, ...state.userInfo.projects.filter(project => project._id !== action.project._id)]
        })
      })
    case USER_PROJECTS_ADD:
      return Object.assign({}, {...state}, {
        userInfo: Object.assign({}, {...state.userInfo}, {
          projects: [action.project, ...state.userInfo.projects]
        })
      })
    case USER_PROJECTS_UPDATE:
      return Object.assign({}, {...state}, {
        userInfo: Object.assign({}, {...state.userInfo}, {
          projects: [action.project, ...state.userInfo.projects.filter(project => project._id !== action.project._id)]
        })
      })
    case USER_PROJECTS_EDITING:
      return Object.assign({}, {...state}, {editingProject: action.editingProject})
    case USER_UPDATE_SHARED_PROJECTS:
      return Object.assign({}, {...state}, {
        sharedProjects: action.projects
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
const userSignOut = () => ({
  type: USER_SIGN_OUT
})
const userSignUpFail = (message) => ({
  type: USER_SIGN_UP_FAIL,
  message
})
const loginModalChangeTab = () => ({
  type: USER_LOGIN_CHANGE_TAB
})
const deleteUserProject = (projectId) => ({
  type: USER_PROJECTS_DELETE,
  projectId
})
const shareUserProject = (project) => ({
  type: USER_PROJECTS_SHARE,
  project 
})
const addUserProject = (project) => ({
  type: USER_PROJECTS_ADD,
  project
})
const updateUserProjects = (project) => ({
  type: USER_PROJECTS_UPDATE,
  project
})
const editingProject = (projectId, projectData = null) => ({
  type: USER_PROJECTS_EDITING,
  editingProject: {
    projectData,
    projectId
  } 
})
const updateSharedProjects = (projects = []) => ({
  type: USER_UPDATE_SHARED_PROJECTS,
  projects
})

const userLogin = (userInfo) => {
  return (dispatch) => {
    return fetchPost(URL_USER_LOGIN, {log_account: userInfo.account, log_password: userInfo.password})
      .then(
        res => res.json()
      )
      .then(json => {
        console.dir(json)
        if(json.status) {
          const {s_id, username, account, head_img} = json
          fetchPost(URL_USER_COOKIE_LOGIN, {s_id, username, account, head_img})
            .then(res => res.json())
            .then(json => {
              console.dir(json)
              if(json.success) {
                dispatch(userLoginSuccess(json.payload.user))
                const s_id_cookie = getCookieValueByRegEx('s_id')
                if(!s_id_cookie) {
                  setCookies({s_id, username, account, head_img})
                }
              } else {
                console.error(json.error)
              }
            })
            .catch(err => {
              console.error(err.message)
            })
        } else {
          dispatch(userLoginFail(`登录失败`))
        }
      })
      .catch(err => {
        dispatch(userLoginFail(err.message))
      })
  }
}

const userCookieLogin = (s_id, username, account, head_img) => {
  return dispatch => {
    fetchPost(URL_USER_COOKIE_LOGIN, {s_id, username, account, head_img})
      .then(res => res.json())
      .then(json => {
        console.dir(json)
        if(json.success) {
          dispatch(userLoginSuccess(json.payload.user))
        } else {
          console.error(json.error)
        }
      })
      .catch(err => {
        console.error(err.message)
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

const handleUserSignOut = () => {
  return dispatch => {
    removeCookies({s_id: '', username: '', account: '', head_img: ''})
    dispatch(userSignOut())
    dispatch(push(PATH_HOME_PAGE))
  }
}

const userProjectDelete = (projectId) => {
  return dispatch => {
    return fetchPost(URL_PROJECT_DELETE, {projectId: projectId})
      .then(res => res.json())
      .then(json => {
        dispatch(deleteUserProject(projectId))
        dispatch(updateSnackMessage(true, 'success', messages.deleteProjectSuccess))
      })
      .catch(e => {
        dispatch(updateSnackMessage(true, 'error', messages.deleteProjectFailed))
      })
  }
}

const userProjectToggleShare = (projectId, isPublic = false) => {
  return dispatch => {
    return fetchPost(URL_SHARE_PROJECT_TOGGLE, {projectId: projectId, isPublic: isPublic})
      .then(res => res.json())
      .then(json => {
        dispatch(shareUserProject(json.payload.project))
        dispatch(updateSnackMessage(true, 'success', messages.shareProjectSuccess))
      })
      .catch(e => {
        dispatch(updateSnackMessage(true, 'error', messages.shareProjectFail))
      })
  }
}

const userSaveProject = (isUserLogin, projectName, userId, vm, saveAsCopy = false, projectId = '') => {
  return dispatch => {
    if(!isUserLogin) {
      dispatch(toggleLoginModal())
    } else {
      if(!projectName) {
        projectName = `project_${Date.now()}`
      }
      projectName = `${projectName}.sb3`
      if(userId) {
        projectName = `${userId}_${projectName}`
      } else {
        console.log('User id can not find')
        dispatch(updateSnackMessage(true, 'error', messages.defaultError))
        return
      }
      dispatch(openSavingProject())
      vm.saveProjectSb3().then(content => {
        let data = new FormData()
        data.append('file', content, projectName)
        data.append('userId', userId)
        data.append('saveAsCopy', saveAsCopy)
        data.append('projectId', projectId)
        return fetch(URL_SAVE_PROJECT, {
          method: 'POST',
          body: data
        })
        .then(res => res.json())
        .then(json => {
          if(json.success) {
            const projectRes = json.payload.project
            dispatch(setProjectName(projectRes.projectName))
            dispatch(editingProject(projectRes._id))
            if(projectRes._id !== projectId) {
              dispatch(addUserProject(projectRes))
            } else {
              dispatch(updateUserProjects(projectRes))
            }
            dispatch(updateSnackMessage(true, 'success', messages.saveProjectSuccess))
          } else {
            dispatch(updateSnackMessage(true, 'error', messages.saveProjectFailed))
          }
        })
        .catch(err => {
          log.error(err)
          dispatch(updateSnackMessage(true, 'error', messages.saveProjectFailed))
        }).finally(
          dispatch(closeSavingProject())
        )
      })
    }
  }
}

const userProjectEdit = (project, vm) => {
  return dispatch => {
    fetchPost(URL_PROJECT_GET_CONTENT, {project: project})
      .then(res => res.json())
      .then(json => {
        if(!json.success) {
          dispatch(updateSnackMessage(true, 'error', messages.defaultError))
        }
        const bufferData = toArrayBuffer(json.payload.result.data)
        if (!vm.runtime.renderer) {
          const renderer = new Renderer(document.createElement('canvas'));
          vm.attachRenderer(renderer);
        }
        if(!vm.runtime.audioEngine) {
          const audioEngine = new AudioEngine();
          vm.attachAudioEngine(audioEngine);
        }
        
        vm.loadProject(bufferData)
        .then(() => {
          dispatch(setProjectName(project.projectName || ''))
          dispatch(editingProject(project._id))
          dispatch(push(PATH_CREATE_PROJECT))
        })
        .catch(e => {
          log.error(e)
          dispatch(updateSnackMessage(true, 'error', messages.defaultError))
        })
      })
      .catch(e => {
        console.dir(e)
        dispatch(updateSnackMessage(true, 'error', messages.defaultError))
      })
  }
}

const getSharedProjects = () => {
  return dispatch => {
    fetch(URL_PROJECT_GET_SHARED)
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        const projects = json.payload.projects
        dispatch(updateSharedProjects(projects))
      } else {
        console.error('get shared projects failed') 
      }
    })
    .catch(e => {
      console.error(e)
    })
  }
}

const updateUserProjectDescription = (currentViewProject) => {
  return dispatch => {
    fetchPost(URL_PROJECT_UPDATE_DESCRIPTION, { project: currentViewProject})
    .then(res => res.json())
    .then(json => {
      if(json.success) {
        const project = json.payload.project
        dispatch(updateUserProjects(project))
      } else {
        console.error('update project failed') 
      }
    })
    .catch(e => {
      console.error(e)
    })
  }
}

export {
  reducer as default,
  initialStates as userInfoInitialState,
  userLogin,
  toggleLoginModal,
  userSignUp,
  userCookieLogin,
  handleUserSignOut,
  loginModalChangeTab,
  userProjectDelete,
  userProjectToggleShare,
  userProjectEdit,
  userSaveProject,
  getSharedProjects,
  updateUserProjectDescription,
  SHOW_LOGIN_MODAL,
  LOGIN_ERROR,
  LOGIN_ERROR_MESSAGE,
}