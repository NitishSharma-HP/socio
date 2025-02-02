const setToken = (token)=> localStorage.setItem('token', token);
const getToken = ()=> localStorage.getItem('token');
const deleteToken = ()=> localStorage.removeItem('token');

const setSessionUser = (name,email,id, userRole)=> localStorage.setItem('user',JSON.stringify({
        'userRole': userRole,
        'name': name,
        'email': email,
        'id': id,
}));
const getSessionUser = ()=> localStorage.getItem('user');
const deleteSessionUser = ()=> localStorage.removeItem('user');

export {setToken, getToken, deleteToken, setSessionUser, getSessionUser, deleteSessionUser};