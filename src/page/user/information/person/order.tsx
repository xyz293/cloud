import {Order} from '../../../../type/person_center/index'
interface Props{
    orderList:Order[];
}
const Orders = ({orderList}:Props) =>{
    console.log(orderList)
    return (
        <div>
            订单
        </div>
    )
}
export default Orders;