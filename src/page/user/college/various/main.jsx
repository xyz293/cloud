import {useContext,useEffect} from 'react';
import {departmentContext} from '../../../../ulits/content'
import {detail} from '../../../../API/university'
const Main = () => {
    const id = useContext(departmentContext);
    console.log(id)
    useEffect(()=>{
      detail(id).then((res)=>{
        console.log(res)
      })
    },[id])
    return (
       <div>
         cao
       </div>
    )
}
export default Main;