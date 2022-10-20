import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import './Login.css'
import validator from 'validator';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState({
        errorEmail: '',
        errorPassword: ''
    });
    const [loginUserData, setLoginUserData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/UserAuth").then((res) => setLoginUserData(res?.data)).catch((error) => console.log("error", error))
    }, [])

    const onChangeValue = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
        validation(name, value)
    }
    const validation = (name, value) => {
        if (name === "email") {
            if (!value) {
                setError({ ...error, errorEmail: "Please Valid Email" })
            }
            else if (!validator.isEmail(value)) {
                setError({ ...error, errorEmail: "Enter Valid Email" })
            }
            else {
                setError("")
            }
        }
        else if (name === "password") {
            if (!value) {
                setError({ ...error, errorPassword: "Please Valid Password" })
            } else {
                setError("")
            }
        }
    }
    const handelSubmit = () => {
        const loginData = loginUserData.find((item) => item.email === userData.email && item.password === userData.password)
        if (loginData) {
            navigate('/', { data: loginData })
            localStorage.setItem("user", JSON.stringify(loginData.id))
        }
        else {
            setError({ ...error, errorEmail: "Please Valid Email", errorPassword: "Please Valid Password" })
        }
    }
    return (
        <Fragment>
            <div className='Login'>
                <div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={(e) => onChangeValue(e)} />
                    </div>
                    <div>
                        {error.errorEmail !== "" && (
                            <p className="m-0" style={{ color: "red" }}>
                                {error.errorEmail}
                            </p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={(e) => onChangeValue(e)} />
                    </div>
                    {error.errorPassword !== "" && (
                        <p className="m-0" style={{ color: "red" }}>
                            {error.errorPassword}
                        </p>
                    )}
                    <button type="submit" className="btn btn-primary" onClick={() => handelSubmit()}>Login</button>
                    <Link className="nav-link " to='/register'>Register</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Login