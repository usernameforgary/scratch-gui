import React from 'react'
import {connect} from 'react-redux'
import UserProjectsComponent from '../components/user-projects/user-projects.jsx'
import ConnectedIntlProvider from '../lib/connected-intl-provider.jsx'
import {userProjectDelete, userProjectEdit} from '../reducers/user-info'

class UserProjects extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {...props} = this.props
    return (
      <ConnectedIntlProvider>
        <UserProjectsComponent {...props} />
      </ConnectedIntlProvider>
    )
  }
}

const mapStateToProps = state => ({
  user: state.scratchGui.userLoginInfo.userInfo,
  vm: state.scratchGui.vm,
})

const mapDispatchToProps = dispatch => ({
  handleUserProjectDelete: (projectId) => dispatch(userProjectDelete(projectId)),
  handleUserProjectEdit: (project, vm) => dispatch(userProjectEdit(project, vm))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProjects)