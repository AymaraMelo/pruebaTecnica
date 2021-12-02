import axiosClient from './apiClient';
import { parseParams } from '../utils/api';

export async function getTransactions(userToken, params) {
  return await axiosClient({
    method: 'GET',
    url: `/transactions?${parseParams(params)}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function getQuotes(userToken) {
  return await axiosClient({
    method: 'GET',
    url: `transactions/rates`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
}

export async function setTransaction(userToken, data) {
  const headers = { Authorization: `Bearer ${userToken}` };
  return await axiosClient.post('/transactions', data, { headers });
}
