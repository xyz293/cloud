import { useParams } from 'react-router-dom';
import { getCompanyDetail } from '../../../API/company';
import { getDepartment } from '../../../API/department';
import { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
const Company_detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState({});
    const [department, setDepartment] = useState([]);

    const show = async () => {
        const res = await getCompanyDetail(id);
        setCompany(res.data.data);
        const res1 = await getDepartment(id);
        setDepartment(res1.data.data);
        console.log(res1);
    }

    useEffect(() => {
        if (id) show();
    }, [id]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>

            {/* 公司信息卡片 */}
            <div 
                style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px',
                    padding: '20px',
                    background: '#f5f7ff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    flexWrap: 'wrap'
                }}
            >
                <Avatar 
                    src={company.logo} 
                    size={100} 
                    style={{ flexShrink: 0 }}
                >
                    {company.name?.[0]}
                </Avatar>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '200px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{company.name}</div>
                    <div style={{ fontSize: '14px', color: '#555' }}>{company.description}</div>
                    <div style={{ fontSize: '14px', color: '#555' }}>行业: {company.industry}</div>
                    <div style={{ fontSize: '14px', color: '#555' }}>地址: {company.address}</div>
                    <div style={{ fontSize: '14px', color: '#555' }}>规模: {company.scale}</div>
                </div>
            </div>

            {/* 部门列表 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {department.map(item => (
                    <div
                        onClick={()=>{
                            navigate(`/user/company/department/${item.id}/${item.company_id}`);
                        }}
                        key={item.id}
                        style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '12px',
                            padding: '15px 20px',
                            background: '#ffffff',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>部门名称: {item.name}</div>
                            <div style={{ fontSize: '14px', color: '#555' }}>部门描述: {item.description}</div>
                            <div style={{ fontSize: '14px', color: '#555' }}>管理人: {item.manager}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Company_detail;
