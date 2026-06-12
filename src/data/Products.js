import torta from '../assets/torta.png';
import torta1 from '../assets/torta1.png';
import torta2 from '../assets/torta2.png';

export const PORTION_OPTIONS = [2, 4, 6, 8];

export const MULTIPLIERS = { 2: 1, 4: 1.8, 6: 2.5, 8: 3.2 };

export const PRODUCTS = [
  {
    id: 'p1',
    title: 'Torta 3 leches',
    image: torta,
    basePrice: 20,
    accent: '#fde8f0',
    dot: '#f4a7c3',
    fillings: [
      { id: 'dulce',  label: 'Dulce de leche y crema' },
      { id: 'frutos', label: 'Fresas con crema'        },
    ],
  },
  {
    id: 'p2',
    title: 'Chocolate Deluxe',
    image: torta1,
    basePrice: 24,
    accent: '#ede0f7',
    dot: '#b98ce8',
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
    fillings: [
      { id: 'mango',  label: 'Mango y maracuyá'  },
      { id: 'fresas', label: 'Fresas con crema'  },
    ],
  },
];