import classNames from 'classnames'
import React from 'react'
import Button from '../button/button.jsx'
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl'

import styles from './user-login.css';

class UserLoginComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div 
        id="account-nav"
        place="left">
        <Button
          className={classNames(styles.loginButton)}
          onClick={this.props.toggleLoginModal}
        >
            <FormattedMessage
                defaultMessage="Login"
                description="Label for project share button"
                id="custom.login.loginButton"
            />
        </Button> 
      </div>
    );
  }
}

export {
  UserLoginComponent as default
}