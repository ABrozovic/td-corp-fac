import { Result } from '../types/api';
import { Directorio } from '../types/directorio';
import { Producto } from '../types/producto';
import { ImpuestosResponse } from '../types/responses';
function isnt(val: unknown, typeName: string) {
  return new Error(`\`${val}\` no es ${typeName}`);
}

export const isDirectorio = (val: Result): asserts val is Directorio => {
  if (!('dirId' in val)) throw isnt(val, 'un directorio');
};

export function isImpuestosResponse(val: Result): asserts val is ImpuestosResponse {
  if (!('Qr' in val)) throw isnt(val, 'una respuesta de factura');
}

export function isProductoArray(val: Result[] | undefined): asserts val is Producto[] {
  if (Array.isArray(val)) {
    if (!val.every((item) => 'artId' in item && 'artNombre' in item))
      throw isnt(val, 'un array de productos');
  }
}
export function isDirectorioArray(
  val: Result[] | undefined,
): asserts val is Directorio[] {
  if (Array.isArray(val)) {
    if (!val.every((item) => 'dirId' in item && 'dirNombre' in item))
      throw isnt(val, 'un array de usuarios');
  }
}
