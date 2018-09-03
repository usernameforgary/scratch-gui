const OPEN_MENU = 'scratch-gui/menus/OPEN_MENU';
const CLOSE_MENU = 'scratch-gui/menus/CLOSE_MENU';
const CHANGE_PROJECT_NAME = 'scratch-gui/menus/CHANGE_PROJECT_NAME';
const SHARE_PROJECT = 'scratch-gui/menus/SHARE_PROJECT';

const MENU_FILE = 'fileMenu';
const MENU_EDIT = 'editMenu';
const MENU_LANGUAGE = 'languageMenu';
const COMMUNITY = 'enableCommunity';
const PROJECT_NAME = 'projectName';

const initialState = {
    [MENU_FILE]: false,
    [MENU_EDIT]: false,
    [MENU_LANGUAGE]: false,
    [COMMUNITY]: true,
    [PROJECT_NAME]: '',
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case OPEN_MENU:
        return Object.assign({}, state, {
            [action.menu]: true
        });
    case CLOSE_MENU:
        return Object.assign({}, state, {
            [action.menu]: false
        });
    case CHANGE_PROJECT_NAME:
        return Object.assign({}, state, {
           [PROJECT_NAME]: action.projectName
        });
    default:
        return state;
    }
};
const openMenu = menu => ({
    type: OPEN_MENU,
    menu: menu
});
const closeMenu = menu => ({
    type: CLOSE_MENU,
    menu: menu
});
const changeProjectName = value => ({
    type: CHANGE_PROJECT_NAME,
    projectName: value
})
const openFileMenu = () => openMenu(MENU_FILE);
const closeFileMenu = () => closeMenu(MENU_FILE);
const fileMenuOpen = state => state.scratchGui.menus[MENU_FILE];
const openEditMenu = () => openMenu(MENU_EDIT);
const closeEditMenu = () => closeMenu(MENU_EDIT);
const editMenuOpen = state => state.scratchGui.menus[MENU_EDIT];
const openLanguageMenu = () => openMenu(MENU_LANGUAGE);
const closeLanguageMenu = () => closeMenu(MENU_LANGUAGE);
const languageMenuOpen = state => state.scratchGui.menus[MENU_LANGUAGE];
const enableCommunity = state => state.scratchGui.menus[COMMUNITY];
const projectName = state => state.scratchGui.menus[PROJECT_NAME];
const setProjectName = value => changeProjectName(value);

export {
    reducer as default,
    initialState as menuInitialState,
    openFileMenu,
    closeFileMenu,
    openEditMenu,
    closeEditMenu,
    openLanguageMenu,
    closeLanguageMenu,
    fileMenuOpen,
    editMenuOpen,
    languageMenuOpen,
    enableCommunity,
    projectName,
    setProjectName,
};
