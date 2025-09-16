import {getMyApplication} from '../../../API/application'
import {useEffect, useState} from 'react'
import {getId} from '../../../ulits/tool'
const MyApplication = () => {
    const id =getId()
    const [list,setlist] =useState([])
    console.log(id);
    useEffect(() => {
        getMyApplication(id).then(res => {
            console.log(res)
            setlist(res.data.data)
        })
    },[id])
    return (
        <div style ={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f5f7fa',
            minHeight: '100vh'
        }}>
            {
                list.map(item => (
                    <div key={item.id}>
                       
                    </div>
                ))
            }
        </div>
    )
}
export default MyApplication;