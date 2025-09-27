import request from '../ulits/request'
export const getMyMessage = (id:number) => {
     return request.get(`/message/getOnemessage/${id}`)
}

export const send =(sendid:number,receiveid:number,content:string,send_name:string,receive_name:string)=>{ 
    return request.post('/message/sendMessage',{
        sendid,
        receiveid,
        content,
        send_name,
        receive_name
    })
}
export const getDetailmessage = (sender_id:number,receiver_id:number) => {
    return request.get(`/message/getDetail/${sender_id}/${receiver_id}`)
}

export const deleteMessage = (id:number) => {
    return request.delete(`/message/deleteMessage/${id}`)
}
