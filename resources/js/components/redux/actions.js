export const types = {
    OPEN_POPUP_MENU: "OPEN_POPUP_MENU",
    OPEN_USER_MENU: "OPEN_USER_MENU",
    CHANGE_INFO_SECTION: "CHANGE_INFO_SECTION",
    SIGN_IN: "SIGN_IN",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    LOG_OUT: "LOG_OUT"
};


export const loginFailure = (response) => ({type: types.LOGIN_FAILURE, error: response});
export const signedInSucessfully = (response) => ({type: types.SIGN_IN, response});
export const changeSection = (id) =>({type: types.CHANGE_INFO_SECTION, id: id});