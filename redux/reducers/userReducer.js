import { UPDATED_DATA_USER } from '../constants/appConstants';
const initialState = {
    address: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATED_DATA_USER:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}