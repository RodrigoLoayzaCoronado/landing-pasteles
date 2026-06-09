// Hero.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MixturaLluvia } from './MixturaEnhanced'; // Asegúrate de que la ruta sea correcta
import FlorkFigure from '../assets/flork.svg?react';

export default function Hero() {
  const [isThrowing, setIsThrowing] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Función para activar la lluvia
    const startRain = () => {
      setIsThrowing(true);
      
      // Programar la detención de la lluvia después de 3 segundos
      setTimeout(() => {
        setIsThrowing(false);
      }, 15000);
    };

    // Iniciar la primera lluvia al montar el componente
    startRain();

    // Configurar el intervalo para repetir cada 8 segundos
    intervalRef.current = setInterval(startRain, 3000);

    // Limpiar el intervalo y los timeouts al desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // El array vacío asegura que el efecto se ejecute SOLO UNA VEZ

  return (
    <div className="w-full max-w-sm mx-auto bg-[#b8e7f0] rounded-b-[40px] pb-7 relative overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute w-32 h-32 rounded-full bg-[#f8dae7]/40 -top-8 -right-8" />
      <div className="absolute w-20 h-20 rounded-full bg-[#f8dae7]/30 top-16 right-3" />

      {/* Navbar */}
      <div className="flex justify-between items-center px-5 pt-5 relative z-10">
        <span className="font-fredoka text-[22px] text-[#5a2d8c]">🎂 FlorKakes</span>
        <button className="w-9 h-9 bg-[#f8dae7] rounded-full flex items-center justify-center">
        </button>
      </div>

      {/* Contenido */}
      <div className="px-5 pt-4 relative z-10">
        <span className="inline-block bg-[#f8dae7] text-[#9a2050] text-xs font-bold rounded-full px-4 py-1 mb-3 border border-[#f0b0d0]">
          ✨ Pasteles únicos & divertidos
        </span>
        <h1 className="font-fredoka text-[34px] leading-tight text-[#1a1a2e] mb-2">
          Pasteles que<br />te hacen <span className="text-[#c0396b]">reír</span><br />y salivar 🤤
        </h1>
        <p className="text-sm text-[#2d5e7a] leading-relaxed mb-5">
          Tortas personalizadas estilo Flork: los memes más virales convertidos en el pastel perfecto para tu ocasión especial.
        </p>
        <div className="flex gap-2 mb-0">
          <button className="flex-1 bg-[#c0396b] text-white font-extrabold text-sm rounded-full py-3">
            Ver catálogo
          </button>
          <button className="flex-1 border-2 border-[#1a1a2e] text-[#1a1a2e] font-bold text-sm rounded-full py-3">
            Pedir ya
          </button>
        </div>
      </div>

      {/* Ilustración con lluvia de mixtura */}
      <div className="flex justify-center mt-1 relative">
        {/* Capa de lluvia - se muestra solo cuando isThrowing es true */}
        <MixturaLluvia isThrowing={isThrowing} />
        
        {/* SVG animado con movimiento sutil al lanzar */}
        <motion.div
          animate={isThrowing ? { 
            rotate: [0, -5, 5, -3, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 0.6 }
          } : {}}
          className="relative z-10"
        >
          <FlorkFigure className="w-56" />
        </motion.div>
      </div>

      {/* Stats */}
      <div className="flex gap-2 px-5 mt-4">
        {[
          { num: '200+', label: 'Pasteles entregados' },
          { num: '100%', label: 'Clientes felices' },
          { num: '48h',  label: 'Entrega rápida' },
        ].map(({ num, label }) => (
          <div key={label} className="flex-1 bg-white/65 rounded-2xl py-2 text-center border border-white/90">
            <span className="font-fredoka text-xl text-[#1a1a2e] block">{num}</span>
            <span className="text-[11px] text-[#2d5e7a] font-bold block mt-0.5">{label}</span>
          </div>
        ))}
      </div>
      
      {/* Botón opcional para activar manualmente */}
      <button 
        onClick={() => {
          setIsThrowing(true);
          setTimeout(() => setIsThrowing(false), 3000);
        }}
        className="absolute bottom-2 right-2 bg-purple-500 text-white text-xs px-3 py-1 rounded-full z-20 shadow-lg"
      >
        🎉 Lluvia
      </button>
    </div>
  );
}