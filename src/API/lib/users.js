import axiosClient from '../apiClient';

export async function loginUser(infoUser) {
  return await axiosClient.post('/users/login', infoUser);
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
