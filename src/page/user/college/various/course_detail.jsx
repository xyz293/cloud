import { useParams } from 'react-router-dom';
import { getComment, getCourseDetail ,postComment} from '../../../../API/course';
import { useEffect, useState, useRef } from 'react';
import { Input, Button, Avatar, Card } from 'antd';
import {getId,getUsername} from '../../../../ulits/tool';
const CourseDetail = () => {
  const params = useParams();
  const videoRef = useRef(null);
  const [content, setContent] = useState({});
  const [comment, setComment] = useState([]);
  const id = params.id;
   const user_id = getId();
   const username = getUsername();
  const show = async () => {
    const res = await getCourseDetail(id);
    setContent(res.data.data);
    const res1 = await getComment(id);
    setComment(res1.data.data);
  };
  const [input, setInput] = useState('');
  const post = async (user_id,input,id,username) => {
    const res = await postComment(user_id,input,id,username);
    console.log(res);
    if(res.data.code === 200){
      show();
    }
  }

  useEffect(() => {
    show();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        backgroundColor: '#f5f7fa',
        minHeight: '100vh',
        padding: '30px',
      }}
    >
      {/* 课程标题卡片 */}
      <Card
        style={{
          width: '650px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#1890ff', margin: 0 }}>标题：{content.title}</h2>
      </Card>

      {/* 课程内容卡片 */}
      <Card
        style={{
          width: '650px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ color: '#333', margin: 0 }}>内容：{content.content}</h3>
      </Card>

      {/* 视频区域 */}
      <Card
        style={{
          width: '700px',
          backgroundColor: '#000',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          src={content.video_url}
          controls
          style={{ width: '100%', height: '350px' }}
        ></video>
      </Card>

      {/* 评论输入框 */}
      <Card
        style={{
          width: '650px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          padding: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '20px' }}>
          <Input placeholder="请输入评论" style={{ flex: 1 }} value={input} onChange={(e) => setInput(e.target.value)}/>
          <Button type="primary" onClick={() => post(user_id,input,id,username)}>评论</Button>
        </div>
      </Card>

      {/* 评论区 */}
      <Card
        style={{
          width: '650px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          padding: '20px',
        }}
        title="评论区"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {comment.length === 0 && <div style={{ textAlign: 'center', color: '#999' }}>暂无评论</div>}
          {comment.map((item) => (
            <Card
              key={item.id}
              style={{
                backgroundColor: '#f9fafc',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Avatar style={{ backgroundColor: '#87d068' }}>{item.username[0]}</Avatar>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold' }}>{item.username}</div>
                  <div style={{ color: '#555' }}>{item.content}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>{item.create_time}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CourseDetail;
