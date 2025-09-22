import {getProudet_tags,getProduct_brand_tags,getProduct_color_tags,getProduct_price_tags,getProduct_rating_tags,Selecttags} from '../../../../API/product'
import {useEffect,useState} from 'react';
import {Button} from 'antd';
const Select = ({show,setdata}) => {  //show函数是关闭弹窗的函数
    const [tags,setTags] = useState([]);
    const [brandTags,setBrandTags] = useState([]);
    const [colorTags,setColorTags] = useState([]);
    const [priceTags,setPriceTags] = useState([]);
    const [ratingTags,setRatingTags] = useState([]);
    const [selectedTags,setSelectedTags] = useState({
        category:'',
        brand:'',
        color:'',
        rating:'',
        pricemin:'',
        pricemax:''
    })
    useEffect(()=>{
     Promise.all([getProudet_tags(),getProduct_brand_tags(),getProduct_color_tags(),getProduct_price_tags(),getProduct_rating_tags()])
     .then(([tags,brandTags,colorTags,priceTags,ratingTags])=>{
      console.log(tags,brandTags,colorTags,priceTags,ratingTags);
      setTags(tags?.data?.data || []);
      setBrandTags(brandTags?.data?.data || []);
      setColorTags(colorTags?.data?.data || []);
      setPriceTags(priceTags?.data?.data || []);
      setRatingTags(ratingTags?.data?.data || []);
     })
    },[])
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px',alignItems:'center'}}>
     <div style={{display:'flex',flexWrap:'wrap'}}>
      {tags.map(item=>(
        <div key={item.id} style={{padding:'5px 10px',borderRadius:'5px'}}><Button type='link' onClick={()=>setSelectedTags({...selectedTags,category:item.tag_name})}>{item.tag_name}</Button></div>
      ))}
     </div>
      <div style={{display:'flex',flexWrap:'wrap'}}>
      {brandTags.map(item=>(
        <div key={item.id} style={{padding:'5px 10px',borderRadius:'5px'}}><Button type='link' onClick={()=>setSelectedTags({...selectedTags,brand:item.name})}>{item.name}</Button></div>
      ))}
     </div>
     <div style={{display:'flex',flexWrap:'wrap'}}>
      {colorTags.map(item=>(
        <div key={item.id} style={{padding:'5px 10px',borderRadius:'5px'}}><Button type='link' onClick={()=>setSelectedTags({...selectedTags,color:item.name})}>{item.name}</Button></div>
      ))}
     </div>
     <div style={{display:'flex',flexWrap:'wrap'}}>
      {priceTags.map(item=>(
        <div key={item.id} style={{padding:'5px 10px',borderRadius:'5px'}}><Button type='link' onClick={()=>setSelectedTags({...selectedTags,pricemin:item.min_price,pricemax:item.max_price})}>{item.min_price}-{item.max_price}</Button></div>
      ))}
     </div>
     <div style={{display:'flex',flexWrap:'wrap'}}>
      {ratingTags.map(item=>(
        <div key={item.id} style={{padding:'5px 10px',borderRadius:'5px'}}><Button type='link' onClick={()=>setSelectedTags({...selectedTags,rating:item.name})}>{item.name}</Button></div>
      ))}
     </div>
<div style={{display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center'}}>
  {selectedTags.category && (
    <div style={{display:'flex', alignItems:'center', gap:'5px', padding:'2px 6px', background:'#f0f0f0', borderRadius:'12px'}}>
      {selectedTags.category}
      <span style={{cursor:'pointer'}} onClick={() => setSelectedTags({...selectedTags, category: ''})}>×</span>
    </div>
  )}

  {selectedTags.brand && (
    <div style={{display:'flex', alignItems:'center', gap:'5px', padding:'2px 6px', background:'#f0f0f0', borderRadius:'12px'}}>
      {selectedTags.brand}
      <span style={{cursor:'pointer'}} onClick={() => setSelectedTags({...selectedTags, brand: ''})}>×</span>
    </div>
  )}

  {selectedTags.color && (
    <div style={{display:'flex', alignItems:'center', gap:'5px', padding:'2px 6px', background:'#f0f0f0', borderRadius:'12px'}}>
      {selectedTags.color}
      <span style={{cursor:'pointer'}} onClick={() => setSelectedTags({...selectedTags, color: ''})}>×</span>
    </div>
  )}

  {selectedTags.rating && (
    <div style={{display:'flex', alignItems:'center', gap:'5px', padding:'2px 6px', background:'#f0f0f0', borderRadius:'12px'}}>
      {selectedTags.rating}
      <span style={{cursor:'pointer'}} onClick={() => setSelectedTags({...selectedTags, rating: ''})}>×</span>
    </div>
  )}

  {(selectedTags.pricemin || selectedTags.pricemax) && (
    <div style={{display:'flex', alignItems:'center', gap:'5px', padding:'2px 6px', background:'#f0f0f0', borderRadius:'12px'}}>
      {selectedTags.pricemin}-{selectedTags.pricemax}
      <span style={{cursor:'pointer'}} onClick={() => setSelectedTags({...selectedTags, pricemin:'', pricemax:''})}>×</span>
    </div>
  )}

  <Button type='primary' onClick={() => Selecttags(selectedTags).then(res =>{
    if(res?.data?.code === 200){
      setSelectedTags({
        category:'',
        brand:'',
        color:'',
        rating:'',
        pricemin:'',
        pricemax:''
      })
      setdata(res?.data?.data || [])
      show()
    }
  })}>筛选</Button>
</div>

    </div>
  )
}
export default Select;