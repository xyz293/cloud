import { Input, Button, Avatar } from 'antd';
import { getCompanyList, tagClass, Search } from '../../../API/company';
import { getCompanyTag } from '../../../API/company_tag';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Companylist = () => {
    const [companylist, setCompanylist] = useState([]);
    const [companytag, setCompanytag] = useState([]);
    const [key, setkey] = useState('');
    const navigate = useNavigate();

    const show = async () => {
        const res = await getCompanyList();
        setCompanylist(res.data.data);
        const res1 = await getCompanyTag();
        setCompanytag(res1.data.data);
    }

    const Class = async (data) => {
        const res = await tagClass(data);
        setCompanylist(res.data.data)
    }

    const handleSearch = async () => {
        const res = await Search(key);
        console.log(res);
        setCompanylist(res.data.data);
    }

    useEffect(() => {
        show();
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
            
            {/* 搜索栏 */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                <Input 
                    placeholder='请输入企业名称' 
                    style={{ minWidth: '300px', maxWidth: '500px' }} 
                    value={key} 
                    onChange={(e) => {

                        setkey(e.target.value)
                    }

                    } 
                />
                <Button type='primary' onClick={()=>{
                    handleSearch(key);
                }}>搜索</Button>
            </div>

            {/* 标签分类 */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {companytag.map(item => (
                    <Button 
                        key={item.id} 
                        type='default' 
                        onClick={() => Class(item.name)}
                    >
                        {item.name}
                    </Button>
                ))}
            </div>

            {/* 企业列表 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {companylist.map(item => (
                    <div 
                        key={item.id} 
                        style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '12px',
                            padding: '20px',
                            background: '#f0f5ff',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '20px',
                            cursor: 'pointer',
                            transition: '0.3s',
                        }}
                        onClick={() => navigate(`/user/company/company_detail/${item.id}`)}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                    >
                        {/* 左侧公司信息 */}
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <Avatar size={64}>{item.name[0]}</Avatar>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.name}</div>
                                <div style={{ fontSize: '14px', color: '#555' }}>{item.description}</div>
                                <div style={{ fontSize: '14px', color: '#555' }}>类型: {item.industry}</div>
                                <div style={{ fontSize: '14px', color: '#555' }}>地址: {item.address}</div>
                            </div>
                        </div>

                        {/* 右侧公司详情 */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'right' }}>
                            <div>官网: <a href={item.website} target='_blank' rel='noreferrer'>{item.website}</a></div>
                            <div>邮箱: {item.email}</div>
                            <div>规模: {item.scale}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Companylist;
