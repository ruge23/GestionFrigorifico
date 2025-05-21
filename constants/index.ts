export const cortesDeCarne = [
  {
    nombre: "CARNE MOLIDA ESPECIAL X 500 G ECOMM",
    kilos: "40", 
    precio: "$4.590,00",
    precioSinImpuestos: "$4.153,85",
    imagen: "molida.jpeg",
    marca: "Mir"
  },
  {
    nombre: "COMBO ASADO X UN ECOMM",
    kilos: "40", 
    precio: "$24.475,00",
    precioOriginal: "$25.990,00",
    precioSinImpuestos: "$23.520,36",
    imagen: "comboAsado.jpeg",
    marca: "Mir"
  },
  {
    nombre: "NALGA FETEADA DE NOVILLITO X 500 G ECOMM",
    kilos: "40", 
    precio: "$5.990,00",
    precioSinImpuestos: "$5.420,81",
    imagen: "nalgaFeteada.jpeg",
    marca: "Mir"
  },
  {
    nombre: "CARNE PICADA X 500GR ECOMM",
    kilos: "40", 
    precio: "$4.790,00",
    precioSinImpuestos: "$4.334,84",
    imagen: "carne_picada.jpeg",
    marca: "Mir"
  },
  {
    nombre: "OSOBUCO NOVILLITO X 500 G ECOMM",
    kilos: "40", 
    precio: "$3.663,90",
    precioSinImpuestos: "$3.315,75",
    imagen: "osobuco.jpeg",
    marca: "Mir"
  },
  {
    nombre: "COLITA DE CUADRIL DE NVT X 800G ECOMM",
    kilos: "40", 
    precio: "$10.990,00",
    precioSinImpuestos: "$9.945,70",
    imagen: "cuadril.jpeg",
    marca: "Mir"
  },
  {
    nombre: "COSTELETA NVT ECOMM X 1 KG",
    kilos: "40", 
    precio: "$15.890,00",
    precioSinImpuestos: "$14.380,09",
    imagen: "costeleta.jpeg",
    marca: "Mir"
  },
  {
    nombre: "COSTILLA DE NOVILLO x 1 kg",
    kilos: "40", 
    precio: "$10.990,00",
    precioSinImpuestos: "$9.945,70",
    imagen: "costilla_novillo.jpeg",
    marca: "Frescos"
  },
  {
    nombre: "BOLA DE LOMO DE NOVILLITO x 500 g",
    kilos: "40", 
    precio: "$8.290,00",
    precioSinImpuestos: "$7.502,26",
    imagen: "bolaDeLomo.jpeg",
    marca: "Frescos"
  },
  {
    nombre: "TAPA DE ASADO DE NOVILLITO x 1 kg",
    kilos: "40", 
    precio: "$16.390,00",
    precioSinImpuestos: "$14.832,58",
    imagen: "tapaDeAsado.jpeg",
    marca: "Frescos"
  },
];

export const cortesDeCerdo = [
  {
    nombre: "PECHITO DE CERDO X 1 KG",
    kilos: "1",
    precio: "$6.590,00",
    precioSinImpuestos: "$5.420,81",
    imagen: "pechitoDeCerdo.jpeg",
    marca: "Mir"
  }
];

export const embutidos = [
  {
    nombre: "CHORIZO ENVASADO AL VACIO X 450 G.",
    kilos: "0.45",
    precio: "$7.090,00",
    precioSinImpuestos: "$5.859,50",
    imagen: "chorizo.png",
    marca: "Mir"
  },
  {
    nombre: "MILANESAS DE NALGA X500G",
    kilos: "0.5",
    precio: "$5.990,00",
    precioSinImpuestos: "$4.950,41",
    imagen: "milanesas.jpeg",
    marca: "Mir"
  },
  {
    nombre: "MORCILLA AL VERDEO VACIO",
    kilos: "1", // No se especifica el peso en el nombre, asumo 1 unidad
    precio: "$5.490,00",
    precioSinImpuestos: "$4.537,19",
    imagen: "morcilla.jpeg",
    marca: "Mir"
  },
  {
    nombre: "SALCHICHA MAGRET X 350 G.",
    kilos: "0.35",
    precio: "$5.090,00",
    precioSinImpuestos: "$4.206,61",
    imagen: "salchicha.jpeg"
  },
];

export const otros = [
  {
    nombre: "CARBON VEGETAL BOX X 3KG",
    kilos: "3",
    precio: "$3.499,00",
    precioSinImpuestos: "$2.891,74",
    imagen: "carbon.jpeg",
    marca: "Mir"
  },
  {
    nombre: "HUEVO CARNAVE MAPLE X30UNID",
    kilos: "0.5",
    precio: "$6.200,00",
    precioSinImpuestos: "$4.063,35",
    imagen: "huevos.jpeg",
    marca: "Frescos"
  }
];

export type ImageKeys =
  | 'molida.jpeg'
  | 'comboAsado.jpeg'
  | 'nalgaFeteada.jpeg'
  | 'carne_picada.jpeg'
  | 'osobuco.jpeg'
  | 'cuadril.jpeg'
  | 'costeleta.jpeg'
  | 'costilla_novillo.jpeg'
  | 'bolaDeLomo.jpeg'
  | 'tapaDeAsado.jpeg'
  | 'pechitoDeCerdo.jpeg'
  | 'chorizo.png'
  | 'milanesas.jpeg'
  | 'morcilla.jpeg'
  | 'salchicha.jpeg'
  | 'carbon.jpeg'
  | 'huevos.jpeg';

export const imageMap: Record<ImageKeys, any> = {
  'molida.jpeg': require('../assets/images/carne_vacuna/molida.jpeg'),
  'comboAsado.jpeg': require('../assets/images/carne_vacuna/comboAsado.jpeg'),
  'nalgaFeteada.jpeg': require('../assets/images/carne_vacuna/nalgaFeteada.jpeg'),
  'carne_picada.jpeg': require('../assets/images/carne_vacuna/carne_picada.jpeg'),
  'osobuco.jpeg': require('../assets/images/carne_vacuna/osobuco.jpeg'),
  'cuadril.jpeg': require('../assets/images/carne_vacuna/cuadril.jpeg'),
  'costeleta.jpeg': require('../assets/images/carne_vacuna/costeleta.jpeg'),
  'costilla_novillo.jpeg': require('../assets/images/carne_vacuna/costilla_novillo.jpeg'),
  'bolaDeLomo.jpeg': require('../assets/images/carne_vacuna/bolaDeLomo.jpeg'),
  'tapaDeAsado.jpeg': require('../assets/images/carne_vacuna/tapaDeAsado.jpeg'),
  'pechitoDeCerdo.jpeg':  require('../assets/images/carne_porcina/pechitoDeCerdo.jpeg'),
  'chorizo.png': require('../assets/images/embutidos/chorizo.png'),
  'milanesas.jpeg': require('../assets/images/embutidos/milanesas.jpeg'),
  'morcilla.jpeg': require('../assets/images/embutidos/morcilla.jpeg'),
  'salchicha.jpeg': require('../assets/images/embutidos/salchicha.jpeg'),
  'carbon.jpeg': require('../assets/images/otros/carbon.jpeg'),
  'huevos.jpeg': require('../assets/images/otros/huevos.jpeg'),
};