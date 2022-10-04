import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Form = () => {
    const [name, setName] = useState();
    const [allData, setAllData] = useState();

    const onSubmit = () => {
        const data = {
            id: Math.random(),
            name
        }
        axios.post('http://localhost:5000/User', data).then((res) => console.log("res", res)).catch((err) => console.log("err", err))
        setName('')
        getAllData()
    }

    useEffect(() => {
        getAllData()
    }, [])

    const getAllData = async () => {
        await axios.get('http://localhost:5000/User').then((res) => {
            console.log("+++++++++res", res);
            setAllData(res?.data)
        })
    }

    const onDelete = (id) =>{
        axios.delete(`http://localhost:5000/User/${id}`).then((res) => console.log("delete",res))
        getAllData()
    }

    const onEdit = (id) =>{
        const all = allData.filter((i) => i.id === id)
        console.log("all",all);
        axios.put(`http://localhost:5000/User/${id}`,{name:"pratik"})
        getAllData()

    }

    return (
        <>
            <input type="text" placeholder='Please Enter Value' value={name} onChange={(e) => setName(e.target.value)} required />
            <button onClick={() => onSubmit()}>Submit</button>
            <br />
            <br />

            <div style={{ width: "50%" }}>
                <table>
                    <tr>
                        <th style={{ border: "1px solid black", width: "2%" }}>Index</th>
                        <th style={{ border: "1px solid black", width: "5%" }}>Name</th>
                        <th style={{ border: "1px solid black", width: "5%" }}>Action</th>
                    </tr>

                    {allData?.map((i, index) => {
                        return (
                            <tr key={i.id}>
                                <td style={{ border: "1px solid black", width: "2%", textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ border: "1px solid black", width: "5%", textAlign: 'center' }}>{i.name}</td>
                                <td style={{ border: "1px solid black", width: "5%", textAlign: 'center' }}><button onClick={() => onDelete(i.id)} >Delete</button><button onClick={() => onEdit(i.id)}>Edit</button></td>
                            </tr>
                        )
                    })}
                </table>

            </div>
        </>
    )
}

export default Form