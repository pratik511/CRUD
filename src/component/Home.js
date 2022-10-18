import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'

const Home = () => {
  const [name1, setName] = useState({
    id: Math.random(),
    name: ''
  });

  const [allData, setAllData] = useState()
  const [load, setLoad] = useState(false)
  const [changeValue, setChangeValue] = useState('')
  console.log("changeValue", changeValue);
  const userId = localStorage.getItem('user')
  useEffect(() => {
    axios.get("http://localhost:5000/UserAuth").then((res) => setAllData(res?.data)).catch((error) => console.log("error", error))
  }, [load])

  const myData = allData && allData?.filter((i) => i?.id == userId)
  console.log("myData", myData);

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setName({ ...name1, [name]: value })
  }

  const onSubmit = () => {
    const data = myData[0]?.otherData
    data.push(name1)
    axios.put(`http://localhost:5000/UserAuth/${userId}`, myData[0])
    setName({
      id: Math.random(),
      name: ''
    })
    if (load === true) {
      setLoad(false)
    } else {
      setLoad(true)
    }
  }
  const onDelete = (did) => {
    const data = myData[0]?.otherData.filter((i) => i.id !== did)
    myData[0].otherData = data
    axios.put(`http://localhost:5000/UserAuth/${userId}`, myData[0])
    if (load === true) {
      setLoad(false)
    } else {
      setLoad(true)
    }
  }

  const edit = (i) => {
    setName({
      id: i.id,
      name: i.name
    })
    setChangeValue(i.id)
  }

  const onEdit = () => {
    const data = myData[0]?.otherData.findIndex((i) => i?.id === changeValue)
    myData[0].otherData[data] = name1
    axios.put(`http://localhost:5000/UserAuth/${userId}`, myData[0])
    setName({
      id: Math.random(),
      name: ''
    })
    setChangeValue('')
    if (load === true) {
      setLoad(false)
    } else {
      setLoad(true)
    }
  }

  return (
    <Fragment>
      <input value={name1.name} type="text" placeholder='Please Enter Value' name='name' onChange={(e) => onChangeValue(e)} required />
      <button onClick={() => { !changeValue ? onSubmit() : onEdit() }}> {!changeValue ? "Submit" : "Edit"}</button>
      <br />
      <br />
      <div style={{ width: "50%" }}>
        <table>
          <tr>
            <th style={{ border: "1px solid black", width: "2%", textAlign: 'center' }}>Index</th>
            <th style={{ border: "1px solid black", width: "5%", textAlign: 'center' }}>Name</th>
            <th style={{ border: "1px solid black", width: "5%", textAlign: 'center' }}>Action</th>
          </tr>

          {myData && myData[0]?.otherData.length > 0 ? myData && myData[0]?.otherData?.map((i, index) => {
            return (
              <tr key={i.id}>
                <td style={{ border: "1px solid black", width: "2%", textAlign: 'center' }}>{index + 1}</td>
                <td style={{ border: "1px solid black", width: "5%", textAlign: 'center' }}>{i.name}</td>
                <td style={{ border: "1px solid black", width: "5%", textAlign: 'center' }}><button onClick={() => onDelete(i.id)} >Delete</button><button onClick={() => edit(i)}>Edit</button></td>
              </tr>
            )
          }) : <td colspan="3">
            <h1 className='text-center'>Not Found</h1>
          </td>}
        </table>

      </div>
    </Fragment>
  )
}

export default Home