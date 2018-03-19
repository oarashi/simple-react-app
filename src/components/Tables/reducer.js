import { combineReducers } from 'redux';
import * as types from './constants';

const initialState = {
    tableData: [],
};

export default combineReducers({
    tableData(state = initialState.tableData, action) {
        switch (action.type) {
            case types.TABLES_LOAD_SUCCESS:
                return action.result;
            case types.TABLES_LOAD_FAILURE:
                return {};
            default:
                return state;
        }
    }
})