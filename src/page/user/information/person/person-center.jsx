import {getId} from '../../../../ulits/tool'
import {getFavoriteList,getOrderlist} from '../../../../API/product'
import {useEffect,useState} from 'react'

import Order from './order'
import Favorite from './favoirte'
const ProductFavorite = () =>{
    const id = getId()
    console.log(id)
    const [favoriteList,setFavoriteList] = useState([]);
    const [orderList,setOrderList] = useState([]);
    const [showid,setShowid] = useState(1); //1是收藏 2是订单
    const show = (id)=>{
         switch(id){
            case 1:
                return <Favorite favoriteList={favoriteList} />
            case 2:
                return <Order orderList={orderList} />
         }
    }
    useEffect(()=>{
        Promise.all([getFavoriteList(id),getOrderlist(id)]).then(([favoriteList,orderList])=>{
            console.log(favoriteList,orderList)
            setFavoriteList(favoriteList?.data?.data || []);
            setOrderList(orderList?.data?.data || []);
        })
    },[])
    return (
        <div>
            
        </div>
    )
}
export default ProductFavorite;