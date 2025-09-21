import { getPolicy } from '../../../../API/policy';
import { get_policy } from '../../../../API/information_tags';
import { Input, Button, Collapse, Spin, Card } from 'antd';
import { useEffect, useState } from 'react';
import {searchPolicy} from '../../../../API/policy';
import { useNavigate } from 'react-router-dom';
const Policy = () => {
  const navigate = useNavigate();
  const [policy, setPolicy] = useState([]);
  const [tag, setTag] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Panel } = Collapse;
  const [key, setKey] = useState('');
  useEffect(() => {
    setLoading(true);
    Promise.all([getPolicy(), get_policy()])
      .then(([policyRes, tagRes]) => {
        setPolicy(policyRes?.data?.data || []);
        setTag(tagRes?.data?.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
      {/* 搜索框区域 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
        <Input placeholder="请输入搜索内容" style={{ width: '400px' }} value={key} onChange={(e)=>setKey(e.target.value)}/>
        <Button type="primary" onClick={()=>{
            searchPolicy(key).then((res) => {
                console.log(res);
                setPolicy(res?.data?.data || []);
            })
        }}>搜索</Button>
      </div>

      {/* 政策标签区域 */}
      <Collapse defaultActiveKey={['1']}>
        <Panel key="1" header="政策标签">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Spin />
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {tag.length > 0 ? (
                tag.map((item) => (
                  <Button key={item.id} type="link">
                    {item.tag_name}
                  </Button>
                ))
              ) : (
                <div>暂无标签</div>
              )}
            </div>
          )}
        </Panel>
      </Collapse>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {policy.map((item) => (
          <Card
            key={item.id}
            hoverable
            style={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '20px',
            }}
          >
            {/* 图片 */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
              <img
                src={item.image_url}
                alt={item.title}
                style={{
                  width: '60%',
                  maxHeight: '250px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </div>

            {/* 标题 */}
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '8px' }}>
             文章标题： {item.title}
            </h2>

            {/* 内容预览 */}
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '15px' }}>
            文章内容：  {item.content.slice(0, 80)}...
            </p>

            {/* 底部信息 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                fontSize: '14px',
                color: '#555',
              }}
            >
              {/* 左侧信息 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>部门：{item.department}</div>
                <div>分类：{item.category}</div>
                <div>编号：{item.policy_number}</div>
              </div>

              {/* 右侧信息 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                <div>生效时间：{new Date(item.effective_date).toLocaleDateString()}</div>
                <div>发布时间：{new Date(item.publish_date).toLocaleDateString()}</div>
                <Button type="primary" size="small" onClick={()=>{
                    navigate(`/user/information/policy/${item.id}`);
                }}>
                  查看详情
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Policy;
