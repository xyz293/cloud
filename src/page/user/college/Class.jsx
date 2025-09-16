import { useContext, useEffect, useState } from 'react';
import { contentContext } from '../../../ulits/content';
import { getProvinceList } from '../../../API/province';
import { type, Address } from '../../../API/university';
import { Button, Collapse, Avatar, Space } from 'antd';
import { getSchoolCategory } from '../../../API/school_category';

const Class = () => {
  const { Panel } = Collapse;
  const { list } = useContext(contentContext);
  const [college, setCollege] = useState(list);
  const [lists, setLists] = useState([]);
  const [tag, setTag] = useState([]);

  useEffect(() => {
    getProvinceList().then(res => {
      setLists(res.data.data);
    });
    getSchoolCategory().then(res => {
      setTag(res.data.data);
    });
  }, []);

  return (
    <div style={{ width: '90%', margin: '0 auto', padding: '20px' }}>
      {/* 省份筛选 */}
      <Collapse>
        <Panel header="省份筛选">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {lists.map(item => (
              <div key={item.id} style={{ width: '25%', textAlign: 'center', padding: '5px 0' }}>
                <Button
                  type="link"
                  onClick={() => {
                    Address(item.name).then(res => setCollege(res.data.data));
                  }}
                >
                  {item.name}
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      </Collapse>

      {/* 学校分类筛选 */}
      <Collapse style={{ marginTop: '20px' }}>
        <Panel header="学校分类筛选">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {tag.map(item => (
              <div key={item.id} style={{ width: '25%', textAlign: 'center', padding: '5px 0' }}>
                <Button
                  type="link"
                  onClick={() => {
                    type(item.name).then(res => setCollege(res.data.data));
                  }}
                >
                  {item.name}
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      </Collapse>

      {/* 学校列表 */}
      <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', padding: '10px', gap: '20px' }}>
        {college.length === 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '150px',
              color: '#999',
              fontSize: '18px',
            }}
          >
            暂无数据
          </div>
        ) : (
          college.map(item=>(
      <div key={item.id} style={{display:'flex',width :'600px',justifyContent:'space-between',padding:'20px',border: '1px solid #eee',      // 边框
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

         <Button type="primary">查看详情</Button>
       <div>
          学校网址：<a href={item.website} target="_blank" rel="noopener noreferrer">
          {item.website}
        </a>
        </div>
        </div>
        </div>
       
     ))
        )}
      </div>
      </div>
    </div>
  );
};

export default Class;
