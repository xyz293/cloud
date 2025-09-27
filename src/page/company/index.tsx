import {sse} from '../../API/sse'
import {useEffect, useState} from 'react'
const Company = () => {
    const [id,setId] = useState(2)
    useEffect(() => {
      const source = sse(id)
      console.log(source)
      source.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log('Received message:', data.message)
      }
      return () => {
        source.close()
      }
    }, [id])
   return (
    <div>
     11
    </div>
  )
}
export default Company