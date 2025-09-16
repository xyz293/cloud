import { getJoblist, searchJob } from '../../../API/job'
import { useEffect, useState } from 'react'
import { Button, Input, Modal, Card, Tag } from 'antd'
import Application from './application'

const Job = () => {
  const [jobList, setJobList] = useState([])
  const [isshow, setisshow] = useState(false)
  const [info, setInfo] = useState({
    job_id: '',
    company_id: '',
    department_id: '',
  })
  const [key, setkey] = useState('')

  const show = async (key) => {
    const res = await searchJob(key)
    if (res.data.code === 200) {
      setJobList(res.data.data)
    }
  }

  useEffect(() => {
    getJoblist().then((res) => {
      setJobList(res.data.data)
    })
  }, [])

  return (
    <div style={{ padding: '40px', background: '#f5f7fa', minHeight: '100vh' }}>
      <Modal
        title="申请岗位"
        open={isshow}
        footer={null}
        onCancel={() => {
          setisshow(false)
          setInfo({
            job_id: '',
            company_id: '',
            department_id: '',
          })
        }}
      >
        <Application info={info} setisshow={setisshow} />
      </Modal>

      {/* 搜索框 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '30px',
        }}
      >
        <Input
          placeholder="请输入岗位名称"
          style={{ width: '400px', borderRadius: '8px' }}
          value={key}
          onChange={(e) => setkey(e.target.value)}
        />
        <Button
          type="primary"
          style={{ borderRadius: '8px' }}
          onClick={() => show(key)}
        >
          搜索
        </Button>
      </div>

      {/* 岗位卡片 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {jobList.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>暂无岗位</p>
        ) : (
          jobList.map((item) => (
            <Card
              key={item.id}
              hoverable
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              <h3 style={{ marginBottom: '8px', fontWeight: 600 }}>{item.title}</h3>
              <p style={{ color: '#666', marginBottom: '8px' }}>{item.description}</p>
              <div style={{ marginBottom: '8px' }}>
                <Tag color="blue">经验: {item.exp}</Tag>
                <Tag color="purple">学历: {item.edu}</Tag>
              </div>
              <p style={{ fontWeight: 500, color: '#fa541c', marginBottom: '16px' }}>
                薪资：{item.salary_min} - {item.salary_max} 元
              </p>
              <Button
                type="primary"
                block
                shape="round"
                onClick={() => {
                  setisshow(true)
                  setInfo({
                    job_id: item.id,
                    company_id: item.company_id,
                    department_id: item.department_id,
                  })
                }}
              >
                申请岗位
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default Job
