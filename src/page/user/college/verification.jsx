import { postVerification } from '../../../API/verification';
import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import useStore from '../../../store/usestore'
const { Title } = Typography;

const Verification = ({ setVisible }) => {
  const [user, setUser] = useState({
    student_id: '',
    student_name: '',
    university_name: '',
    college_name: '',
    grade: ''
  });
  const {setUserid,setCollege,setUniversity} = useStore()
  const handleSubmit = async () => {
    try {
      const res = await postVerification(user);
      console.log(res)
      if (res.data.code === 200) {
        setUserid(user.student_id)
        setCollege(user.college_name)
        setUniversity(user.university_name)
        message.success('🎉 认证成功');
        setUser({
          student_id: '',
          student_name: '',
          university_name: '',
          college_name: '',
          grade: ''
        });
        setVisible(false);
      } else {
        message.error(res.data.msg || '认证失败，请重试');
      }
    } catch (error) {
      console.error(error);
      message.error('请求失败，请检查网络或稍后再试');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      background: '#f5f5f5',
      padding: '20px'
    }}>
      <Card
        style={{
          maxWidth: 450,
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          padding: '20px'
        }}
      >
        <Title level={3} style={{ textAlign: 'center', marginBottom: 20 }}>
          🎓 高校认证
        </Title>
        <Form layout="vertical">
          <Form.Item label="学号" required>
            <Input
              placeholder="请输入学号"
              value={user.student_id}
              onChange={(e) => setUser({ ...user, student_id: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="姓名" required>
            <Input
              placeholder="请输入姓名"
              value={user.student_name}
              onChange={(e) => setUser({ ...user, student_name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="学校名称" required>
            <Input
              placeholder="请输入学校名称"
              value={user.university_name}
              onChange={(e) => setUser({ ...user, university_name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="学院名称" required>
            <Input
              placeholder="请输入学院名称"
              value={user.college_name}
              onChange={(e) => setUser({ ...user, college_name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="年级" required>
            <Input
              placeholder="如：2021级"
              value={user.grade}
              onChange={(e) => setUser({ ...user, grade: e.target.value })}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center', marginTop: 20 }}>
            <Button
              type="primary"
              size="large"
              style={{ width: '100%', borderRadius: '8px' }}
              onClick={handleSubmit}
            >
              提交认证
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Verification;
