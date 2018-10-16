import classNames from 'classnames';
import {connect} from 'react-redux';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import React from 'react';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import {ComingSoonTooltip} from '../coming-soon/coming-soon.jsx';
import Divider from '../divider/divider.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';
import ProjectLoader from '../../containers/project-loader.jsx';
import Menu from '../../containers/menu.jsx';
import {MenuItem, MenuSection} from '../menu/menu.jsx';
import ProjectSaver from '../../containers/project-saver.jsx';
import DeletionRestorer from '../../containers/deletion-restorer.jsx';
import TurboMode from '../../containers/turbo-mode.jsx';
import UserLoginInfo from "../../containers/user-login-info.jsx";
import ProjectShare from '../../containers/project-share.jsx';

import { openTipsLibrary } from '../../reducers/modals';
import { setPlayer } from '../../reducers/mode';
import { userSaveProject } from '../../reducers/user-info'
import {
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openLanguageMenu,
    closeLanguageMenu,
    languageMenuOpen,
    enableCommunity,
    projectName,
    setProjectName
} from '../../reducers/menus';

import styles from './menu-bar.css';

import helpIcon from '../../lib/assets/icon--tutorials.svg';
import mystuffIcon from './icon--mystuff.png';
import feedbackIcon from './icon--feedback.svg';
import profileIcon from './icon--profile.png';
import communityIcon from './icon--see-community.svg';
import dropdownCaret from '../language-selector/dropdown-caret.svg';
import languageIcon from '../language-selector/language-icon.svg';

import scratchLogo from './scratch-logo.svg';
import kuDingLogo from './kuding-logo.svg';

const ariaMessages = defineMessages({
    language: {
        id: 'gui.menuBar.LanguageSelector',
        defaultMessage: 'language selector',
        description: 'accessibility text for the language selection menu'
    },
    tutorials: {
        id: 'gui.menuBar.tutorialsLibrary',
        defaultMessage: 'Tutorials',
        description: 'accessibility text for the tutorials button'
    },
    inputPlaceholder: {
        id: 'custom.projectName.inputPlaceholder',
        defaultMessage: 'Please input project name',
        description: 'accessibility text for the project input place holder'
    }
});

const MenuBarItemTooltip = ({
    children,
    className,
    enable,
    id,
    place = 'bottom'
}) => {
    if (enable) {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
    return (
        <ComingSoonTooltip
            className={classNames(styles.comingSoon, className)}
            place={place}
            tooltipClassName={styles.comingSoonTooltip}
            tooltipId={id}
        >
            {children}
        </ComingSoonTooltip>
    );
};


MenuBarItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    enable: PropTypes.bool,
    id: PropTypes.string,
    place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

const MenuItemTooltip = ({id, children, className}) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        place="right"
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string
};

const MenuBarMenu = ({
    children,
    onRequestClose,
    open,
    place = 'right'
}) => (
    <Menu
        className={styles.menu}
        open={open}
        place={place}
        onRequestClose={onRequestClose}
    >
        {children}
    </Menu>
);

MenuBarMenu.propTypes = {
    children: PropTypes.node,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    place: PropTypes.oneOf(['left', 'right'])
};
class MenuBar extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleLanguageMouseUp',
            'handleRestoreOption',
            'handleProjectNameChange',
            'handleProjectSave'
        ]);
    }
    handleLanguageMouseUp (e) {
        if (!this.props.languageMenuOpen) {
            this.props.onClickLanguage(e);
        }
    }
    handleRestoreOption (restoreFun /* eslint-disable-line no-unused-vars */) {
        return () => {
            // restoreFun(); TODO re-enable this when validation issues are fixed
            this.props.onRequestCloseEdit();
        };
    }
    handleProjectNameChange(e) {
        this.props.onProjectNameChange(e.target.value);
    }
    handleProjectSave() {
      const {isUserLogin, projectName, userId, vm, projectId} = this.props
      this.props.onProjectSave(isUserLogin, projectName, userId, vm, false, projectId)
    }
    render () {
        return (
            <Box className={styles.menuBar}>
                <div className={styles.mainMenu}>
                    <div className={styles.fileGroup}>
                        <div className={classNames(styles.menuBarItem)}>
                            <img
                                alt="Scratch"
                                className={styles.scratchLogo}
                                draggable={false}
                                src={kuDingLogo}
                            />
                        </div>
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.languageMenuOpen
                            })}
                            onMouseUp={this.handleLanguageMouseUp}
                        >
                            {/* @TODO: remove coming soon tooltip wrapper  https://github.com/LLK/scratch-gui/issues/2664  */}
                            <MenuBarItemTooltip
                                enable
                                id="menubar-selector"
                                place="right"
                            >
                                <div
                                    aria-label={this.props.intl.formatMessage(ariaMessages.language)}
                                    className={classNames(styles.languageMenu)}
                                >
                                    <img
                                        className={styles.languageIcon}
                                        src={languageIcon}
                                    />
                                    <img
                                        className={styles.dropdownCaret}
                                        src={dropdownCaret}
                                    />
                                </div>
                                <MenuBarMenu
                                    open={this.props.languageMenuOpen}
                                    onRequestClose={this.props.onRequestCloseLanguage}
                                >
                                    <LanguageSelector />
                                </MenuBarMenu>

                            </MenuBarItemTooltip>
                        </div>
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.fileMenuOpen
                            })}
                            onMouseUp={this.props.onClickFile}
                        >
                            <div className={classNames(styles.fileMenu)}>
                                <FormattedMessage
                                    defaultMessage="File"
                                    description="Text for file dropdown menu"
                                    id="gui.menuBar.file"
                                />
                            </div>
                            <MenuBarMenu
                                open={this.props.fileMenuOpen}
                                onRequestClose={this.props.onRequestCloseFile}
                            >
                                {/* <MenuSection>
                                    <MenuItem onClick={this.handleNewClick}>
                                        <FormattedMessage
                                            defaultMessage="New"
                                            description="Menu bar item for creating a new project"
                                            id="gui.menuBar.new"
                                        />
                                    </MenuItem>
                                </MenuSection> */}
                                <MenuSection>
                                  <MenuItem onClick={this.handleProjectSave}>
                                    <FormattedMessage
                                      defaultMessage="Save now"
                                      description="Menu bar item for saving now"
                                      id="gui.menuBar.saveNow"
                                    />
                                  </MenuItem>
                                  {/* <MenuItem onClick={this.handleSaveCopy}>
                                    <FormattedMessage
                                      defaultMessage="Save as a copy"
                                      description="Menu bar item for saving as a copy"
                                      id="gui.menuBar.saveAsCopy"
                                    />
                                  </MenuItem> */}
                                </MenuSection>
                                <MenuSection>
                                    <ProjectLoader>{(renderFileInput, loadProject, loadProps) => (
                                        <MenuItem
                                            onClick={loadProject}
                                            {...loadProps}
                                        >
                                            <FormattedMessage
                                                defaultMessage="Load from your computer"
                                                description="Menu bar item for uploading a project from your computer"
                                                id="gui.menuBar.uploadFromComputer"
                                            />
                                            {renderFileInput()}
                                        </MenuItem>
                                    )}</ProjectLoader>
                                    <ProjectSaver>{(saveProject, saveProps) => (
                                        <MenuItem
                                            onClick={saveProject}
                                            {...saveProps}
                                        >
                                            <FormattedMessage
                                                defaultMessage="Save to your computer"
                                                description="Menu bar item for downloading a project to your computer"
                                                id="gui.menuBar.downloadToComputer"
                                            />
                                        </MenuItem>
                                    )}</ProjectSaver>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>
                        <div
                            className={classNames(styles.menuBarItem, styles.hoverable, {
                                [styles.active]: this.props.editMenuOpen
                            })}
                            onMouseUp={this.props.onClickEdit}
                        >
                            <div className={classNames(styles.editMenu)}>
                                <FormattedMessage
                                    defaultMessage="Edit"
                                    description="Text for edit dropdown menu"
                                    id="gui.menuBar.edit"
                                />
                            </div>
                            <MenuBarMenu
                                open={this.props.editMenuOpen}
                                onRequestClose={this.props.onRequestCloseEdit}
                            >
                                <MenuSection>
                                    <TurboMode>{(toggleTurboMode, {turboMode}) => (
                                        <MenuItem onClick={toggleTurboMode}>
                                            {turboMode ? (
                                                <FormattedMessage
                                                    defaultMessage="Turn off Turbo Mode"
                                                    description="Menu bar item for turning off turbo mode"
                                                    id="gui.menuBar.turboModeOff"
                                                />
                                            ) : (
                                                <FormattedMessage
                                                    defaultMessage="Turn on Turbo Mode"
                                                    description="Menu bar item for turning on turbo mode"
                                                    id="gui.menuBar.turboModeOn"
                                                />
                                            )}
                                        </MenuItem>
                                    )}</TurboMode>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>
                    </div>
                    <Divider className={classNames(styles.divider)} />
                    <div
                        aria-label={this.props.intl.formatMessage(ariaMessages.tutorials)}
                        className={classNames(styles.menuBarItem, styles.hoverable)}
                        onClick={this.props.onOpenTipLibrary}
                    >
                        <img
                            className={styles.helpIcon}
                            src={helpIcon}
                        />
                        <FormattedMessage {...ariaMessages.tutorials} />
                    </div>
                    <Divider className={classNames(styles.divider)} />
                    <div className={classNames(styles.menuBarItem)}>
                        <input
                            value={this.props.projectName}
                            onChange={this.handleProjectNameChange}
                            className={classNames(styles.titleField)}
                            placeholder={this.props.intl.formatMessage(ariaMessages.inputPlaceholder)}
                        />
                    </div>
                    {/* <div className={classNames(styles.menuBarItem)}>
                        <ProjectShare />
                    </div> */}
                    {/* <div className={classNames(styles.menuBarItem, styles.communityButtonWrapper)}>
                        {this.props.enableCommunity ?
                            <Button
                                className={classNames(styles.communityButton)}
                                iconClassName={styles.communityButtonIcon}
                                iconSrc={communityIcon}
                                onClick={this.props.onSeeCommunity}
                            >
                                <FormattedMessage
                                    defaultMessage="See Community"
                                    description="Label for see community button"
                                    id="gui.menuBar.seeCommunity"
                                />
                            </Button> :
                            <MenuBarItemTooltip id="community-button">
                                <Button
                                    className={classNames(styles.communityButton)}
                                    iconClassName={styles.communityButtonIcon}
                                    iconSrc={communityIcon}
                                >
                                    <FormattedMessage
                                        defaultMessage="See Community"
                                        description="Label for see community button"
                                        id="gui.menuBar.seeCommunity"
                                    />
                                </Button>
                            </MenuBarItemTooltip>
                        }
                    </div> */}
                </div>
                <div className={classNames(styles.menuBarItem, styles.feedbackButtonWrapper)}>
                    <a
                        className={styles.feedbackLink}
                        href="https://scratch.mit.edu/discuss/57/"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <Button
                            className={styles.feedbackButton}
                            iconSrc={feedbackIcon}
                        >
                            <FormattedMessage
                                defaultMessage="Give Feedback"
                                description="Label for feedback form modal button"
                                id="gui.menuBar.giveFeedback"
                            />
                        </Button>
                    </a>
                </div>
                <div className={classNames(styles.menuBarItem, styles.accountInfoWrapper)}>
                    <UserLoginInfo />
                </div>
            </Box>
        );
    }
}

MenuBar.propTypes = {
    editMenuOpen: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    fileMenuOpen: PropTypes.bool,
    intl: intlShape,
    languageMenuOpen: PropTypes.bool,
    onClickEdit: PropTypes.func,
    onClickFile: PropTypes.func,
    onClickLanguage: PropTypes.func,
    onOpenTipLibrary: PropTypes.func,
    onRequestCloseEdit: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    onRequestCloseLanguage: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onProjectSave: PropTypes.func,
    editingProject: PropTypes.shape({
      projectData: PropTypes.any,
      projectId: PropTypes.any
    }),
};

const mapStateToProps = state => ({
  fileMenuOpen: fileMenuOpen(state),
  editMenuOpen: editMenuOpen(state),
  languageMenuOpen: languageMenuOpen(state),
  enableCommunity: enableCommunity(state),
  projectName: projectName(state),
  vm: state.scratchGui.vm,
  isUserLogin: state.scratchGui.userLoginInfo.isUserLogin,
  userId: state.scratchGui.userLoginInfo.userInfo._id,
  projectId: state.scratchGui.userLoginInfo.editingProject.projectId,
});

const mapDispatchToProps = dispatch => ({
  onOpenTipLibrary: () => dispatch(openTipsLibrary()),
  onClickFile: () => dispatch(openFileMenu()),
  onRequestCloseFile: () => dispatch(closeFileMenu()),
  onClickEdit: () => dispatch(openEditMenu()),
  onRequestCloseEdit: () => dispatch(closeEditMenu()),
  onClickLanguage: () => dispatch(openLanguageMenu()),
  onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
  onSeeCommunity: () => dispatch(setPlayer(true)),
  onProjectNameChange: (value) => dispatch(setProjectName(value)),
  onProjectSave: (isUserLogin, projectName, userId, vm, saveAsCopy, projectId) => dispatch(userSaveProject(isUserLogin, projectName, userId, vm, saveAsCopy, projectId))
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar));
