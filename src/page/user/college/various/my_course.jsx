import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { getMyCourse } from '../../../../API/course';
import { getVerification } from '../../../../API/verification';
import { getUserid, getUniversity, getCollege } from '../../../../ulits/tool';
import { useNavigate } from 'react-router-dom';

const MyCourse = () => {
  const id = getUserid();
  const college = getCollege();
  const university = getUniversity();
  const [course, setCourse] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const show = async () => {
    const res = await getMyCourse(id);
    setCourse(res.data.data);
    const res1 = await getVerification(id, college, university);
    setUser(res1.data.data);
  };

  useEffect(() => {
    show();
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* 左侧用户信息 */}
      <div
        style={{
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{user.university_name}</div>
        <div style={{ fontSize: '16px' }}>{user.college_name}</div>
        <div style={{ fontSize: '14px', color: '#555' }}>{user.student_name}</div>
        <div style={{ fontSize: '14px', color: '#555' }}>{user.grade}级</div>
      </div>

      {/* 右侧课程列表 */}
      <div
        style={{
          width: '70%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {course.map((item) => (
          <div
            key={item.id}
            style={{
              width: '200px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '100%',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '5px',
              }}
            />
            <div style={{ fontSize: '14px', color: '#888' }}>{item.college_name}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <Button type="primary" size="small" onClick={() => navigate(`/user/college/detail/${item.university_id
}/course_detail/${item.id}`)}>
                详情
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourse;
