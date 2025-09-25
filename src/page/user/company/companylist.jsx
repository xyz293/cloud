import { Input, Button, Avatar } from 'antd';
import { getCompanyList, tagClass, Search } from '../../../API/company';
import { getCompanyTag } from '../../../API/company_tag';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 150;       // 每条 item 高度
const CONTAINER_HEIGHT = 450;  // 可视区高度

const Companylist = () => {
  const [companylist, setCompanylist] = useState([]);
  const [companytag, setCompanytag] = useState([]);
  const [key, setkey] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const show = async () => {
    const res = await getCompanyList();
    setCompanylist(res.data.data || []);
    const res1 = await getCompanyTag();
    setCompanytag(res1.data.data || []);
  };

  const Class = async (data) => {
    const res = await tagClass(data);
    setCompanylist(res.data.data || []);
    setStartIndex(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const handleSearch = async () => {
    if (!key) return;
    const res = await Search(key);
    console.log(res);
    setCompanylist(res.data.data || []);
    setStartIndex(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  };

  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;
    const i = Math.floor(scrollTop / ITEM_HEIGHT);
    console.log(scrollTop);
    console.log(i);
    setStartIndex(i);
  };

  // 计算可视条目数量 + 1 防止空白
  const VISIBLE_COUNT = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);
  const visibleList = companylist.slice(startIndex, startIndex + VISIBLE_COUNT);

  useEffect(() => {
    show();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30, padding: 20 }}>
      {/* 搜索栏 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 15, flexWrap: 'wrap' }}>
        <Input
          placeholder="请输入企业名称"
          style={{ minWidth: 300, maxWidth: 500 }}
          value={key}
          onChange={(e) => setkey(e.target.value)}
        />
        <Button type="primary" onClick={handleSearch}>
          搜索
        </Button>
      </div>

      {/* 标签分类 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
        {companytag.map((item) => (
          <Button key={item.id} type="default" onClick={() => Class(item.name)}>
            {item.name}
          </Button>
        ))}
      </div>

      {/* 虚拟滚动容器 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          height: `${CONTAINER_HEIGHT}px`,
          overflowY: 'auto',
          position: 'sticky',
          border: '1px solid #ccc',
          borderRadius: 12,
        }}
      >
        {/* 占位总高度 */}
        <div style={{ height: companylist.length * ITEM_HEIGHT, position: 'relative' }}>
          {visibleList.map((item, idx) => (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                top: (startIndex + idx) * ITEM_HEIGHT,
                left: 0,
                right: 0,
                height: ITEM_HEIGHT,
                padding: 20,
                background: '#f0f5ff',
                border: '1px solid #e0e0e0',
                borderRadius: 12,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 20,
                cursor: 'pointer',
                transition: '0.3s',
              }}
              onClick={() => navigate(`/user/company/company_detail/${item.id}`)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              {/* 左侧公司信息 */}
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <Avatar size={64}>{item.name[0]}</Avatar>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</div>
                  <div style={{ fontSize: 14, color: '#555' }}>{item.description}</div>
                  <div style={{ fontSize: 14, color: '#555' }}>类型: {item.industry}</div>
                  <div style={{ fontSize: 14, color: '#555' }}>地址: {item.address}</div>
                </div>
              </div>

              {/* 右侧公司详情 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'right' }}>
                <div>
                  官网: <a href={item.website} target="_blank" rel="noreferrer">{item.website}</a>
                </div>
                <div>邮箱: {item.email}</div>
                <div>规模: {item.scale}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companylist;
