export interface Producto {
  artId: string;
  artNombre: string;
  artPrecio: number;
  artDescripcion: string;
  artUniId: string;
  artNombreUnidad: string;
  artActividad: string;
  artNombreActividad: string;
  artActividadEconomica: string;
  artNombreActividadEconomica: string;
}
export interface SelectedProduct {
  producto?: Producto;
  cantidad?: string;
  precioUnitario?: string;
}
