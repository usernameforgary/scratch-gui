import React from 'react'
import { connect } from 'react-redux'

import {injectIntl, intlShape, defineMessages} from 'react-intl';

import UserLoginModalComponent from '../components/user-login-modal/user-login-modal.jsx'
import { 
  SHOW_LOGIN_MODAL,
  LOGIN_ERROR,
  LOGIN_ERROR_MESSAGE,
  toggleLoginModal,
  userLogin,
  userSignUp,
  loginModalChangeTab
} from '../reducers/user-info'

class UserLoginModal extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
      if (!this.props.visible) return null;
      const {
        ...props
      } = this.props
      return (
        <UserLoginModalComponent {...props}>
        </UserLoginModalComponent>
      );
  }
}

const mapStateToProps = state => ({
  isUserLogin: state.scratchGui.userLoginInfo.isUserLogin,
  visible: state.scratchGui.userLoginInfo[SHOW_LOGIN_MODAL],
  loginError: state.scratchGui.userLoginInfo[LOGIN_ERROR],
  loginErrorMessage: state.scratchGui.userLoginInfo[LOGIN_ERROR_MESSAGE]
})

const mapDispatchToProps = dispatch => ({
  onRequestClose: () => dispatch(toggleLoginModal()),
  userLogin: (userInfo) => dispatch(userLogin(userInfo)),
  userSignUp: (userInfo) => dispatch(userSignUp(userInfo)),
  loginModalChangeTab: () => dispatch(loginModalChangeTab()),
})

export default injectIntl(connect(
  mapStateToProps, 
  mapDispatchToProps
)(UserLoginModal))