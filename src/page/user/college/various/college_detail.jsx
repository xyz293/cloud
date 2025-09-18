import { useParams, useNavigate } from 'react-router-dom';
import { departmentContext } from '../../../../ulits/content';
import { useContext, useEffect, useState } from 'react';
import { Avatar, Button, Card, Collapse } from 'antd';
import { getCollege_expert, getCollege_course } from '../../../../API/university';

const CollegeCourse = () => {
  const params = useParams();
  const navigate = useNavigate();
  const university_id = params.id;
  const college_id = useContext(departmentContext);
  const [course, setCourse] = useState([]);
  const [expert, setExpert] = useState([]);
  const { Panel } = Collapse;

  const show = async () => {
    const res = await getCollege_expert(college_id, university_id);
    setExpert(res.data.data);
    const res1 = await getCollege_course(college_id, university_id);
    setCourse(res1.data.data);
  };

  useEffect(() => {
    show();
  }, []);

  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '30px' }}>
      {/* 课程列表 */}
      <Collapse defaultActiveKey={['1']} bordered={false}>
        <Panel header={<span style={{ color: '#1890ff', fontWeight: 'bold' }}>课程列表</span>} key="1">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center' }}>
            {course.map((item) => (
              <Card
                key={item.id}
                style={{
                  width: '700px',
                  borderRadius: '12px',
                  boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
                  padding: '20px',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>
                      课程名字：{item.name}
                    </div>
                    <div style={{ color: '#555' }}>课程描述：{item.description}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    <div style={{ color: '#666' }}>开设学院：{item.college_name}</div>
                    <Button
                      type="primary"
                      style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                      onClick={() =>
                        navigate(`/user/college/detail/${university_id}/course_detail/${item.id}`)
                      }
                    >
                      加入课程
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Panel>
      </Collapse>

      {/* 专家列表 */}
      <Collapse style={{ marginTop: '30px' }}>
        <Panel header={<span style={{ color: '#fa8c16', fontWeight: 'bold' }}>专家列表</span>} key="2">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            {expert.map((item) => (
              <Card
                key={item.id}
                style={{
                  width: '700px',
                  borderRadius: '12px',
                  boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
                  padding: '15px',
                  backgroundColor: '#fffbe6',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                    <Avatar style={{ backgroundColor: '#1890ff', color: '#fff' }}>{item.name[0]}</Avatar>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{item.title}</div>
                    <div style={{ color: '#555' }}>{item.company}</div>
                    <div style={{ color: '#888' }}>{item.specialization}</div>
                    <div style={{ color: '#999', fontSize: '12px' }}>{item.remark}</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px', color: '#555' }}>
                    <div>{item.address}</div>
                    <div>{item.phone}</div>
                    <div>{item.email}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default CollegeCourse;
