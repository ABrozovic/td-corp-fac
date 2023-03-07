import axios from 'axios';

import { APIResponse } from '../types/api';

export const MOTOR_API = import.meta.env.VITE_MOTOR_ENDPOINT;
export const axiosInstance = axios.create({
  baseURL: MOTOR_API,
  auth: {
    username: import.meta.env.VITE_MOTOR_USER,
    password: import.meta.env.VITE_MOTOR_PASSWORD,
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
