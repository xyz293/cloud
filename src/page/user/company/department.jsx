import { useParams } from 'react-router-dom';
import { getDepartmentByCompanyId } from '../../../API/department';
import { getDepartment_job, searchJob_department } from '../../../API/job';
import { useEffect, useState } from 'react';
import { Button, Input, Card, Typography, Space } from 'antd';

const { Title, Paragraph, Text } = Typography;

const Department = () => {
  const { id, companyid } = useParams();
  const [jobList, setJobList] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState({});

  const show = async () => {
    const res = await getDepartmentByCompanyId(id, companyid);
    setDepartment(res.data.data);
    const res1 = await getDepartment_job(id, companyid);
    setJobList(res1.data.data);
  };

  const handleSearch = async (name) => {
    const res = await searchJob_department(name, id, companyid);
    if (res.data.code === 200) {
      setJobList(res.data.data);
    }
  };

  useEffect(() => {
    show();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f7fa', // 淡灰背景
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px',
        gap: '30px',
      }}
    >
      {/* 搜索栏 */}
      <Space style={{ marginBottom: 20 }}>
        <Input
          placeholder="请输入岗位名称"
          style={{
            minWidth: '300px',
            maxWidth: '500px',
            borderRadius: '8px',
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="primary"
          style={{
            backgroundColor: '#1677ff',
            borderRadius: '8px',
          }}
          onClick={() => handleSearch(name)}
        >
          搜索
        </Button>
      </Space>

      {/* 部门信息卡片 */}
      <Card
        title={<Title level={4}>部门信息</Title>}
        style={{
          width: '100%',
          maxWidth: '600px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          background: 'white',
        }}
      >
        <Paragraph>
          <Text strong>部门名称：</Text> {department.name || '暂无'}
        </Paragraph>
        <Paragraph>
          <Text strong>部门介绍：</Text> {department.description || '暂无'}
        </Paragraph>
        <Paragraph>
          <Text strong>管理人：</Text> {department.manager || '暂无'}
        </Paragraph>
      </Card>

      {/* 岗位列表 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        {jobList.length === 0 ? (
          <Paragraph style={{ textAlign: 'center', color: '#999' }}>
            暂无岗位
          </Paragraph>
        ) : (
          jobList.map((item) => (
            <Card
              key={item.id}
              hoverable
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              }}
            >
              <Title level={5}>{item.title}</Title>
              <Paragraph>
                <Text strong>描述：</Text> {item.description}
              </Paragraph>
              <Paragraph>
                <Text strong>经验：</Text> {item.exp}
              </Paragraph>
              <Paragraph>
                <Text strong>学历：</Text> {item.edu}
              </Paragraph>
              <Paragraph>
                <Text strong>薪资：</Text> {item.salary_min}元 - {item.salary_max}元
              </Paragraph>
              <Button type="primary" block style={{ borderRadius: '8px' }}>
                申请岗位
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Department;
