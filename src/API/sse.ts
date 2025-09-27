import request from '../ulits/request'
export const sse = (id: number) => {
    return new EventSource(`http://localhost:3000/see/events?userId=${id}`);
}

export const sendMessage = (userId: number, message: string) => {
  return request.post('/see/sendMessage', {   
    userId,
    message,
  })
}