import { fork, all } from 'redux-saga/effects';
import userSaga   from './user';

const root = function * root () {
  yield all([
    fork(userSaga),
  ])
}

export default root;