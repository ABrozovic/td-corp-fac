export interface Directorio {
  dirId?: string;
  dirNombre?: string;
  dirRazonSocial?: string;
  dirCI?: string;
  dirComplemento?: string;
  tipoDocumento?: string;
  dirCorreo?: string;
  dirCod: number;
  dirRuc?: string;
  correos?: Correo[];
}

export interface Correo {
  iddId: number;
  iddDireccionCorreo?: string;
  iddActivo: number;
  dirCodCliente: number;
}
