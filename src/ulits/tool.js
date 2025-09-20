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
export const getUserid = () => {
    const user =JSON.parse(localStorage.getItem('user'));
    if(user){
        return user.state.userid;
    }
}
export const getCollege = () => {
    const user =JSON.parse(localStorage.getItem('user'));
    if(user){
        return user.state.college;
    }
}
export const getUniversity = () => {
    const user =JSON.parse(localStorage.getItem('user'));
    if(user){
        return user.state.university;
    }
}