import {create} from 'zustand'
import {persist} from 'zustand/middleware'
const useStore = create(
    persist(
        (set) => ({
            token: '',
            setToken: (token) => set({token}),
            id:'',
            setId:(id) => set({id}),
            username:'',
            setUsername:(username) => set({username}),
            userid:'',
            setUserid:(userid) => set({userid}),
            college:'',
            setCollege:(college) => set({college}),
            university:'',
            setUniversity:(university) => set({university}),
        }),
        {
            name: 'user',
        }
    )
)
export default useStore