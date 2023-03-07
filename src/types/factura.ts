export interface Factura {
  facId: string;
  ttxId: string;
  facCodigoDocumentoSector: string;
  dirId: string;
  facCodigoMetodoPago: string;
  facCodigoMoneda: string;
  sucId: string;
  pveId: string;
  facNumeroTarjeta: string;
  facTipoCambio: string;
  facDescuentoAdicional: string;
  facMontoGiftCard: string;
  facUsuario: string;
  facNombreEstudiante: string;
  facPeriodoFacturado: string;
  facEnviaFactura: string;
  facturaDetalle: FacProductos[];
}

export interface FacProductos {
  idfCodigoProducto: string;
  idfDescripcion: string;
  idfCantidad: string;
  idfPrecioUnitario: string;
  idfMontoDescuento: string;
}
