import { useEffect, useState } from 'react'
import { getId } from '../../../../ulits/tool'
import { getMyMessage, deleteMessage } from '../../../../API/message'
import { Button, Avatar, Card, Space, Typography } from 'antd'
import {useNavigate} from 'react-router-dom'
const { Text } = Typography

const MyApplication = () => {
  const id = getId()
  const [list, setList] = useState([])
   const usenavigate =useNavigate()
  useEffect(() => {
    getMyMessage(id).then(res => {
      console.log(res)
      setList(res.data)
    })
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '30px 0',
        background: '#f5f7fa',
        minHeight: '100vh',
      }}
    >
      {list.map(item => (
        <Card
          key={item.id}
          style={{
            width: '80%',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            background: '#fff',
          }}
          bodyStyle={{ display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          {/* 左侧头像 */}
          <Avatar
            size={56}
            style={{ backgroundColor: '#1677ff', fontSize: '20px' }}
          >
            {item.receiver_name[0]}
          </Avatar>

          {/* 中间内容 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Text strong style={{ fontSize: '16px', marginBottom: '8px' }}>
              {item.receiver_name}
            </Text>
            <Text style={{ color: '#666' }}>{item.content}</Text>
          </div>

          {/* 右侧时间 + 按钮 */}
          <Space direction="vertical" align="end">
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {new Date(item.created_at).toLocaleString()}
            </Text>
            <Space>
              <Button type="default" size="small"
              onClick={()=>{
                usenavigate(`/user/company/my_application/${item.sender_id}/${item.receiver_id}`)
              }}
              >
                详情
              </Button>
              <Button
                type="primary"
                danger
                size="small"
                onClick={() => {
                  setList(prev => prev.filter(i => i.id !== item.id))
                  deleteMessage(item.id).then(res => console.log(res))
                }}
              >
                删除
              </Button>
            </Space>
          </Space>
        </Card>
      ))}
    </div>
  )
}

export default MyApplication
