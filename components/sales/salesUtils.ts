export const parseArgentinePrice = (priceString: string): number => {
  let numericString = priceString.replace('$', '').trim();
  numericString = numericString.replace(/\./g, '');
  numericString = numericString.replace(',', '.');
  return parseFloat(numericString) || 0;
};

export const parseArgentineKilos = (kilosString: string): number => {
  const numericString = kilosString.replace(',', '.');
  return parseFloat(numericString) || 0;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};