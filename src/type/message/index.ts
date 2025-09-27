export interface Message {
   id:number;
   send_id:number;
   receive_id:number;
   sender_name:string;
   receiver_name:string;
   content:string;
   status:string;
   create_time:Date;
}