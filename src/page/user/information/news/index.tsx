import { getNewsList, getNewstags ,NewsTags,Search} from '../../../../API/news'
import { News, Tags} from '../../../../type/news';
import { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
const New = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);
   const [inputValue, setInputValue] = useState<string>('');
  useEffect(() => {
    Promise.all([getNewsList(), getNewstags()]).then(([newsList, tags]) => {
      console.log(newsList, tags);
      setNewsList(newsList.data.data);
      setTags(tags.data.data);
    })
  }, [])

  return (
    <div style={{
      background: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        maxWidth: '900px',
        width: '100%'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%',gap:'20px' }}>
             <Input placeholder="请输入关键词搜索新闻"  value={inputValue} style={{ width: 400 }}
             onChange={(e)=>{setInputValue(e.target.value)}}
             />
             <Button 
                onMouseEnter ={e=>{
                        e.currentTarget.style.transform="translateY(-3px)";
                        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
                        e.currentTarget.style.backgroundColor = "skyblue";
                    }}
                            onMouseLeave={(e) => {
                               e.currentTarget.style.transform = "translateY(0) scale(1)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                            }

                            } 
             onClick={()=>{
                Search(inputValue).then((res:any)=>{
                   console.log(res);
                   setNewsList(res.data.data);
                })
             }}>搜索</Button>
        </div>
        <div>
            <div style={{display:'flex',justifyContent:'center',gap:'20px'}}>
                {tags.map(item=>(
                    <Button key={item.id}  
                      onClick={()=>{
                        NewsTags(item.tag_name).then((res :any)=>{
                            setNewsList(res.data.data);
                           console.log(res);
                        })
                      }}
                    
                    onMouseEnter ={e=>{
                        e.currentTarget.style.transform="translateY(-3px)";
                        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
                        e.currentTarget.style.backgroundColor = "skyblue";
                    }}
                            onMouseLeave={(e) => {
                               e.currentTarget.style.transform = "translateY(0) scale(1)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                                e.currentTarget.style.backgroundColor = "#fff";
                            }

                            } >{item.tag_name}</Button>
                ))}
            </div>
        </div>
       <div>
         {newsList.map(item => {
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                padding: '20px',
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
            >
              {/* 图片 */}
              <div style={{ display: 'flex', justifyContent: "center" }}>
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{
                    width: '100%',
                    maxHeight: '400px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </div>

              {/* 标题 */}
              <div style={{ display: 'flex', justifyContent: "center" }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#333', margin: 0 }}>
                  {item.title}
                </h3>
              </div>

              {/* 内容 */}
              <div style={{ display: 'flex', justifyContent: "center" }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#555',
                  lineHeight: 1.6,
                  textAlign: 'center',
                  margin: 0
                }}>
                  {item.content.slice(0, 100)}......
                </p>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: "space-between",
                width: '100%',
                marginTop: '10px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>作者: {item.author}</span>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>发布时间: {new Date(item.publish_time).toLocaleString()}</span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                 flexDirection: 'column', gap: '6px',
                  padding: '4px 12px',
                 
                }}>
                <div style={{fontSize:'0.85rem',fontWeight:500,whiteSpace:'nowrap',background:"skyblue"}}> 
                    <Button 
                    onMouseEnter ={e=>{
                        e.currentTarget.style.transform="translateY(-3px)";
                        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
                        e.currentTarget.style.backgroundColor = "#f0f4ff";
                    }}
                            onMouseLeave={(e) => {
                               e.currentTarget.style.transform = "translateY(0) scale(1)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                                e.currentTarget.style.backgroundColor = "#fff";
                            }

                            }>
                        {item.category}</Button>
                        </div>
                        <div>
                    <Button  size='small'
                      onMouseEnter ={e=>{
                        e.currentTarget.style.transform="translateY(-3px)";
                        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
                        e.currentTarget.style.backgroundColor = "#f0f4ff";
                    }}
                            onMouseLeave={(e) => {
                               e.currentTarget.style.transform = "translateY(0) scale(1)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                                e.currentTarget.style.backgroundColor = "#fff";
                            }

                            }
                    >查看详情</Button>
                            </div>
                
                </div>
              </div>
            </div>
          )
        })}
       </div>
      </div>
    </div>
  )
}

export default New;
