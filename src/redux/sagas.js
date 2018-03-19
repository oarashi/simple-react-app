import { fork } from 'redux-saga/effects';
import Tables from 'components/Tables/sagas';


function* rootSaga() {
    yield fork(Tables);

}

export default rootSaga;
