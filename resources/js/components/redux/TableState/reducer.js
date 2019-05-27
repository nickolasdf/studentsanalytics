import {types} from "./tableActions";
import {initialState} from "./initialState";

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FIRST_BUTTON:
            return {
                ...state,
                maxCount: 6,
                startCount: 2,
                current: 1
            };
        case types.LAST_BUTTON:
            return {
                ...state,
                maxCount: state.last - 1,
                startCount: state.last - 5,
                current: state.last
            };
        case types.CHANGE_BUTTONS:
            if (action.i > 4 && action.i < state.last - 2) { //Єслі кнопка не є дійшла до першої чи останньої
                return {
                    ...state,
                    current: action.i,
                    startCount: action.i - 2,
                    maxCount: action.i + 2
                }
            } else if (action.i <= 4) { //Єслі номер кнопки біля першої
                return {
                    ...state,
                    current: action.i,
                    startCount: 2,
                    maxCount: 6
                }}
            else if (action.i >= state.last - 2 && state.last-5>=2) { //Єслі номер кнопки десь біля останньої

                return {
                    ...state,
                    current: action.i,
                    startCount: state.last - 5,
                    maxCount: state.last - 1
                }}
            else if(action.i >=state.last-2 && state.last-5 < 2){
                return{
                    ...state,
                    current: action.i,
                    startCount: 2,
                    maxCount: state.last - 1
                }
            }

            else
                return state;

        case types.CHANGE_MOVER:
            return{...state,
                mover: action.number * state.currentAmount
            };

        case types.COUNT_BUTTONS:

            return {
                ...state,
                last: Math.ceil(action.i /state.currentAmount)
            };


        case types.SET_AMOUNT:  //Перевибор кількості рядів і зброс до 1 сторінки
            return {
                ...state,
                currentAmount: action.n,
                current: 1,
                mover: 0,
                startCount: 2,
                maxCount: 6
            };
        //_________________________________________________________HEADER
      /*  case types.CHANGE_SORT:
            return{
               ...state,
                pushedSort: ! state.pushedSort
            }; */
        case types.SORT_DID_MOUNT:
            return {
                ...state,
                info: action.temp,
                direction: state.direction * -1,
                checking: action.kind
            };
        case types.SORT_DATA:
            return{
                ...state,
                info: action.temp,
                checking: action.kind,
                direction: state.direction * -1
            };
        case types.TWICE_CLICK_SORT_DATA:
            return{
                ...state,
                info: action.temp,
                direction: state.direction * -1
            };
        case types.FETCH_AXIOS:
            return {
                ...state,
                info: action.persons,

            };
        case types.OPEN_MODAL:
            return{
                ...state,
                isModalOpen: !state.isModalOpen
            };
        case types.CHANGE_CURRENT_ID:
            return {
                ...state,
                currentStudentId: action.id
            };
        case types.RENDER_TABLE:
            return{
                ...state,
                rerenderTable: action.flag
            };


        default:
            return state;
    }
};
export default tableReducer;
