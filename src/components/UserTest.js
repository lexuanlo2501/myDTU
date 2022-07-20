import axios from "axios";
import { useEffect, useState } from "react";

function UserTest() {
    // let data = []
    const [data, setData] = useState([])

    // useEffect(()=> {
    //     axios.get('https://reqres.in/api/users?page=2')
    //     .then((res) => {
    //         console.log('>> check:', res)
    //         // data = res.data.data
    //         setData(res.data.data)
    //         console.log(data)
    //     })
    // }, [])

    useEffect(()=> {
        const fetchData = async () => {
            const res = await axios.get('https://reqres.in/api/users?page=2')
            console.log(res.data.data)
            setData(res.data.data)
        }
        fetchData()
        
        
    }, [])

    const renderInforUser = (data) => {
        return (<ul>
            {data.map((item,index)=>{ 
                return <li key={index}>
                    <p>{item.id}</p>
                    <p>{item.first_name} {item.last_name}</p>
                </li>}
            )}
        </ul>)
    }

    return ( <div>
        <h2>list user</h2>
        {renderInforUser(data)}
    </div> );
}

export default UserTest;