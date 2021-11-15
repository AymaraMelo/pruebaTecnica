import axiosClient from '../apiClient';

export function loginUser(infoUser){
    return axiosClient.post('/users/login', infoUser);
}

export function getUserAccounts(userToken){
    return axiosClient({
        method: 'GET',
        url: '/accounts',
        headers: { 
            'Authorization' : `Bearer ${userToken}`
        },
    });
}