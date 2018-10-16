import React from 'react'
import {connect} from 'react-redux'
import SharedProjectsComponent from '../components/shared-projects/shared-projects.jsx'
import { getSharedProjects } from '../reducers/user-info'
import {userProjectDelete, userProjectEdit, userProjectShare } from '../reducers/user-info'
import {viewProject} from '../reducers/project-view'
import ConnectedIntlProvider from '../lib/connected-intl-provider.jsx';

class SharedProjects extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {...props} = this.props
    return (
      <ConnectedIntlProvider>
        <SharedProjectsComponent {...props}/>
      </ConnectedIntlProvider>
    )
  }
}

const mapStateToProps = state => ({
  sharedProjects: state.scratchGui.userLoginInfo.sharedProjects,
  user: state.scratchGui.userLoginInfo.userInfo,
  vm: state.scratchGui.vm,
})

const mapDispatchToProps = dispatch => ({
  handleUserProjectDelete: (projectId) => dispatch(userProjectDelete(projectId)),
  handleUserProjectShare: (projectId) => dispatch(userProjectShare(projectId)),
  handleUserProjectEdit: (project, vm) => dispatch(userProjectEdit(project, vm)),
  handleViewProject: (project, currentLoginUserId, vm) => dispatch(viewProject(project, currentLoginUserId, vm)),
  getSharedProjects: () => dispatch(getSharedProjects())
})

export default connect(mapStateToProps, mapDispatchToProps)(SharedProjects)