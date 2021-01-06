import React, { useState } from 'react'
import './signup.css'
import { store } from 'react-notifications-component';
import validate from './../../configs/validation';
import * as userActions from '../../store/actions/user';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {

    const [userName, setUserName] = useState('')
    const [email, setUserEmail] = useState('')
    const [password, setPassword] = useState('')

    const [username_state, setUserNameState] = useState('')
    const [email_state, setUserEmailState] = useState('')
    const [password_state, setUserPassState] = useState('')

    const dispatch = useDispatch()

    function validation() {

        const username_error = validate('username', userName);
        const email_error = validate('email', email);
        const password_error = validate('password', password);

        if (username_error) {
            //toast.error(username_error);
            store.addNotification({ title: "Notification", message: username_error, type: "danger", insert: "top", container: "top-right", animationIn: ["animated", "fadeIn"], animationOut: ["animated", "fadeOut"], dismiss: { duration: 3000, onScreen: true } });
            return false;
        }

        if (email_error) {
            store.addNotification({ title: "Notification", message: email_error, type: "danger", insert: "top", container: "top-right", animationIn: ["animated", "fadeIn"], animationOut: ["animated", "fadeOut"], dismiss: { duration: 3000, onScreen: true } });
            //toast.error(email_error);
            return false;
        }

        if (password_error) {
            store.addNotification({ title: "Notification", message: password_error, type: "danger", insert: "top", container: "top-right", animationIn: ["animated", "fadeIn"], animationOut: ["animated", "fadeOut"], dismiss: { duration: 3000, onScreen: true } });
            //toast.error(password_error);
            return false;
        }

        setUserNameState(username_error ? false : true);
        setUserEmailState(email_error ? false : true);
        setUserPassState(password_error ? false : true);


        if (username_error || email_error || password_error) {
            return false;
        }

        return true;
    }

    function _creatAccount(e) {
        if (validation()) {
            var form = new FormData();
            form.append('username', userName);
            form.append('email', email);
            form.append('password', password);
            console.log(form)
            dispatch(userActions._doSignUp(form))
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Đăng kí</h5>
                            <form className="form-signin">

                                <div className="form-label-group">
                                    <input type="text" id="username" className="form-control pl-3" placeholder="Tên tài khoản" label="Tên tài khoản" onChange={event => { setUserName(event.target.value) }} />
                                </div>

                                <div className="form-label-group">
                                    <input type="email" id="inputEmail" className="form-control pl-3" placeholder="Địa chỉ email" onChange={event => { setUserEmail(event.target.value) }} />
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control pl-3" placeholder="Mật khẩu" onChange={event => { setPassword(event.target.value) }} />
                                </div>

                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={_creatAccount}>Đăng kí</button>
                                <div className="mt-2" style={{ textAlign: 'center' }}><span >Đã có tài khoản? <a href="/signin" style={{ textDecoration: 'none' }}>Đăng nhập</a></span></div>
                                <hr className="my-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer 
          position="top-right"
          type="default"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          className="toast_new"
        />
        </div>

    )
}