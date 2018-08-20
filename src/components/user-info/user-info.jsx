import classNames from 'classnames'
import React from 'react'

import styles from './user-info.css'

import profileIcon from './icon--profile.png'
import dropdownCaret from '../language-selector/dropdown-caret.svg'

class UserInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div
            id="account-nav"
            place="left"
        >
            <div
                className={classNames(
                    styles.menuBarItem,
                    styles.hoverable,
                    styles.accountNavMenu
                )}
            >
                <img
                    className={styles.profileIcon}
                    src={profileIcon}
                />
                <span>
                    {'scratch-cat' /* @todo username */}
                </span>
                <img
                    className={styles.dropdownCaretIcon}
                    src={dropdownCaret}
                />
            </div>
        </div>
    )
  }
}

export default UserInfo 