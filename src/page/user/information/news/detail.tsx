import { useParams } from 'react-router-dom'
import { getDetail } from '../../../../API/news'
import { News } from '../../../../type/news/index'
import { useEffect, useState } from 'react'
import { Button } from 'antd'

const Detail = () => {
  const params = useParams()
  const id = params.id
  const [detail_id, setDetail_id] = useState<number>(id ? Number(id) : 0)
  const [newsDetail, setNewsDetail] = useState<News | null>(null)
  const [prev, setPrev] = useState<boolean>(true)
  const [next, setNext] = useState<boolean>(true)

  useEffect(() => {
    setPrev(detail_id > 1)
    console.log(detail_id);
    getDetail(detail_id).then((res: any) => {
      setNewsDetail(res.data.data)
    })
  }, [detail_id])

  return (
    <div
      style={{
        background: '#f5f7fa', // 页面背景
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        gap: '30px'
      }}
    >
      {/* 新闻封面 */}
      <div
        style={{
          width: '80%',
          maxWidth: '800px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}
      >
        <img
          src={newsDetail?.image_url}
          alt={newsDetail?.title}
          style={{ width: '100%', height: '400px', objectFit: 'cover' }}
        />
      </div>

      {/* 新闻内容 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '800px',
          backgroundColor: '#ffffff', // 卡片背景
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}
      >
        {/* 标题和作者 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#333333' }}>
            {newsDetail?.title}
          </h2>
          <h3 style={{ fontSize: '1rem', color: '#666666' }}>{newsDetail?.author}</h3>
        </div>

        {/* 正文 */}
        <div style={{ color: '#555555', lineHeight: 1.8 }}>
          <p>{newsDetail?.content}</p>
        </div>

        {/* 分类 + 发布时间 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '10px'
          }}
        >
          <div style={{ color: '#999999', fontSize: '0.9rem' }}>
            {newsDetail?.publish_time
              ? new Date(newsDetail.publish_time).toLocaleString()
              : '暂无发布时间'}
          </div>
          <div
            style={{
              background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
              color: '#ffffff',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.85rem'
            }}
          >
            {newsDetail?.category}
          
          </div>
        </div>
      </div>

      {/* 分页按钮 */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
        <Button
          disabled={!prev}
          onClick={() => detail_id > 1 && setDetail_id((prev) => prev - 1)}
        >
          上一页
        </Button>
        <Button
          disabled={!next}
          onClick={() => setDetail_id((prev) => prev + 1)}
        >
          下一页
        </Button>
        <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',fontSize:'0.75rem',color:'#999'}}>
       <Button onClick={()=>{
       }}>收藏</Button>
      </div>
      </div>
    </div>
  )
}

export default Detail
