import { getProduct_detail,purchase_product,addfavorite } from "../../../../API/product";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "antd";
import {getId} from '../../../../ulits/tool'
const ProductDetail = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState({});
  const user_id= getId();
  useEffect(() => {
    getProduct_detail(id).then((res) => {
      console.log(res);
      setProduct(res.data.data);
    });
  }, [id]);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        display: "flex",
        flexDirection: "row",
        gap: "40px",
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        flexWrap: "wrap",
      }}
    >
      {/* 左侧图片 */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <img
          src={product.image}
          alt={product.product_name}
          style={{
            width: "100%",
            maxWidth: "450px",
            borderRadius: "12px",
            objectFit: "cover",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      {/* 右侧详情 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "flex-start",
        }}
      >
        {/* 产品名 */}
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>{product.name}</h1>

        {/* 品牌、颜色、描述 */}
        <div style={{ fontSize: "16px", color: "#666", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>品牌：{product.brand}</div>
          <div>颜色：{product.color}</div>
          <div style={{ lineHeight: "1.6" }}>{product.description}</div>
        </div>

        {/* 价格和库存 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          <span>库存：{product.stock}</span>
          <span style={{ color: "#ff4d4f", fontSize: "24px", fontWeight: "bold" }}>
            ￥{product.price}
          </span>
        </div>

        {/* 操作按钮 */}
        <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
          <Button
            type="default"
            size="large"
            onClick={()=>{
             addfavorite(user_id,product.id,product.name,product.price).then(res=>{
              console.log(res)
              if(res.data.code===200){
                alert('加入成功')
              }
             })
          }
}
            style={{
              flex: 1,
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            加入购物车
          </Button>
          <Button
          onClick={()=>{
            purchase_product(user_id,product.id,product.name,product.price).then(res=>{
                console.log(res)
                if(res.data.code===200){
                    alert('购买成功')
                }
            })
          }}
            type="primary"
            size="large"
            style={{
              flex: 1,
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            立即购买
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
