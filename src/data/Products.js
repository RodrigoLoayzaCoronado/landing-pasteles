import torta from '../assets/torta.png';
import torta1 from '../assets/torta1.png';
import torta2 from '../assets/torta2.png';

export const PORTION_OPTIONS = [4, 6, 8, 10, 15];

export const MULTIPLIERS = { 4: 1, 6: 1.8, 8: 2.5, 10: 3.2, 15: 4 };

export const PRODUCTS = [
  {
    id: 'p1',
    title: 'Torta clasica',
    image: torta,
    basePrice: 20,
    accent: '#fde8f0',
    dot: '#f4a7c3',
    queque: [
      { id: 'vainilla',  label: 'Vainilla' },
      { id: 'chocolate', label: 'Chocolate'},
    ],
    fillings: [
      { id: 'dulce',  label: 'Dulce de leche' },
      { id: 'frutos', label: 'Crema'},
      { id: 'fresas', label: 'fresas' },
    ],
  },
  {
    id: 'p2',
    title: 'Chocolate Deluxe',
    image: torta1,
    basePrice: 24,
    accent: '#ede0f7',
    dot: '#b98ce8',
    queque: [
      { id: 'vainilla',  label: 'Vainilla' },
      { id: 'chocolate', label: 'Chocolate'},
    ],
    fillings: [
      { id: 'ganache', label: 'Ganache de chocolate'  },
      { id: 'oreo',    label: 'Crema de Oreo'         },
      { id: 'mousse',  label: 'Mousse de chocolate'   },
    ],
  },
  {
    id: 'p3',
    title: 'Frutas Tropicales',
    image: torta2,
    basePrice: 26,
    accent: '#d9f5e8',
    dot: '#5ec491',
    queque: [
      { id: 'vainilla',  label: 'Vainilla' },
      { id: 'chocolate', label: 'Chocolate'},
    ],
    fillings: [
      { id: 'mango',  label: 'Mango y maracuyá'  },
      { id: 'fresas', label: 'Fresas con crema'  },
    ],
  },
];