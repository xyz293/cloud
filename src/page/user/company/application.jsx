import { Button, Form, Input, Card, Divider, Typography } from 'antd';
import { UploadOutlined, UserOutlined, FilePdfOutlined, CommentOutlined } from '@ant-design/icons';
import { applyJob } from '../../../API/application';
import { useState } from 'react';
import {chuncks,merge} from '../../../API/upload'
import SparkMD5 from 'spark-md5';

const { Title } = Typography;

const Application = ({ info,setisshow }) => {

    const chunks =1024
    const [user,setUser] = useState({
       job_id:info.job_id,
       user_id:1,
       company_id:info.company_id,
       department_id:info.department_id,
       state:'已投递',
       username:'',
       introduction:'',
    })
    console.log(info)
    const create =(file,chunks)=>{
        const list =[]
        let i =0
          while(file.size>i){
            list.push(file.slice(i,i+chunks))
            i+=chunks
          }
          return list
    }
    const gethash = (file)=>{
          const spark = new SparkMD5.ArrayBuffer();
          const fileReader = new FileReader();
          const targets =[]
          file.forEach((item,index) => {
             if(index === file.length-1||index ==0){
                targets.push(item)
             }
             else {
                targets.push(file.slice(0,2))
                targets.push(file.slice(file.length-2,file.length))
                targets.push(file.slice(file.length/2,file.length/2+2))
             }
          })
   
            fileReader.readAsArrayBuffer(new Blob(targets))
          fileReader.onload = () => {
            spark.append(fileReader.result);
          };
          return spark.end()
    }
    const load =async (file,hash)=>{
        file.forEach(async (item,index) => {
           const formData = new FormData()
           formData.append('totalChunks',file.length)
           formData.append('index',index)
           formData.append('hash',hash)
           formData.append('file',item)
          const res = await chuncks(formData)
          console.log(res)
        })
    }
    const Merge =async (hash,fileName,totalChunks)=>{
          const res = await merge({
            hash:hash,
            fileName:fileName,
            totalChunks:totalChunks
          })
          console.log(res)
    }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f7fa',
      minHeight: '100vh'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 600,
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ color: '#2c3e50', fontWeight: 600 }}>
            <UserOutlined style={{ marginRight: 8 }} />
            申请职位：{info?.title || '未知职位'}
          </Title>
          <Divider style={{ margin: '12px 0' }} />
        </div>

        <Form
          layout="vertical"
          requiredMark={true}
        >
          {/* 姓名 */}
          <Form.Item
            name="username"
            label="姓名"
            rules={[{ required: true, message: '请输入您的姓名' }]}
          >
            <Input
              size="large"
              placeholder="请输入真实姓名"
              prefix={<UserOutlined />}
              value={user.username}
              onChange={(e)=>{
                setUser({
                  ...user,
                  username:e.target.value
                })
              }}
            />
          </Form.Item>

          {/* 自我介绍 */}
          <Form.Item
            name="introduction"
            label="自我介绍"
            rules={[{ required: true, message: '请填写自我介绍' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="请简要介绍您的工作经验、技能和求职动机（200字以内）"
              maxLength={500}
              showCount
              prefix={<CommentOutlined />}
              value={user.introduction}
              onChange={(e)=>{
                setUser({
                  ...user,
                  introduction:e.target.value
                })
              }}
            />
          </Form.Item>

          {/* 简历上传 */}
          <Form.Item
            name="resume"
            label="上传简历"
            valuePropName="fileList"
            rules={[{ required: true, message: '请上传简历文件' }]}
            extra="支持 PDF 格式，文件大小不超过 5MB"
          >
           <Input type="file"  onChange={async (e)=>{
             const file = e.target.files[0]
             const list = create(file,chunks)
           const hash =  gethash(list)
           console.log('hash', hash);
             console.log(list)
             await load(list,hash)
             await Merge(hash,file.name,list.length)
           }}/>
          </Form.Item>

          {/* 提交按钮 */}
          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
            onClick={()=>{
                applyJob(user).then(res=>{
                   console.log(res)
                   if(res.data.code === 200){
                    alert('投递成功')
                    setisshow(false)
                   }
                })
            }}
            >
                投递
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Application;