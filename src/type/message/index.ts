export interface Message {
   id:number;
   sender_id:number;
   receiver_id:number;
   sender_name:string;
   receiver_name:string;
   content:string;
   create_time:Date;
}