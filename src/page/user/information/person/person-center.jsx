import { getId } from '../../../../ulits/tool';
import { getFavoriteList, getOrderlist, getNewsFavoriteList } from '../../../../API/product';
import { useEffect, useState } from 'react';
import { Button, Dropdown } from 'antd';
import Order from './order/index';
import MainFavorite from './favorite/index';

const ProductFavorite = () => {
  const id = getId();
  console.log(id);

  const [favoriteList, setFavoriteList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [newsFavoriteList, setNewsFavoriteList] = useState([]);
  const [showid, setShowid] = useState(2); // 1 = 收藏, 2 = 订单, 3 = 新闻收藏

  const show = (showid) => {
    switch (showid) {
      case 1:
        return <MainFavorite favoriteList={favoriteList} newsFavoriteList={newsFavoriteList}  showid={showid}/>;
      case 2:
        return <Order orderList={orderList} />;
          case 3:
        return <MainFavorite favoriteList={favoriteList} newsFavoriteList={newsFavoriteList}  showid={showid}/>;
    }
  };

  useEffect(() => {
    Promise.all([getFavoriteList(id), getOrderlist(id), getNewsFavoriteList(id)]).then(
      ([favoriteList, orderList, newsFavoriteList]) => {
        console.log(favoriteList, orderList, newsFavoriteList);
        setFavoriteList(favoriteList?.data?.data || []);
        setOrderList(orderList?.data?.data || []);
        setNewsFavoriteList(newsFavoriteList?.data?.data || []);
      }
    );
  }, []);

  // 下拉菜单选项
  const favoriteMenu = {
    items: [
      {
        key: 'product',
        label: (
          <Button
            type="text"
            onClick={() => {
              setShowid(1); // 收藏中心（商品）
            }}
            style={{ width: '100%', textAlign: 'left' }}
          >
            商品收藏
          </Button>
        ),
      },
      {
        key: 'news',
        label: (
          <Button
            type="text"
            onClick={() => {
              setShowid(3); // 预留新闻收藏
            }}
            style={{ width: '100%', textAlign: 'left' }}
          >
            新闻收藏
          </Button>
        ),
      },
    ],
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
        <Dropdown menu={favoriteMenu} trigger={['hover']}>
          <Button type="link">收藏中心</Button>
        </Dropdown>

        <Button type="link" onClick={() => setShowid(2)}>
          订单中心
        </Button>
      </div>
      {show(showid)}
    </div>
  );
};

export default ProductFavorite;
