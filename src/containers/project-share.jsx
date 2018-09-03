import bindAll from 'lodash.bindall'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { projectName } from '../reducers/menus'
import ProjectShareComponent from '../components/project-share/project-share.jsx'
import {toggleLoginModal} from '../reducers/user-info'

import { fetchPost } from '../lib/fetchApi'
import { URL_SAVE_PROJECT } from '../../urls'
import fetch from 'cross-fetch'

import {
  openSavingProject,
  closeSavingProject 
} from '../reducers/modals'

class ProjectShare extends React.Component {
  constructor(props) {
    super(props)
    bindAll(this, [
      'shareProject'
    ])
  }

  shareProject() {
    if(!this.props.userLoginInfo.isUserLogin) {
      this.props.showLoginModal()
    } else {
      let projectName = this.props.projectName;
      const userId = this.props.userLoginInfo.userInfo.id
      if(!projectName) {
        projectName = `project_${Date.now()}`
      }
      projectName = `${projectName}.sb3`
      if(userId) {
        projectName = `${userId}_${projectName}`
      }
      this.props.openSavingProject()
      this.props.vm.saveProjectSb3().then(content => {
        let data = new FormData()
        data.append('file', content, projectName)
        data.append('userId', userId)
        return fetch(URL_SAVE_PROJECT, {
          method: 'POST',
          body: data
        })
        .then(res => res.json())
        .then(json => {
          if(json.success) {
            this.props.closeSavingProject()
          } else {
            //TODO add some process
            this.props.closeSavingProject()
          }
        })
        .catch(err => {
          console.dir(err)
          this.props.closeSavingProject() 
        })
      })
    }
  }

  render() {
    const {
      ...props
    } = this.props
    return (
      <ProjectShareComponent {...props} shareProject={this.shareProject}/>
    ) 
  }
}

ProjectShare.propTypes = {
  vm: PropTypes.shape({
      saveProjectSb3: PropTypes.func
  }),
  projectName: PropTypes.string,
};

const mapStateToProps = state => ({
  projectName: projectName(state),
  vm: state.scratchGui.vm,
  userLoginInfo: state.scratchGui.userLoginInfo,
})

const mapDispatchToProps = dispatch => ({
  showLoginModal: () => dispatch(toggleLoginModal()),
  openSavingProject: () => dispatch(openSavingProject()),
  closeSavingProject: () => dispatch(closeSavingProject()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(ProjectShare);