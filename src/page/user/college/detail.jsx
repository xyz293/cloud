import { detail } from '../../../API/university';
import { useEffect, useMemo } from 'react';
import { Button } from 'antd';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { departmentContext } from '../../../ulits/content';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const contextValue = useMemo(() => id, [id]);

  useEffect(() => {
    navigate('main');
    detail(id).then((res) => {
      console.log('学校详情', res);
    });
  }, [id]);


  const navItems = [
    { key: 'main', label: '首页中心', path: 'main' },
    { key: 'college', label: '学院中心', path: 'college' },
    { key: 'course', label: '课程中心', path: 'course' },
    { key: 'result', label: '成果展示', path: 'result' },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '25px' }}>
      {/* 顶部导航 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '30px',
          marginBottom: '30px',
        }}
      >
        {navItems.map((item) => (
          <Button
            key={item.key}
            type="link"
            style={{
              fontSize: '16px',
              padding: '10px 20px',
              borderRadius: '10px',
              minWidth: '120px',
              textAlign: 'center',
            }}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <departmentContext.Provider value={contextValue}>
        <Outlet />
      </departmentContext.Provider>
    </div>
  );
};

export default Detail;
