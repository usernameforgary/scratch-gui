import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Box from '../box/box.jsx'
import {defineMessages, intlShape, FormattedMessage} from 'react-intl'
import bindAll from 'lodash.bindall'
import ReactModalLogin from 'react-modal-login'
import ModalComponent from '../modal/modal.jsx'

const loginMessages = defineMessages({
  loginTitle: {
    id: 'custom.login.loginTitle',
    defaultMessage: 'Sign in/Sign up',
    description: 'Sign in or up form title'
  },
  loginSignInLabel: {
    id: 'custom.login.signInLabel',
    defaultMessage: 'Sign in',
  },
  loginSignUpLabel: {
    id: 'custom.login.signUpLabel',
    defaultMessage: 'Sign Up',
  },
  loginEmail: {
    id: 'custom.common.email',
    defaultMessage: 'Email'
  },
  loginPassword: {
    id: 'custom.common.password',
    defaultMessage: 'Password'
  },
  loginNickname: {
    id: 'custom.common.nickname',
    defaultMessage: 'Nickname'
  },
  loginPhoneNumber: {
    id: 'custom.common.phoneNumber',
    defaultMessage: 'Phone number'
  }
})

class UserLoginModal extends React.Component {
  constructor(props) {
    super(props)
  }

  onLogin() {
    const account = document.querySelector('#account').value;
    const password = document.querySelector('#password').value;

    this.props.userLogin({account: account, password: password})
  }
  
  onRegister() {
    const email = document.querySelector('#account').value;
    const password = document.querySelector('#password').value;
    const username = document.querySelector('#username').value
    this.props.userSignUp({ username: username, email: email, password: password})
  }

  render() {
    return (
      <ModalComponent
        id="userLogin"
        isOpen={this.props.visible}
        fullScreen={true}
        onRequestClose={this.props.onRequestClose}
        contentLabel= {this.props.intl.formatMessage(loginMessages.loginTitle)} 
      >
        <ReactModalLogin
          visible={this.props.visible}
          onCloseModal={this.props.onRequestClose}
          error={this.props.loginError}
          loginError={{
            label: `登录失败, ${this.props.loginErrorMessage}`
          }}
          tabs={{
            afterChange: this.props.loginModalChangeTab,
            loginLabel: '登录',
          }}
          form={{
            onLogin: this.onLogin.bind(this),
            loginBtn: {
              label: this.props.intl.formatMessage(loginMessages.loginSignInLabel)
            },
            loginInputs: [
              {
                containerClass: 'RML-form-group',
                label: this.props.intl.formatMessage(loginMessages.loginPhoneNumber),
                type: 'input',
                inputClass: 'RML-form-control',
                id: 'account',
                name: 'account',
                placeholder: this.props.intl.formatMessage(loginMessages.loginPhoneNumber),
              },
              {
                containerClass: 'RML-form-group',
                label: this.props.intl.formatMessage(loginMessages.loginPassword),
                type: 'password',
                inputClass: 'RML-form-control',
                id: 'password',
                name: 'password',
                placeholder: this.props.intl.formatMessage(loginMessages.loginPassword),
              }
            ],
          }}
        />
      </ModalComponent>
    )
  }
}

export default UserLoginModal