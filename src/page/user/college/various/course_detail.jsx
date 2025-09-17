import {useParams} from 'react-router-dom';
import {getComment,getCourseDetail} from '../../../../API/course'
import {useEffect,useState} from 'react'
const CourseDetail = () => {
  const params = useParams();
  const id =params.id;
  console.log(id)
  const show =async ()=>{
    const res = await getCourseDetail(id);
    console.log(res)
    const res1 = await getComment(id);
    console.log(res1)
  }
  useEffect(()=>{
    show();
  },[])
  return (
   <div>
    课程详情
   </div>
  );
}
export default CourseDetail;