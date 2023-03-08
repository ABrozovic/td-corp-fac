import { postApi } from '../utils/axios-instance';

export const postFacturar = async (data: unknown) => await postApi('/iptFactura', data);
