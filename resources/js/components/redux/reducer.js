import {types} from './actions'

const initialState = {
    isPopupBtnClicked: false,
    isUserMenuOpened: false,
    currentInfoSection: "Реєстрація",
    isSignedIn: false,
    userInfo: {}
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_POPUP_MENU:
            return {
                ...state,
                isPopupBtnClicked: !state.isPopupBtnClicked
            };
        case types.OPEN_USER_MENU:
            return {
                ...state,
                isUserMenuOpened: !state.isUserMenuOpened
            };
        case types.CHANGE_INFO_SECTION:
            return {
                ...state,
                currentInfoSection: action.id,
                isPopupBtnClicked: !state.isPopupBtnClicked

            };

        case types.SIGN_IN:
         //   const {profileObj} = action.response;
            return {
                ...state,
                isSignedIn: !state.isSignedIn
              //  userInfo: profileObj
            };

      /*  case types.LOGIN_FAILURE:
            console.log("Login Error");
            console.log(action.error);
            return state;*/

        case types.LOG_OUT:
            return {
                isSignedIn: !state.isSignedIn,
                isPopupBtnClicked: false,
                isUserMenuOpened: false,
                currentInfoSection: "Реєстрація",
                userInfo: {}
            };
        default:
            return state;
    }
};

export default mainReducer;
