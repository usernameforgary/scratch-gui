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
  }
})

class UserLoginModal extends React.Component {
  constructor(props) {
    super(props)
  }

  onLogin() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    this.props.userLogin({email: email, password: password})
  }
  
  onRegister() {
    const email = document.querySelector('#email').value;
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
            label: `Couldn't sign in, ${this.props.loginErrorMessage}`
          }}
          registerError={{
            label: `Couldn't sign up, ${this.props.loginErrorMessage}`
          }}
          tabs={{
            afterChange: this.props.loginModalChangeTab
          }}
          form={{
            onLogin: this.onLogin.bind(this),
            onRegister: this.onRegister.bind(this),
            // recoverPasswordAnchor: {
            //   label: "Forgot your password?"
            // },
            loginBtn: {
              label: this.props.intl.formatMessage(loginMessages.loginSignInLabel)
            },
            registerBtn: {
              label: this.props.intl.formatMessage(loginMessages.loginSignUpLabel) 
            },
            // recoverPasswordBtn: {
            //   label: "Send new password"
            // },
            loginInputs: [
              {
                containerClass: 'RML-form-group',
                label: this.props.intl.formatMessage(loginMessages.loginEmail),
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: this.props.intl.formatMessage(loginMessages.loginEmail),
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
            registerInputs: [
              {
                containerClass: 'RML-form-group',
                label: this.props.intl.formatMessage(loginMessages.loginNickname),
                type: 'text',
                inputClass: 'RML-form-control',
                id: 'username',
                name: 'username',
                placeholder: this.props.intl.formatMessage(loginMessages.loginNickname),
              },
              {
                containerClass: 'RML-form-group',
                label: this.props.intl.formatMessage(loginMessages.loginEmail),
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: this.props.intl.formatMessage(loginMessages.loginEmail), 
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
            recoverPasswordInputs: [
              {
                containerClass: 'RML-form-group',
                label: this.props.intl.formatMessage(loginMessages.loginEmail),
                type: 'email',
                inputClass: 'RML-form-control',
                id: 'email',
                name: 'email',
                placeholder: this.props.intl.formatMessage(loginMessages.loginEmail),
              },
            ],
          }}
          // separator={{
          //   label: "or"
          // }}
        />
      </ModalComponent>
    )
  }
}

export default UserLoginModal