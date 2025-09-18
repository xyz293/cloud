export const getToken = () => {
   const user =JSON.parse(localStorage.getItem('user'));
     if(user){
        return user.state.token;
     }
}
export const getId = () => {
    const user =JSON.parse(localStorage.getItem('user'));
    if(user){
        return user.state.id;
    }
}
export const getUsername = () => {
    const user =JSON.parse(localStorage.getItem('user'));
    if(user){
        return user.state.username;
    }
}