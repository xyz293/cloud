import { Favoriteorder } from '../../../../../type/person_center/index'
import {useNavigate} from 'react-router-dom';
import {delete_Orderfavorite} from '../../../../../API/news'
interface FavoriteProps {
    favoriteList: Favoriteorder[];
}
import {useState} from 'react'
const Favorite = ({ favoriteList }: FavoriteProps) => {
    const navigate = useNavigate();
    const [list,setList] = useState<Favoriteorder[]>(favoriteList);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            {list?.map((item) => (
                <div 
                  key={item.id} 
                  style={{
                    display: 'flex',
                    justifyContent: "space-between",
                    width: '60%',
                    padding: '15px',
                    borderRadius: '12px',
                    backgroundColor: '#f5f5f5', // 卡片背景颜色
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}
                  onMouseEnter={(e)=> {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e)=> {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start', color: '#333' }}>
                        <div style={{ fontWeight: '600', fontSize: '16px' }}>{item.product_name}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                        <div style={{ fontWeight: '700', fontSize: '16px', color: '#ff4d4f' }}>{item.product_price}</div>
                        <div style={{ fontSize: '12px', color: '#999' }}>{new Date(item.created_at).toLocaleString()}</div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                            onClick={(()=>{
                                  navigate(`/user/information/product/${item.product_id}`);
                            }) }
                              style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: '#1890ff',
                                color: '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease-in-out'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#40a9ff';
                                e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#1890ff';
                                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                                详情
                            </button>
                            <button 
                            onClick={()=>{
                                setList(prve=>prve.filter(i=>i.id!==item.id));
                                delete_Orderfavorite(item.id).then(res=>{
                                   console.log(res);
                                })
                            }}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: '#ff4d4f',
                                color: '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease-in-out'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#ff7875';
                                e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#ff4d4f';
                                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                                删除
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Favorite;
