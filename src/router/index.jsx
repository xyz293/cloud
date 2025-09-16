import {lazy,Suspense} from 'react';
import {Spin} from 'antd';
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
const College = lazy(()=>import('../page/user/college/index'));
const First_page = lazy(()=>import('../page/user/college/firsrt_page'));
const Class = lazy(()=>import('../page/user/college/Class'));
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
                                <Job/>
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
                                <Department/>
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
                path:'college',
                element:(
                    <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                        <Spin/>
                    </div>}>
                        <College/>
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
                        path:'class',
                        element:(
                            <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                                <Spin/>
                            </div>}>
                                <Class/>
                            </Suspense>
                        )
                    }
                ]
            }
        ]
    }
]
export default router;