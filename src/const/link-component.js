import React from 'react'
import { Link } from 'react-router-dom'
import {
  PATH_HOME_PAGE,
  PATH_CREATE_PROJECT,
  PATH_USER_PROJECTS,
  PATH_SHARED_PROJECTS,
} from './route-path'

const LINK_HOME_PAGE = props => <Link to={PATH_HOME_PAGE} {...props}></Link>
const LINK_CREATE_PROJECT = props => <Link to={PATH_CREATE_PROJECT} {...props}></Link>
const LINK_USER_PROJECTS = props => <Link to={PATH_USER_PROJECTS} {...props}></Link>
const LINK_SHARED_PROJECTS = props => <Link to={PATH_SHARED_PROJECTS} {...props}></Link>

export {
  LINK_HOME_PAGE,
  LINK_CREATE_PROJECT,
  LINK_USER_PROJECTS,
  LINK_SHARED_PROJECTS,
}