import axiosClient from '../apiClient';

export function getTransactions(userToken) {
  return axiosClient({
    method: 'GET',
    url: '/transactions?from=2021-06-10T13:00:06.000Z&to=2021-07-18T16:00:00.000Z&from_account_id=2&to_account_id=1&page=1&page_size=5&sort_by=createdAt&order_by=desc',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}
