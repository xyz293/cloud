import { Order } from '../../../../../type/person_center/index';
import { deleteOrder } from '../../../../../API/product';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
interface Props {
  orderList: Order[];
}
const OrderMain = ({ orderList }: Props) => {
  const [list, setList] = useState<Order[]>(orderList);
  const navigate = useNavigate();

  useEffect(() => {
    setList(orderList);
  }, [orderList]);

  console.log(list);
  console.log(orderList);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', backgroundColor: '#f7f9fc' }}>
      {list.map((item) => (
        <div
          key={item.product_id}
          style={{
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            backgroundColor: 'white',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(33, 150, 243, 0.15)';
            e.currentTarget.style.backgroundColor = '#e6f4ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.backgroundColor = 'white';
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#333', flex: 1 }}>
            <p style={{ fontWeight: 'bold', fontSize: '16px', margin: 0 }}>{item.product_name}</p>
            <p style={{ margin: 0, color: '#1890ff', fontSize: '15px' }}>￥{item.product_price}</p>
            <p style={{ margin: 0, color: '#666' }}>数量: {item.quantity}</p>
            <p style={{ margin: 0, color: '#999', fontSize: '13px' }}>
              下单时间: {new Date(item.pay_time).toLocaleString()}
            </p>
          </div>

          {/* 右侧：状态 + 操作按钮 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
            <span
              style={{
                fontWeight: 'bold',
                color: item.status === 0 ? '#ff4d4f' : '#52c41a',
                backgroundColor: item.status === 0 ? '#fff1f0' : '#f6ffed',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            >
              {item.status === 0 ? '未支付' : '已支付'}
            </span>

            <Button
              danger
              onClick={
                ()=>{
                    setList(prev=>prev.filter(i=>i.product_id!==item.product_id));
                    deleteOrder(item.product_id).then(res=>{
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    })
                }
              }
            >
              删除订单
            </Button>

            <Button
              type="primary"
              onClick={() => {
                navigate(`/user/information/product/${item.product_id}`);
              }}
            >
              查看详情
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderMain;
