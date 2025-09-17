import { getTag } from '../../../../API/college_tag';
import { Collapse, Button, Input } from 'antd';
import { useEffect, useState, useContext } from 'react';
import { getCourse,search,tagtype} from '../../../../API/course';
import { departmentContext } from '../../../../ulits/content';
import { useNavigate } from 'react-router-dom';
const Department = () => {
  const { Panel } = Collapse;
  const id = useContext(departmentContext);
  const [tag, setTag] = useState([]);
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  const show = async () => {
    const res = await getCourse(id);
    setCourse(res.data.data);
    const res1 = await getTag();
    setTag(res1.data.data);
  };
  const handleTag = async (key) => {
    const res = await tagtype(key, id);
    console.log(res)
    setCourse(res.data.data);
  }
  const [key,setKey] = useState('');
  const searchCourse = async () => {
    const res = await search(key, id);
      console.log(res)
      setCourse(res.data.data);
  };
  useEffect(() => {
    show();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
     
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Input placeholder="请输入课程名称" style={{ width: '400px' }} value={key} onChange={(e)=>setKey(e.target.value)} />
        <Button type="primary" onClick={()=>{searchCourse()}}>搜索</Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Collapse style={{ width: '600px' }}>
          <Panel header="课程标签筛选" key="1">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {tag.map((item) => (
                <Button key={item.id} type="link" onClick={()=>{handleTag(item.name)}}>
                  {item.name}
                </Button>
              ))}
            </div>
          </Panel>
        </Collapse>
      </div>

      {/* 课程卡片 */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          width: '100%',
          maxWidth: '1300px',
          margin: '0 auto',
        }}
      >
        {course.map((item) => (
          <div
            key={item.id}
            style={{
              flex: '1 1 calc(33% - 30px)',
              minWidth: '280px',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              padding: '15px',
            }}
          >
            {/* 图片 */}
            <div style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '8px' }}>
              <img
                src={item.image}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
              <strong>课程名称：{item.name}</strong>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                课程介绍：{item.description || '暂无介绍'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#999' }}>开设学院：{item.college_name}</span>
                <Button type="link" onClick={()=>{navigate(`/user/college/detail/${id}/course/${item.id}`)}}>详情</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department;
