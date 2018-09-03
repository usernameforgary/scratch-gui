import React from 'react';
import Button from '../button/button.jsx'
import classNames from 'classnames'
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl'
import bindAll from 'lodash.bindall'

import styles from './project-share.css'

class ProjectShare extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      ...props
    } = this.props
    return (
      <Button className={classNames(styles.shareButton)} onClick={this.props.shareProject}>
        <FormattedMessage
            defaultMessage="Share"
            description="Label for project share button"
            id="gui.menuBar.share"
        />
      </Button>
    )
  }
}

export default ProjectShare