import {create} from 'zustand'
import {persist} from 'zustand/middleware'
const useStore = create(
    persist(
        (set) => ({
            token: '',
            setToken: (token) => set({token}),
            id:'',
            setId:(id) => set({id}),
        }),
        {
            name: 'user',
        }
    )
)
export default useStore