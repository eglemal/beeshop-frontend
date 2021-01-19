import axios from 'axios';

export const register = (user) => {
    return axios.post('/api/1.0/users', user);
}

export const login = (user) => {
    return axios.post('/api/1.0/login', {}, { auth: user });
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        axios.defaults.headers.common['Authorization'] = `Basic ${btoa(username + ':' + password)}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`);
}

export const getProductByName = (productName) => {
    return axios.get(`/api/1.0/product/${productName}`);
}

export const getProducts = () => {
    return axios.get(`/api/1.0/products`);
}