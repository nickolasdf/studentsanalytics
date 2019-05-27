export const types = {
    //--------------Buttons.js
    FIRST_BUTTON:"CLICK_BTN",
    LAST_BUTTON:"CLICK_BTN",
    CHANGE_BUTTONS:"CHANGE_BUTTONS",
    CHANGE_MOVER: "CHANGE_MOVER",
    //-----myTable.js
    COUNT_BUTTONS:"COUNT_BUTTONS",
    BTN_DID_UPDATED: "BTN_DID_UPDATED",
    SORT_DID_MOUNT:"SORT_DID_MOUNT",
    FETCH_AXIOS: "FETCH_AXIOS",
    CHANGE_SORT: "CHANGE_SORT",
    RENDER_TABLE: "RENDER_TABLE",
    SET_FALSE_RENDER:"SET_FALSE_RENDER",
//-------------------------DropMenu.js
    SET_AMOUNT: "SET_AMOUNT",
    //-----------------------Header.js
    SORT_DATA: "SORT_DATA",
    TWICE_CLICK_SORT_DATA: "IF_TWICE_SORT_DATA",
    OPEN_MODAL: "OPEN_MODAL",
    CHANGE_CURRENT_ID: "CHANGE_CURRENT_ID",

   // LOG_OUT: "LOG_OUT"
};
//export const setFalseRender =() => ({type: types.RENDER_TABLE});
export const renderTable =(flag) => ({type: types.RENDER_TABLE, flag:flag});

export const clickFirstButton = () =>({type: types.FIRST_BUTTON});
export const clickLastButton = () => ({type: types.LAST_BUTTON});
export const changeButtons = (i) => ({type: types.CHANGE_BUTTONS, i: i});
export const changeMover = (number) => ({type: types.CHANGE_MOVER, number: number});

export const changeSort = () => ({type: types.CHANGE_SORT});

export const countRows = (i) => ({type: types.COUNT_BUTTONS, i: i});

export const setAmount =(val)=>({type: types.SET_AMOUNT, n: val});
export const SortDidMount =(temp, kind) =>({type: types.SORT_DID_MOUNT, temp: temp, kind: kind});
export const sortClickData = (temp, kind) =>({type: types.SORT_DATA, temp: temp, kind: kind}); //Якшо сортуємо за іншим параметром
export const twiceClickData =(temp) => ({type: types.TWICE_CLICK_SORT_DATA, temp: temp});//Якщо сортуємо за тим самим параметром
export const fetchData=(persons) =>({type: types.FETCH_AXIOS, persons:persons});
export const toggleModal=() =>({type:types.OPEN_MODAL});
export const changeCurrentId = (id) => ({type: types.CHANGE_CURRENT_ID, id: id});
