import React, { useState } from 'react'
import './signin.css'
import validate from '../../configs/validation';
import { useSelector, useDispatch } from 'react-redux'
import * as userActions from '../../store/actions/user'
import { Link, Redirect } from 'react-router-dom';

export default function Signin() {
    const [userName, setUserName] = useState('')
    const [userPass, setUserPass] = useState('')

    const [user_name_state, setUserNameState] = useState('')
    const [user_pass_state, setUserPassState] = useState('')

    const isLogin = useSelector(state => state.user.isLogin);

    const dispatch = useDispatch();

    if (isLogin) {
        return (
            <Redirect to="/" />
        )
    }

    function validation() {
        const user_name_error = validate('id', userName);
        const user_pass_error = validate('password', userPass);


        setUserNameState(user_name_error ? false : true);
        setUserPassState(user_pass_error ? false : true);

        if (user_name_error || user_pass_error) {
            return false;
        }

        return true;
    }

    function _Login() {
        if (validation()) {
            var form = new FormData();
            form.append('identifier', userName);
            form.append('password', userPass);
            dispatch(userActions._doSignIn(form))
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h5 className="card-title text-center">Đăng nhập</h5>
                            <form className="form-signin">
                                <div className="form-label-group">
                                    <input type="text" id="inputEmail" className="form-control pl-3" placeholder="Tên đăng nhập" onChange={event => { setUserName(event.target.value) }} />
                                </div>


                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control pl-3" onChange={event => { setUserPass(event.target.value) }} placeholder="Mật khẩu" />
                                </div>

                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={_Login}>Đăng nhập</button>
                                <div className="mt-2" style={{ textAlign: 'center' }}><span >Chưa có tài khoản? <a href="/signup" style={{ textDecoration: 'none' }}>Đăng kí</a> ngay</span></div>
                                <hr className="my-4" />
                                <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Đăng nhập với Google</button>
                                <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Đăng nhập với Facebook</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}