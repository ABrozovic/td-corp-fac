import { getApi } from '../utils/axios-instance';
import { isDirectorioArray } from '../utils/type-helpers';

export const fetchClientes = async () => {
  const clientes = (await getApi('/gntDirectorio')).result;
  isDirectorioArray(clientes);
  return clientes;
};
