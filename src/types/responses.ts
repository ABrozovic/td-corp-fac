export interface ImpuestosResponse {
  facId: string;
  dirId: string;
  dirNombre: string;
  facCodigoDocumentoSector: string;
  nombreCodigoDocumentoSector: string;
  facCodigoMetodoPago: string;
  nombreCodigoMetodoPago: string;
  facCodigoMoneda: string;
  nombreCodigoMoneda: string;
  facTipoCambio: number;
  ttxId: string;
  ttxNombre: string;
  sucid: number;
  sucNombre: string;
  sucDireccion: string;
  sucFono: string;
  pveCodPuntoVenta: string;
  pveNombre: string;
  ideNIT: string;
  facNumeroFactura: string;
  cuf: string;
  cufd: string;
  facFechaEmision: string;
  facNitEmisor: string;
  facLeyenda: string;
  facNombreRazonSocial: string;
  facMunicipio: string;
  facMontoGiftCard: number;
  facDescuentoAdicional: number;
  facMontoDescuentoCreditoDebito: number;
  facMontoDescuento: number;
  SiGiftCard: number;
  iderazonSocialEmisor: string;
  ideLeyendaFueraDeLinea: string;
  Qr: string;
  facEstadoImpuesto: string;
  facEstadoPuntoVenta: string;
  facEstadoFacturado: string;
  facPeriodoFacturado: string;
  facNombreEstudiante: string;
  facResponseTimeSiat: string;
  iptDetTxn: IptDetTxn[];
}

export interface IptDetTxn {
  idfId: number;
  facid: string;
  idfCodigoProducto: string;
  idfNombreProducto: string;
  idfCantidad: number;
  idfDescripcion: string;
  idfPrecioUnitario: number;
  idfMontoDescuento: number;
  idfSubTotal: number;
}
