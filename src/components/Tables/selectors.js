import { createStructuredSelector } from 'reselect';

import REDUCER from './constants';

const tableData = state => state[REDUCER].tableData;

export default createStructuredSelector({
    tableData,
})