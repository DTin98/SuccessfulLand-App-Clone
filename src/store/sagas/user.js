import { call, put, delay, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { store } from 'react-notifications-component';
import * as Request from '../../services';
import { actionTypes } from './../../store/actions/user';

const doSignUp = function* doSignUp (action) {
	try {
		const response = yield call(Request.postFormData, 'auth/local/register', action.data);
		console.log(response)
		if (typeof response.Error !== 'undefined') {
			store.addNotification({ title: "Notification", message: response.msg, type: "danger", insert: "top", container: "top-right", animationIn: ["animated", "fadeIn"], animationOut: ["animated", "fadeOut"], dismiss: { duration: 3000, onScreen: true}});
		} 
		else {
			if (response.jwt) {
				store.addNotification({ title: "Notification", message: "Bạn đã đăng kí thành công!", type: "success", insert: "top", container: "top-right", animationIn: ["animated", "fadeIn"], animationOut: ["animated", "fadeOut"], dismiss: { duration: 3000, onScreen: true } });
			} 
			else {
				toast.error(response.message[0].messages[0].message);
			}
		}
	} 
	catch (e) {
		store.addNotification({ title: "Notification", message: 'Vui lòng thử lại!', type: "danger", insert: "top", container: "top-right", animationIn: ["animated", "fadeIn"], animationOut: ["animated", "fadeOut"], dismiss: { duration: 3000, onScreen: true}});
	}
	yield delay(1000);
}

const doSignIn = function* doSignIn (action) {
	try {
		const response = yield call(Request.postFormData, 'auth/local', action.data);
		if (typeof response.Error !== 'undefined') {
			store.addNotification({ title: "Notification", message: response.msg, type: "danger", insert: "top", container: "top-right", animationIn: ["animated", "fadeIn"], animationOut: ["animated", "fadeOut"], dismiss: { duration: 3000, onScreen: true}});
		} else {
			if (response.jwt) {
				yield call(Request.configTokenAxios, response.jwt);
				yield put({ type: actionTypes.SIGN_IN, isLogout: false, isLogin: true, session: response.jwt });
				//yield put({ type: actionTypes.USER_DATA_ATTR, attr: response.attr });
				//yield put({ type: actionTypes.DO_GET_USERDATA, data: response.rows });
				//yield put({ type: actionTypes.DO_GET_USERDATA});
				store.addNotification({
				  title: "Notification",
				  message: "Chào mừng bạn đã trở lại!",
				  type: "success",
				  insert: "top",
				  container: "top-right",
				  animationIn: ["animated", "fadeIn"],
				  animationOut: ["animated", "fadeOut"],
				  dismiss: {
				    duration: 3000,
				    onScreen: true
				  }
				});
			}
			else {
				yield put({ type: actionTypes.SIGN_OUT, isLogout: true, isLogin: false, session: {} });
				store.addNotification({ title: "Notification", message: response.msg, type: "danger", insert: "top", container: "top-right", animationIn: ["animated", "fadeIn"], animationOut: ["animated", "fadeOut"], dismiss: { duration: 3000, onScreen: true}});
				//toast.info("G9Play is currently in maintenance. Please try again later.");
			}
		}
	} catch (e) {
		toast.info("G9Play is currently in maintenance. Please try again later.");
		yield put({ type: actionTypes.SIGN_OUT, isLogout: true, isLogin: false, session: {} });
	}
	yield delay(1000);
}

const doSignOut = function* doSignOut (action) {

	if (typeof action !== 'undefined' && typeof action.msg !== 'undefined' && action.msg !== '') {
		//toast.error(action.msg, { position: toast.POSITION.BOTTOM_LEFT });
	}

	try {
		yield call(Request.clearCookie);
		yield put({ type: actionTypes.SIGN_OUT, isLogout: true, isLogin: false, session: null });
		//yield put({ type: actionCommonTypes.COMMON_CLEAR});
		//yield put({ type: actionTypes.USER_CLEAR});
		
	} catch (e) {
		yield put({ type: actionTypes.SIGN_OUT, isLogout: true, isLogin: false, session: null });
		//yield put({ type: actionCommonTypes.COMMON_CLEAR});
		//yield put({ type: actionTypes.USER_CLEAR});
	}
}

const userSaga = function* userSaga () {
	yield takeEvery(actionTypes.DO_SIGN_IN, doSignIn);
	yield takeEvery(actionTypes.DO_SIGN_UP, doSignUp);
	yield takeEvery(actionTypes.DO_SIGN_OUT, doSignOut);
}

export default userSaga;

