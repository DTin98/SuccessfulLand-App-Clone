import React from 'react'
import './header.css'
import { Link } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import { useSelector, useDispatch } from 'react-redux'

export default function Header() {
    const isLogin = useSelector(state => state.user.isLogin);

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="#">
                <img src="/img/logo.png" style={{width:'70%'}}></img>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    {isLogin ?
                        <li className="nav-item active mr-3">
                            <img src="/img/User.svg" className="btn avartar"/>
                    </li>
                        : <>
                            <li className="nav-item active mr-3">
                                <Link to="/signin">  <button type="button" className="btn btn-danger">Đăng nhập</button></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup">   <button type="button" className="btn btn-success">Đăng kí</button></Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>

    )
}