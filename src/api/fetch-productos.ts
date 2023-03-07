import { getApi } from '../utils/axios-instance';
import { isProductoArray } from '../utils/type-helpers';

export const fetchProductos = async () => {
  const productos = (await getApi('/iptProductoEmp')).result;
  isProductoArray(productos);
  return productos;
};
