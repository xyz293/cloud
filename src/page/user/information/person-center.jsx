import {getId} from '../../../ulits/tool'
import {getFavoriteList,getOrderlist} from '../../../API/product'
import {useEffect} from 'react'
const ProductFavorite = () =>{
    const id = getId()
    console.log(id)
    useEffect(()=>{
        Promise.all([getFavoriteList(id),getOrderlist(id)]).then(([favoriteList,orderList])=>{
            console.log(favoriteList,orderList)
        })
    },[])
    return (
        <div>
            
        </div>
    )
}
export default ProductFavorite;