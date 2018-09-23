import React from 'react'
import HomePageComponent from '../components/home-page/home-page.jsx'
import {defineMessages, FormattedMessage, injectIntl, intlShape, InjectedIntl} from 'react-intl';
import ConnectedIntlProvider from '../lib/connected-intl-provider.jsx';
import { connect } from 'react-redux'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {...props} = this.props
    return (
      <ConnectedIntlProvider>
        <HomePageComponent {...props}/>
      </ConnectedIntlProvider>
    )
  }
}

const dispatchStateToProps = state => ({
  snackBar: state.scratchGui.snackBar
})

export default connect(dispatchStateToProps)(HomePage)