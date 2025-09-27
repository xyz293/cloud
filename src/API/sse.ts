import request from '../ulits/request'
export const sse = (id: number) => {
    return new EventSource(`http://localhost:3000/sse/events?userId=${id}`);
}
export const sendMessage = (userId: number, message: string) => {
    return request.post('/sse/send', {
        userId,
        message
    })
}
