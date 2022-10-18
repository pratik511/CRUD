import React, { Fragment, useState } from 'react'
import './Register.css'
import validator from 'validator';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate= useNavigate();
  const [userData, setUserData] = useState({
    id:Math.random(),
    name: '',
    number: '',
    email: '',
    gender: '',
    hobby: [],
    password: '',
    otherData:[]
  })
  const [userDataError, setUserDataError] = useState({
    errorName: '',
    errorNumber: '',
    errorEmail: '',
    errorGender: '',
    errorHobby: '',
    errorPassword: '',
  })
  console.log("userData", userData);

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "hobby") {
      let dummyArray = [...userData.hobby, value]
      if (userData.hobby.includes(value)) {
        dummyArray = dummyArray.filter((item) => item !== value)
      }
      setUserData({ ...userData, hobby: dummyArray })
    }
    else {
      setUserData({ ...userData, [name]: value })
    }
    validation(name, value)
  }

  const pattern = /[^A-Za-z_./ /]/;
  const validation = (name, value) => {
    if (name === "name") {
      if (!value) {
        setUserDataError({ ...userDataError, errorName: 'Please Enter Name' })
      }
      else if (value.match(pattern)) {
        setUserDataError({ ...userDataError, errorName: 'Name Not Allow Number & Symbol!' })
      } else {
        setUserDataError({ ...userDataError, errorName: '' })
      }
    }
    else if (name === "number") {
      if (!value) {
        setUserDataError({ ...userDataError, errorNumber: 'Please Enter Number' })
      }
      else if ((value.length > 10 || value.length < 10) && value !== 10) {
        setUserDataError({ ...userDataError, errorNumber: 'Enter Valid Number' })
      }
      else {
        setUserDataError({ ...userDataError, errorNumber: '' })
      }
    }
    else if (name === "email") {
      if (!value) {
        setUserDataError({ ...userDataError, errorEmail: 'Please Enter Email' })
      } else if (!validator.isEmail(value)) {
        setUserDataError({ ...userDataError, errorEmail: 'Enter Valid Email' })
      } else {
        setUserDataError({ ...userDataError, errorEmail: '' })
      }
    }
    else if (name === "gender") {
      if (!value) {
        setUserDataError({ ...userDataError, errorGender: 'Gender is Required!' })
      }
      else {
        setUserDataError({ ...userDataError, errorGender: '' })
      }
    }
    else if (name === "hobby") {
      if (!value) {
        setUserDataError({ ...userDataError, errorHobby: 'Hobby is Required!' })
      } else {
        setUserDataError({ ...userDataError, errorHobby: '' })
      }
    }
    else if (name === "password") {
      if (!value) {
        setUserDataError({ ...userDataError, errorPassword: 'Please Enter Password' })
      } else {
        setUserDataError({ ...userDataError, errorPassword: '' })
      }
    }
  }

  const onSubmit = () => {
    let status = true
    let errorNameMsg = ""
    let errorNumberMsg = ""
    let errorEmailMsg = ""
    let errorGenderMsg = ""
    let errorHobbyMsg = ""
    let errorPasswordMsg = ""

    if (userData.name === '' || userData?.name.match(pattern)) {
      errorNameMsg = "Please Enter Name"
      status = false
    }
    if (userData.number === "" || (userData.number.length > 10 || userData.number.length < 10)) {
      errorNumberMsg = "Please Enter Number"
      status = false
    }
    if (userData.email === "" || !validator.isEmail(userData.email)) {
      errorEmailMsg = "Please Enter Email"
      status = false
    }
    if (userData.gender === "") {
      errorGenderMsg = "Please Select Gender"
      status = false
    }
    if (userData.hobby.length === 0) {
      errorHobbyMsg = "Please Select Hobby"
      status = false
    }
    if (userData.password === "") {
      errorPasswordMsg = "Please Enter Password"
      status = false
    }
    if (status) {
      console.log("success");
      axios.post('http://localhost:5000/UserAuth',userData)
      // navigate('/login')
    } else {
      setUserDataError({
        errorName: errorNameMsg,
        errorNumber: errorNumberMsg,
        errorEmail: errorEmailMsg,
        errorGender: errorGenderMsg,
        errorHobby: errorHobbyMsg,
        errorPassword: errorPasswordMsg
      })
    }
  }

  return (
    <Fragment>
      <div className='Register'>
        <div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name='name' onChange={(e) => onChangeValue(e)} />
          </div>
          <div>
            {userDataError.errorName !== "" && (
              <p className="m-0" style={{ color: "red" }}>
                {userDataError.errorName}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Number</label>
            <input type="number" className="form-control" name='number' onChange={(e) => onChangeValue(e)} />
          </div>
          <div>
            {userDataError.errorNumber !== "" && (
              <p className="m-0" style={{ color: "red" }}>
                {userDataError.errorNumber}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Email Id</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={(e) => onChangeValue(e)} />
          </div>
          <div>
            {userDataError.errorEmail !== "" && (
              <p className="m-0" style={{ color: "red" }}>
                {userDataError.errorEmail}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div className="Gender">
              <div className="form-check">
                <input className="form-check-input" type="radio" value='Male' name='gender' onChange={(e) => onChangeValue(e)} />
                <label className="form-check-label" >
                  Male
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" value='Female' name='gender' onChange={(e) => onChangeValue(e)} />
                <label className="form-check-label" >
                  Female
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" value="Other" name='gender' onChange={(e) => onChangeValue(e)} />
                <label className="form-check-label" >
                  Other
                </label>
              </div>
            </div>
          </div>
          <div>
            {userDataError.errorGender !== "" && (
              <p className="m-0" style={{ color: "red" }}>
                {userDataError.errorGender}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Hobby</label>
            <div className='Hobby'>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Criket" id="flexCheckDefault" name='hobby' onChange={(e) => onChangeValue(e)} />
                <label className="form-check-label" >
                  Criket
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Reding" id="flexCheckChecked" name='hobby' onChange={(e) => onChangeValue(e)} />
                <label className="form-check-label" >
                  Reding
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Carrom" id="flexCheckChecked" name='hobby' onChange={(e) => onChangeValue(e)} />
                <label className="form-check-label" >
                  Carrom
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="Movies" id="flexCheckChecked" name='hobby' onChange={(e) => onChangeValue(e)} />
                <label className="form-check-label" >
                  Movies
                </label>
              </div>
            </div>
          </div>
          <div>
            {userDataError.errorHobby !== "" && (
              <p className="m-0" style={{ color: "red" }}>
                {userDataError.errorHobby}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={(e) => onChangeValue(e)} />
          </div>
          <div>
            {userDataError.errorPassword !== "" && (
              <p className="m-0" style={{ color: "red" }}>
                {userDataError.errorPassword}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-primary" onClick={() => onSubmit()}>Submit</button>
        </div>
      </div>
    </Fragment>
  )
}

export default Register