export const getToken = () => {
   const user =JSON.parse(localStorage.getItem('user'));
     if(user){
        return user.state.token;
     }
}