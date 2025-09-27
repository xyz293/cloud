import { useParams } from 'react-router-dom'
import { getDetailmessage,send } from '../../../../API/message'
import { useEffect, useState } from 'react'
import { sse,sendMessage } from '../../../../API/sse'
import { Avatar, Input, Button } from 'antd'
import { Message } from '../../../../type/message/index'
const SSE = () => {
  const params = useParams()
  const [main, setMain] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('')
  const { id, bossid } = params

  useEffect(() => {
    // 监听 SSE
    const event = sse(Number(id))
    event.onmessage = e => {
        const data= JSON.parse(e.data)
      console.log('新消息:', data.message)
      setMain(prev => [...prev,{
        id: data.id,
        sender_id: Number(bossid),
        receiver_id: Number(id),
        sender_name: 'boss',
        receiver_name: '我',
        content: data.message,
        create_time: new Date(),
      }])

    }
    event.onerror = e => {
      console.error('SSE 连接错误:', e)
    }
    return () => {
      event.close()
    }
  }, [id])

  useEffect(() => {
    // 初始化加载历史消息
    getDetailmessage(Number(id), Number(bossid)).then(res => {
      console.log(res)
      setMain(res.data)
    })
  }, [id, bossid])

  const handleSend = () => {
    send(Number(id),Number(bossid),inputValue,"我","boss").then(res=>{
        console.log(res)
    })
    sendMessage(Number(2), inputValue).then(res => {
      console.log(res)
     setMain(prev => [...prev,{
        id: res.data.id,
        sender_id: Number(id),
        receiver_id: Number(bossid),
        sender_name: '我',
        receiver_name: 'boss',
        content: inputValue,
        create_time: new Date(),
     }])
      setInputValue('')
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#f5f7fa',
      }}
    >
      {/* 聊天内容 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {main.map(item => {
          const isMe = item.sender_id === Number(id)
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                justifyContent: isMe ? 'flex-end' : 'flex-start',
              }}
            >
              {!isMe && (
                <Avatar style={{ backgroundColor: '#1677ff', marginRight: 8 }}>
                  {item.sender_name[0]}
                </Avatar>
              )}
              <div
                style={{
                  background: isMe ? '#1677ff' : '#fff',
                  color: isMe ? '#fff' : '#333',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  maxWidth: '60%',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                {item.content}
              </div>
              {isMe && (
                <Avatar
                  style={{
                    backgroundColor: '#52c41a',
                    marginLeft: 8,
                  }}
                >
                  {item.sender_name[0]}
                </Avatar>
              )}
            </div>
          )
        })}
      </div>

      {/* 输入框 + 发送按钮 */}
      <div
        style={{
          display: 'flex',
          padding: '10px 16px',
          borderTop: '1px solid #ddd',
          background: '#fff',
        }}
      >
        <Input.TextArea
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="输入消息..."
          autoSize={{ minRows: 1, maxRows: 3 }}
          style={{ flex: 1, marginRight: 10 }}
        />
        <Button type="primary" onClick={handleSend}>
          发送
        </Button>
      </div>
    </div>
  )
}

export default SSE
