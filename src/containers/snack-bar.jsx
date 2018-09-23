import React from 'react'
import {connect} from 'react-redux'
import ConnectedIntlProvider from '../lib/connected-intl-provider.jsx'
import SnackBarComponent from '../components/snack-bar/snack-bar.jsx'
import {updateSnackMessage} from '../reducers/snack-bar'

class SnackBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {...props} = this.props
    return (
      <ConnectedIntlProvider>
        <SnackBarComponent {...props}/>
      </ConnectedIntlProvider>
    )
  }
}
 
const mapStateToProps = state => ({
  open: state.scratchGui.snackBar.open,
  variant: state.scratchGui.snackBar.variant,
  message: state.scratchGui.snackBar.message,
  vertical: state.scratchGui.snackBar.vertical,
  horizontal: state.scratchGui.snackBar.horizontal,
  autoHideDuration: state.scratchGui.snackBar.autoHideDuration
})

const mapDispatchToProps = dispatch => ({
  handleSnackBarClose: () => dispatch(updateSnackMessage())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackBar)