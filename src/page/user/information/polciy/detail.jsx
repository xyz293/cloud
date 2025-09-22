import { useParams } from 'react-router-dom';
import { getPolicyDetail, getComments ,likeCount,addComment} from '../../../../API/policy';
import { useEffect, useState } from 'react';
import { Avatar, Button, Input, Spin, Divider } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import {getUsername} from '../../../../ulits/tool'
const PolicyDetail = () => {
  const { id } = useParams();
  const name = getUsername();
  const [policy, setPolicy] = useState({});
  const [comments, setComments] = useState([]);
  const [input,setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const post =async (policy_id,user_name,content) => {
    const res = await addComment(policy_id,user_name,content);
    console.log(res);
    if(res?.data?.code === 200){
      setInput('');
      setComments([...comments,{
        policy_id:policy_id,
        user_name:user_name,
        content:content,
        like_count:0,
      }])
    }
  }
   const like = async (id,policyid) => {
    const res = await likeCount(id, policyid);
    console.log(res);
    if(res?.data?.code === 200){
       setComments(prev=>prev.map(item=>item.id === id ? {...item,like_count:item.like_count+1} : item))
    }
   
  }
  useEffect(() => {
    setLoading(true);
    Promise.all([getPolicyDetail(id), getComments(id)])
      .then(([policyRes, commentsRes]) => {
        console.log(policyRes,commentsRes);
        setPolicy(policyRes?.data?.data || {});
        setComments(commentsRes?.data?.data || []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '900px', margin: '0 auto' }}>
      {/* 政策详情 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <img
          src={policy.image_url}
          alt={policy.title}
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
        />
        <h2 style={{ textAlign: 'center' }}>政策名称：{policy.title}</h2>
        <p style={{ lineHeight: '1.8', fontSize: '16px' }}>
          <strong>政策内容：</strong> {policy.content}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '14px' }}>
          <span>发布时间：{policy.create_time ? new Date(policy.create_time).toLocaleString() : '未知'}</span>
          <span>发布部门：{policy.department || '未指定'}</span>
        </div>
      </div>

      <Divider />

      {/* 评论区 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3>评论区</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Input placeholder="请输入评论..." style={{ flex: 1 }}  value={input} onChange={e=>setInput(e.target.value)}/>
          <Button type="primary" onClick={()=>post(id,name,input)}>发表评论</Button>
        </div>

        {comments.length > 0 ? (
          comments.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '10px',
                padding: '10px',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <Avatar size={45}>{item.user_name?.[0] || 'U'}</Avatar>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <strong>{item.user_name}</strong>
                  <span style={{ fontSize: '12px', color: '#999' }}>
                    {item.create_time ? new Date(item.create_time).toLocaleString() : ''}
                  </span>
                </div>
                <p style={{ margin: 0 }}>{item.content}</p>
                <Button type="link" icon={<LikeOutlined />} onClick={() => like(item.id, id)}>
                  {item.like_count}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>暂无评论</div>
        )}
      </div>
    </div>
  );
};

export default PolicyDetail;
