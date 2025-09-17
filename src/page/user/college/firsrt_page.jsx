import { useContext, useEffect, useState } from 'react';
import { contentContext } from '../../../ulits/content';
import { Input, Button, Avatar, Card, Space, Tag } from 'antd';
import { search } from '../../../API/university';
import { useNavigate } from 'react-router-dom';
const FirstPage = () => {
   const navigate = useNavigate();
  const { list } = useContext(contentContext);
  const [college, setCollege] = useState(list);
  const [key, setKey] = useState('');
   console.log(list)
  useEffect(()=>{
    setCollege(list)
  },[list])

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* 搜索框 */}
      <Space style={{ marginBottom: '30px', width: '100%', justifyContent: 'center' }}>
        <Input
          placeholder="请输入学校名称、类型或地址"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ width: '400px', borderRadius: '8px' }}
          allowClear
        />
        <Button type="primary" onClick={()=>{
          search(key).then((res) => {
           console.log(res)
           setCollege(res.data.data)
           setKey('')
          });
        }} style={{ borderRadius: '8px' }}>
          搜索
        </Button>
      </Space>
    <div style={{display:'flex',flexWrap: 'wrap', gap: '40px',width:'1400px'}}>
       {college.map(item=>(
      <div key={item.id} style={{display:'flex',width :'300px',justifyContent:'space-between',padding:'20px',border: '1px solid #eee',      // 边框
                borderRadius: '12px',           // 圆角
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)', // 阴影
                backgroundColor: '#fff',}}>
         <div style={{display:'flex',flexDirection: 'column',gap:'20px',alignItems:'flex-start'}}>
           <Avatar src={item.avatar} alt={item.name} size={90} />
           <div>学校名称：{item.name}</div>
           <div>学校类型：{item.university_type}</div>
           <div>学校特色：{item.extra_info}</div>
      </div>
       <div style={{display:'flex',flexDirection: 'column',alignItems:'flex-end',gap:'40px',marginTop:'70px'}}>

         <Button type="primary" onClick={()=>navigate(`/user/college/detail/${item.id}`)}>查看详情</Button>
       <div>
          学校网址：<a href={item.website} target="_blank" rel="noopener noreferrer">
          {item.website}
        </a>
        </div>
        </div>
        </div>
       
     ))}
    </div>
    
    </div>
  );
};

export default FirstPage;
