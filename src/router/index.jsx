import {lazy,Suspense} from 'react';
import {Spin} from 'antd';
import LoginGuard from './guard/login';
const Login = lazy(()=>import('../page/user/login/login'));
const Register = lazy(()=>import('../page/user/login/regiser'));
const LoginMain = lazy(()=>import('../page/user/login/index'));
const User = lazy(()=>import('../page/user/index'));
const Company = lazy(()=>import('../page/user/company/index'));
const Companylist = lazy(()=>import('../page/user/company/companylist'));
const Job = lazy(()=>import('../page/user/company/job'));
const Company_detail = lazy(()=>import('../page/user/company/company_detail'));
const Department = lazy(()=>import('../page/user/company/department'));
const MyApplication = lazy(()=>import('../page/user/company/my_application'));
const University = lazy(()=>import('../page/user/college/index'));
const First_page = lazy(()=>import('../page/user/college/firsrt_page'));
const Class = lazy(()=>import('../page/user/college/Class'));
const Detail = lazy(()=>import('../page/user/college/detail'));
const Main = lazy(()=>import('../page/user/college/various/main'));
const College_course = lazy(()=>import('../page/user/college/various/course_university'));
const College = lazy(()=>import('../page/user/college/various/college'));
const CourseDetail = lazy(()=>import('../page/user/college/various/course_detail'));
const CollegeCourse = lazy(()=>import('../page/user/college/various/college_detail'));
const MyCourse = lazy(()=>import('../page/user/college/various/my_course'));
const Achievement = lazy(()=>import('../page/user/college/various/achievement'));
const Main_Information = lazy(()=>import('../page/user/information/index'));
const Policy = lazy(()=>import('../page/user/information/polciy/index'));
const Detail_Policy = lazy(()=>import('../page/user/information/polciy/detail'));
const Product = lazy(()=>import('../page/user/information/product/index'));
const ProductDetail = lazy(()=>import('../page/user/information/product/detail'));
const ProductPersonCenter = lazy(()=>import('../page/user/information/person/person-center'));
const News = lazy(()=>import('../page/user/information/news/index'));
const NewsDetail = lazy(()=>import('../page/user/information/news/detail'));
const router =[
    {
        path:'/',
        element:(
            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                <Spin/>
            </div>}>
                <LoginMain/>
            </Suspense>
        ),
        children:[
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<Register/>
            }
        ]
    },
    {
        path:'/user',
        element:(
            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                <Spin/>
            </div>}>
               
                    <User/>
            </Suspense>
        ),
        children:[
            {
                path:'company',
                element:(
                    <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                        <Spin/>
                    </div>}>
                    
                            <Company/>
                    </Suspense>
                ),
                children:[
                    {
                        path:'companylist',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <Companylist/>
                            </Suspense>
                        )
                    },
                    {
                        path:'job',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <LoginGuard meta={{auth:true}}>
                                    <Job/>
                                </LoginGuard>
                            </Suspense>
                        )
                    },
                    {
                        path:'company_detail/:id',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <Company_detail/>
                            </Suspense>
                        )
                    },
                    {
                        path:'department/:id/:companyid',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <LoginGuard meta={{auth:true}}>
                                    <Department/>
                                </LoginGuard>
                            </Suspense>
                        )
                    },
                    {
                        path:'my_application',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <MyApplication/>
                            </Suspense>
                        )
                    },

                ]
            },
            {
                path:'information',
                element:(
                    <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                        <Spin/>
                    </div>}>
                        <Main_Information/>
                    </Suspense>
                ),
                children:[
                    {
                        path:'policy',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <Policy/>
                            </Suspense>
                        )
                    },
                    {
                        path:'news',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <News/>
                            </Suspense>
                        )
                    },
                    {
                        path:'news/:id',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <LoginGuard meta={{auth:true}}>
                                    <NewsDetail/>
                                </LoginGuard>
                            </Suspense>
                        )
                    },
                    {
                        path:'policy/:id',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <Detail_Policy/>
                            </Suspense>
                        )
                    },
                    {
                        path:'product',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <Product/>
                            </Suspense>
                        )
                    },
                    {
                        path:'product/:id',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <ProductDetail/>
                            </Suspense>
                        )
                    },
                    {
                        path:'product_person-center',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <ProductPersonCenter/>
                            </Suspense>
                        )
                    },
                ]
            },
            {
                path:'college',
                element:(
                    <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                        <Spin/>
                    </div>}>
                        <University/>
                    </Suspense>
                ),
                children:[
                    {
                        path:'firstpage',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <First_page/>
                            </Suspense>
                        )
                    },
                    {
                        path:'my_course',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <MyCourse/>
                            </Suspense>
                        )
                    },
                    {
                        path:'class',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <Class/>
                            </Suspense>
                        )
                    },
                    {
                        path:'detail/:id',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <Detail/>
                            </Suspense>
                        ),
                        children:[
                            {
                                path:'main',
                                element:(
                                    <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                        <Spin/>
                                    </div>}>
                                        <Main/>
                                    </Suspense>
                                )
                            },
                            {
                                path:'course',
                                element:(
                                    <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                        <Spin/>
                                    </div>}>
                                        <College_course/>
                                    </Suspense>
                                )
                            },
                            {
                                path:'college',
                                element:(
                                    <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                        <Spin/>
                                    </div>}>
                                        <College/>
                                    </Suspense>
                                )   
                            },
                            {
                                path:'course_detail/:id',
                                element:(
                                    <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                        <Spin/>
                                    </div>}>
                                        <CourseDetail/>
                                    </Suspense>
                                )
                            },
                            {
                                path:'college_detail/:id',
                                element:(
                                    <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                        <Spin/>
                                    </div>}>
                                        <CollegeCourse/>
                                    </Suspense>
                                )
                            },
                            {
                                path:'achievement',
                                element:(
                                    <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                        <Spin/>
                                    </div>}>
                                        <Achievement/>
                                    </Suspense>
                                )
                            },
                        ]
                    }
                ]
            }
        ]
    },
]
export default router;