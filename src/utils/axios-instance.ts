import axios from 'axios';

import { APIResponse } from '../types/api';

export const MOTOR_API = process.env.MOTOR_ENDPOINT || 'localhost';
export const axiosInstance = axios.create({
  baseURL: MOTOR_API,
  auth: {
    username: process.env.MOTOR_USER || 'user',
    password: process.env.MOTOR_PASSWORD || 'password',
  },
});
export async function getApi(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any,
): Promise<APIResponse> {
  const response = await axiosInstance.get<APIResponse>(url, params);

  return response.data;
}

export async function postApi(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any,
): Promise<APIResponse> {
  const response = await axiosInstance.post<APIResponse>(url, payload);

  return response.data;
}
