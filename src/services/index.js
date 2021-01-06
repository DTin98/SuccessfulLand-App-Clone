import axios from 'axios';
import Define from '../configs/define';
import { store } from '../store';
import _ from 'underscore';


var objectToQueryString = function(obj) {
	var qs = _.reduce(obj, function(result, value, key) {
			return (!_.isNull(value) && !_.isUndefined(value)) ? (result += key + '=' + value + '&') : result;
	}, '').slice(0, -1);
	return qs;
};

var instance = axios.create({
  baseURL: Define.domainApi
});

const checkRequest = async () => {
	if (typeof instance.defaults.baseURL === 'undefined' || typeof instance.defaults.headers['Token'] === 'undefined') {
		const session = await store.getState().common.session;
		console.log(session);
		if (typeof session !== 'undefined' && session.token) {
			if (typeof instance.defaults.headers['Token'] === 'undefined') {
				instance.defaults.headers['Token'] = session.token;
			}
		}
		return true;
	} else {
		return false;
	}
}

export const configAxios = async (baseURL) => {
	instance.defaults.baseURL = baseURL;
}

export const configTokenAxios = async (key) => {
	instance.defaults.headers['Token'] = key;
}

export const clearCookie = async () => {
	delete instance.defaults.headers.common['Cookie'];
	delete instance.defaults.headers['Token'];
}

export const get = async (URL, params = {}, headers = {loading: true}) => {
	await checkRequest();
	return await instance.get(URL, {params: params, headers: headers})
	.then(function(response) {
		//console.log(response.data);
		//console.log(response.status);
		//console.log(response.statusText);
		//console.log(response.headers);
		//console.log(response.config);
		return response.data;
	})
	.catch(function (error) {
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
		console.log(error.config);
		return {'Error': error};
	});
}

export const post = async (URL, data = {}, configs = {withCredentials: true, credentials: 'same-origin'}) => {
	await checkRequest();
	return await instance.post(URL, data, configs)
	.then(function(response) {
		//console.log(response.data);
		//console.log(response.status);
		//console.log(response.statusText);
		//console.log(response.headers);
		//console.log(response.config);
		return response.data;
	})
	.catch(function (error) {
		var msg = '';
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			if (typeof error.response.data.msg !== 'undefined') {
				msg = error.response.data.msg;
			}
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
		console.log(error);
		return {'Error': error, msg: msg};
	});
}

export const getData = async (URL, params = {}) => {
	const session = store.getState().user.session;

	if (typeof session !== 'undefined' && session) {
		params['Token'] = session;
		//URL = URL + '?Token=' + session.token;
	}

	if (!_.isEmpty(params))
	{
		let qs = objectToQueryString(params);
		URL = URL + '?' + qs;
	}

	try {
		let response = await fetch(Define.domainApi + URL, {
			   method: 'get',
		   	//headers: setHeaders(),
		   	//credentials: "include",
		   	//mode: 'no-cors'
		});

		let responseJson = await response.json();
		
		if (response.status === 401) {
			store.dispatch({ type: 'DO_SIGN_OUT', 'msg': responseJson.msg });
		}
  	
  	return responseJson;
	} catch(error) {
      	var msg = '';
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			if (typeof error.response.data.msg !== 'undefined') {
				msg = error.response.data.msg;
			}
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
		console.log(error);
		return {'Error': error, msg: msg};
    }
};

export const getDataInternal = async (URL, params = {}) => {

	const session = store.getState().user.session;
	if (typeof session !== 'undefined' && session) {
		params['Token'] = session;
		//URL = URL + '?Token=' + session.token;
	}

	if (!_.isEmpty(params))
	{
		let qs = objectToQueryString(params);
		URL = URL + '?' + qs;
	}

	try {
		let response = await fetch(URL, {
		   	method: 'get'
		});

		let responseJson = await response.json();
		
		if (response.status === 401) {
			store.dispatch({ type: 'DO_LOGOUT', 'msg': responseJson.msg });
		}
  	
  	return responseJson;
	} catch(error) {
      	var msg = '';
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			if (typeof error.response.data.msg !== 'undefined') {
				msg = error.response.data.msg;
			}
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
		console.log(error);
		return {'Error': error, msg: msg};
    }
};

export const postFormData = async (URL, body) => {
	
	const session = store.getState().user.session;
	if (typeof session !== 'undefined' && session) {
		URL = URL + '?Token=' + session;
	}
	
	try {
		let response = await fetch(Define.domainApi + URL, {
		   	method: 'post',
		   	body: body,
		   	//headers: setHeaders()
		});
		let responseJson = await response.json();

		if (response.status === 401) {
			store.dispatch({ type: 'DO_SIGN_OUT', 'msg': responseJson.msg });
		}
  	
  	return responseJson;
	} catch(error) {
     var msg = '';
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			if (typeof error.response.data.msg !== 'undefined') {
				msg = error.response.data.msg;
			}
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
		console.log(error);
		return {'Error': error, msg: msg};
   }

};

export const postRawData = async (URL, body) => {

	const session = store.getState().common.session;
	
	if (typeof session !== 'undefined' && session.token) {
		URL = URL + '?Token=' + session.token;
	}
	
	try {
		let response = await fetch(Define.domainApi + URL, {
		   	method: 'post',
		   	body: JSON.stringify(body),
		   	headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       }
		});
		let responseJson = await response.json();

		if (response.status === 401) {
			store.dispatch({ type: 'DO_LOGOUT', 'msg': responseJson.msg });
		}
  	
  	return responseJson;
	} catch(error) {
     var msg = '';
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			if (typeof error.response.data.msg !== 'undefined') {
				msg = error.response.data.msg;
			}
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
		console.log(error);
		return {'Error': error, msg: msg};
   }
};