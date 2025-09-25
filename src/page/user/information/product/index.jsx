import {getProductlist,product_search} from '../../../../API/product'
import {useEffect,useState,useCallback,useRef} from 'react'
import {Modal,Input,Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import Select from './select';
const Product = () => {
    const [productList,setProductList] = useState([]);
    const [isshow,setIsShow] = useState(false);
    const [index,setIndex] = useState(0);
    const show = useCallback(()=>{
      setIsShow(prev=>!prev);
    },[])
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const handleSroll = ()=>{
      if(scrollRef.current){
        console.log(scrollRef.current.scrollTop)
      }
      let i = Math.floor(scrollRef.current.scrollTop / 200);
      setIndex(i);
      console.log(i)
    }
    const setdata = useCallback((data)=>{
      setProductList(data);
    },[])
    const [input,setInput] = useState('');
    useEffect(()=>{
       Promise.all([getProductlist()])
       .then(([productList])=>{
        console.log(productList)
        setProductList(productList?.data?.data || []);
       })
    },[])
    const value =Math.floor(700/200)
    const list = productList.slice(index , index+value);
  return (
    <div>
      <div style={{display:'flex',justifyContent:'center',gap:'14px'}}>
        <Input placeholder='请输入商品名称' style={{width:'450px'}} value ={input} onChange={(e)=>setInput(e.target.value)}/>
        <Button type='primary' onClick={()=>product_search(input).then(res=>{
            console.log(res)
            setProductList(res?.data?.data || []);
        })}>搜索</Button>
        <Button type='primary' onClick={show}>筛选</Button>
      </div>
      <div>
        <Modal title='筛选' open={isshow} onCancel={()=>show()} onOk={()=>show()} footer={null}>
          <Select show={show} setdata={setdata} />
        </Modal>
      </div>
   <div ref={scrollRef} style={{display:'flex',gap:'20px',alignItems:'center',width:'700px', height:'700px', flexDirection:'column',overflowY:'auto'}} onScroll={handleSroll}>
    <div style={{height:300*productList.length}}>
       {list?.map((item,idx) => (
    <div 
      key={item.id} 
      style={{
        display:'flex',
        flexDirection:'column',
        padding:'10px',
        width:'500px',
        height:'300px',
        borderRadius:'12px',
        backgroundColor:'#fdfdfd', // 卡片背景
        boxShadow:'0 4px 12px rgba(0,0,0,0.1)', // 阴影
        transition:'transform 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{height:'180px', overflow:'hidden', borderRadius:'12px'}}>
        <img 
          src={item.image} 
          alt={item.name} 
          style={{width:'300px', height:'auto', objectFit:'cover'}} 
        />
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
        <div style={{fontWeight:'600', fontSize:'16px', color:'#333'}}>{item.name}</div>
        <div style={{fontWeight:'700', fontSize:'18px', color:'#ff4d4f'}}>¥{item.price}</div>
        <div style={{fontSize:'14px', color:'#666', height:'36px', overflow:'hidden', textOverflow:'ellipsis'}}>{item.description}</div>
        <div style={{fontSize:'12px', color:'#999'}}>库存: {item.stock}</div>
        <div style={{fontSize:'12px', color:'#999'}}>颜色: {item.color}</div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'10px'}}>
        <div style={{fontSize:'12px', color:'#555'}}>
          {item.category} | {item.brand} | {item.rating}⭐
        </div>
        <Button type='primary' style={{backgroundColor:'#1890ff', borderColor:'#1890ff'}} onClick={()=>{
          navigate(`/user/information/product/${item.id}`)
        }}>购买</Button>
      </div>
    </div>
  ))}
    </div>
</div>

    </div>
  )
}
export default Product;