import AudioEngine from 'scratch-audio'
import Renderer from 'scratch-render'
import { push } from 'connected-react-router'
import { PATH_PROJECT_VIEW } from '../const/route-path'
import { fetchPost } from '../lib/fetchApi'
import { URL_PROJECT_GET_CONTENT, URL_PROJECT_UPDATE_DESCRIPTION } from '../../urls/index'
import { toArrayBuffer } from '../lib/buffer-util'

const UPDATE_CURRENT_LOGIN_USER_ID = 'scratch-gui/view-project/UPDATE_CURRENT_LOGIN_USER_ID'
const UPDATE_CURRENT_VIEW_PROJECT = 'scratch-gui/view-project/UPDATE_CURRENT_VIEW_PROJECT'
const UPDATE_CURRENT_VIEW_PROJECT_DESCRIPTION ='scratch-gui/view-project/UPDATE_CURRENT_VIEW_PROJECT_DESCRIPTION' 
const UPDATE_CURRENT_VIEW_PROJECT_OPERATE_DESCRIPTION ='scratch-gui/view-project/UPDATE_CURRENT_VIEW_PROJECT_OPERATE_DESCRIPTION' 

const initialStates = {
  currentLoginUserId: '',
  currentViewProject: {}
}

const reducer = (state, action) => {
  if (typeof state === 'undefined') state = initialStates;
  switch(action.type) {
    case UPDATE_CURRENT_LOGIN_USER_ID:
      return Object.assign({}, {...state}, {
        currentLoginUserId: action.currentLoginUserId
      })
    case UPDATE_CURRENT_VIEW_PROJECT:
      return Object.assign({}, {...state}, {
        currentViewProject: action.currentViewProject
      })
    case UPDATE_CURRENT_VIEW_PROJECT_DESCRIPTION:
      return Object.assign({}, {...state}, {
        currentViewProject: Object.assign({}, {...state.currentViewProject}, {
          project_description: action.project_description
        })
      })
    case UPDATE_CURRENT_VIEW_PROJECT_OPERATE_DESCRIPTION:
      return Object.assign({}, {...state}, {
        currentViewProject: Object.assign({}, {...state.currentViewProject}, {
          operation_description: action.operation_description
        })
      }) 
    default:
      return state
  }
}

const updateLoginUserId = (currentLoginUserId) => ({
  type: UPDATE_CURRENT_LOGIN_USER_ID,
  currentLoginUserId
})

const updateViewProject = (currentViewProject) => ({
  type: UPDATE_CURRENT_VIEW_PROJECT,
  currentViewProject 
})

const updateViewProjectDescription = (project_description) => ({
  type: UPDATE_CURRENT_VIEW_PROJECT_DESCRIPTION,
  project_description
})

const updateViewProjectOperateDescription = (operation_description) => ({
  type: UPDATE_CURRENT_VIEW_PROJECT_OPERATE_DESCRIPTION,
  operation_description
})

const updateProjectDescription = (project_description) => {
  return dispatch => {
    dispatch(updateViewProjectDescription(project_description))
  }
}

const updateOperateDescription = (operation_description) => {
  return dispatch => {
    dispatch(updateViewProjectOperateDescription(operation_description))
  } 
}

const viewProject = (currentViewProject, currentLoginUserId, vm) => {
  return dispatch => {
    fetchPost(URL_PROJECT_GET_CONTENT, {project: currentViewProject})
      .then(res => res.json())
      .then(json => {
        if(!json.success) {
        }
        const bufferData = toArrayBuffer(json.payload.result.data)
        
        if (!vm.runtime.renderer) {
          const renderer = new Renderer(document.createElement('canvas'));
          vm.attachRenderer(renderer);
        }
        if(!vm.initialized) {
          const audioEngine = new AudioEngine();
          vm.attachAudioEngine(audioEngine);
        }
        if(!vm.runtime.audioEngine) {
          const audioEngine = new AudioEngine();
          vm.attachAudioEngine(audioEngine);
        }
        
        vm.loadProject(bufferData)
        .then(() => {
          dispatch(updateViewProject(currentViewProject))
          dispatch(updateLoginUserId(currentLoginUserId))
          dispatch(push(PATH_PROJECT_VIEW))
        })
        .catch(e => {
          log.error(e)
        })
      })
      .catch(e => {
        console.dir(e)
      })
  }
}

export {
  reducer as default,
  initialStates as projectViewInitialStates,
  viewProject,
  updateProjectDescription,
  updateOperateDescription,
}