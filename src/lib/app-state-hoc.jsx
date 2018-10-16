import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import ConnectedIntlProvider from './connected-intl-provider.jsx';
import thunkMiddleware from 'redux-thunk'
import { createBrowserHistory, createHashHistory } from 'history'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import {
  PATH_HOME_PAGE,
  PATH_CREATE_PROJECT,
  PATH_USER_PROJECTS,
  PATH_PROJECT_VIEW,
  PATH_SHARED_PROJECTS,
} from '../const/route-path'

import guiReducer, {guiInitialState, guiMiddleware, initFullScreen, initPlayer} from '../reducers/gui';
import localesReducer, {initLocale, localesInitialState} from '../reducers/locales';

import {setPlayer, setFullScreen} from '../reducers/mode.js';

import locales from 'scratch-l10n';
import {detectLocale} from './detect-locale';

import {ScratchPaintReducer} from 'scratch-paint';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const enhancer = composeEnhancers(guiMiddleware);

const history = createHashHistory()

import HomePage from '../containers/home-page.jsx'
import UserProjects from '../containers/user-projects.jsx'
import ProjectView from '../containers/project-view.jsx'
import SharedProjects from '../containers/shared-projects.jsx'

/*
 * Higher Order Component to provide redux state. If an `intl` prop is provided
 * it will override the internal `intl` redux state
 * @param {React.Component} WrappedComponent - component to provide state for
 * @returns {React.Component} component with redux and intl state provided
 */
const AppStateHOC = function (WrappedComponent) {
  class AppStateWrapper extends React.Component {
    constructor (props) {
      super(props);
      let initializedGui = guiInitialState;
      if (props.isFullScreen) {
        initializedGui = initFullScreen(initializedGui);
      }
      if (props.isPlayerOnly) {
        initializedGui = initPlayer(initializedGui);
      }

      let initializedLocales = localesInitialState;
      const locale = detectLocale(Object.keys(locales));
      if (locale !== 'en') {
        initializedLocales = initLocale(initializedLocales, locale);
      }

      const reducer = combineReducers({
        locales: localesReducer,
        scratchGui: guiReducer,
        scratchPaint: ScratchPaintReducer
      });
      const middlewares = [
        thunkMiddleware,
        routerMiddleware(history)
      ]
      this.store = createStore(
        connectRouter(history)(reducer),
        {
          locales: initializedLocales,
          scratchGui: initializedGui
        },
        composeEnhancers(
          guiMiddleware,
          applyMiddleware(...middlewares)
        )
      );
    }
    componentDidUpdate (prevProps) {
      if (prevProps.isPlayerOnly !== this.props.isPlayerOnly) {
        this.store.dispatch(setPlayer(this.props.isPlayerOnly));
      }
      if (prevProps.isFullScreen !== this.props.isFullScreen) {
        this.store.dispatch(setFullScreen(this.props.isFullScreen));
      }
    }
    render () {
      const {
        isFullScreen, // eslint-disable-line no-unused-vars
        isPlayerOnly, // eslint-disable-line no-unused-vars
        ...componentProps
      } = this.props;
      const ScratchComponent = () => ( 
        <ConnectedIntlProvider>
            <WrappedComponent {...componentProps} />
        </ConnectedIntlProvider>
      )
      return (
        <Provider store={this.store}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path={PATH_HOME_PAGE} component={SharedProjects}/>
              <Route path={PATH_CREATE_PROJECT} component={ScratchComponent}/>
              <Route path={PATH_USER_PROJECTS} component={UserProjects} />
              <Route path={PATH_PROJECT_VIEW} component={ProjectView} />
            </Switch>
          </ConnectedRouter>
        </Provider>
      );
    }
  }
  AppStateWrapper.propTypes = {
    isFullScreen: PropTypes.bool,
    isPlayerOnly: PropTypes.bool
  };
  return AppStateWrapper;
};

export default AppStateHOC;
