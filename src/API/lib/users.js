import axiosClient from '../apiClient';

export async function loginUser(infoUser) {
  return await axiosClient.post('/users/login', infoUser);
}

export async function getUser(userToken) {
  return axiosClient({
    method: 'GET',
    url: '/users/me',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export function getUserAccounts(userToken) {
  return axiosClient({
    method: 'GET',
    url: '/accounts',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
