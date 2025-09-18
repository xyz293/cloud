import { getCollege } from '../../../../API/university'
import { useContext, useEffect, useState } from 'react'
import { Button } from 'antd'
import { departmentContext } from '../../../../ulits/content'
import { useNavigate } from 'react-router-dom';
const College = () => {
  const id = useContext(departmentContext);
  const [college, setCollege] = useState([])
  const navigate = useNavigate();
  const show = async () => {
    const res = await getCollege(id)
    console.log(res)
    setCollege(res.data.data)
  }

  useEffect(() => {
    show()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5', 
        minHeight: '100vh'
      }}
    >
      {college.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff', // 卡片背景
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // 阴影
            width: '800px', // 卡片宽度
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <img
              src={item.logo}
              style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'contain' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
              <div><strong>学院名称:</strong> {item.name}</div>
              <div><strong>学院描述:</strong> {item.description}</div>
              <div><strong>学院联系邮箱:</strong> {item.email}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
              <div><strong>学院地址:</strong> {item.address}</div>
              <div><strong>联系电话:</strong> {item.phone}</div>
              <div>
                <Button type='primary' onClick={() => navigate(`/user/college/detail/${id}/college_detail/${item.id}`)}>获取详情</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default College;
