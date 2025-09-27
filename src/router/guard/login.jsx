import {getToken} from '../../ulits/tool'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const loginGuard = ({children,meta}) => {
     const navigate = useNavigate()
     useEffect(() => {
        const token = getToken()
        if(!token&& meta?.auth){
            alert('请先登录')
            navigate('/login')
        }
     },[meta?.auth])
     return  (
        children
     ) //放行
}
export default loginGuard