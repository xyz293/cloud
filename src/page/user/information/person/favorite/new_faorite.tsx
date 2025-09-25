import { NewsFavoriteorder } from '../../../../../type/person_center/index'
import { Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DeleteNewsFavorite } from '../../../../../API/news'
import { getId } from '../../../../../ulits/tools'

interface NewFavoriteProps {
  newsFavoriteList: NewsFavoriteorder[];
}

const NewFavorite = ({ newsFavoriteList }: NewFavoriteProps) => {
  const navigate = useNavigate();
  const user_id = getId();
  const [list, setList] = useState<NewsFavoriteorder[]>(newsFavoriteList);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      {list.map(item => (
        <div
          key={item.news_id}
          style={{
            display: 'flex',
            width: '80%',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#fff'
          }}
        >
          {/* 左边：封面和标题 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
            <img
              src={item.cover_url}
              alt={item.news_title}
              style={{
                width: '200px',
                height: 'auto',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>{item.news_title}</div>
          </div>

          {/* 右边：内容、分类、时间、按钮 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '10px',
            width: '50%'
          }}>
            <div style={{ color: '#555', fontSize: '0.9rem' }}>
              {item.content}
            </div>

            {/* 分类用标签显示 */}
            <Tag color="blue">{item.category}</Tag>

            <div style={{ fontSize: '0.8rem', color: '#999' }}>
              {new Date(item.create_time).toLocaleString()}
            </div>

            {/* 按钮组 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
              <Button
                danger
                type='primary'
                size='small'
                onClick={() => {
                  DeleteNewsFavorite(user_id, item.news_id).then((res: any) => {
                    if (res.data.code === 200) {
                      setList(prev => prev.filter(i => i.news_id !== item.news_id))
                    }
                  })
                }}
              >
                取消收藏
              </Button>

              <Button
                type='primary'
                size='small'
                style={{ backgroundColor: '#1677ff' }}
                onClick={() => navigate(`/user/information/news/${item.news_id}`)}
              >
                查看详情
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NewFavorite;
