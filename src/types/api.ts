import { Directorio } from './directorio';
import { Producto } from './producto';
import { ImpuestosResponse } from './responses';

export interface APIResponse {
  code: string;
  msg: string;
  state: string;
  result: Result[];
}
export type Result = Directorio | Producto | ImpuestosResponse;
