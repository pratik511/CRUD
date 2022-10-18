import React, { Fragment } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation();
    const navigation = useNavigate();

    const logout = () => {
        navigation('/login')
        localStorage.removeItem('user')
    }
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link " to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to='/form'>Todo</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {location.pathname === '/login' || location.pathname === '/register' ?
                                    <div className='d-flex'>
                                        <li className="nav-item">
                                            <Link className="nav-link" to='/login'>Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link " to='/register'>Register</Link>
                                        </li>
                                    </div>
                                    : <li className="nav-item">
                                        <button className="btn" onClick={() => logout()} >Logout</button>
                                    </li>
                                }
                            </ul>
                        </form>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Navbar