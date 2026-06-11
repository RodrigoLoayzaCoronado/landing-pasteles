import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MixturaLluvia } from './MixturaEnhanced';
import FlorkFigure from '../assets/flork.svg?react';

export default function Hero() {
  const [isThrowing, setIsThrowing] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const startRain = () => {
      setIsThrowing(true);
      setTimeout(() => setIsThrowing(false), 15000);
    };

    startRain();
    intervalRef.current = setInterval(startRain, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="w-full bg-[#b8e7f0] pb-7 relative overflow-hidden  lg:rounded-3xl">

      {/* Navbar */}
      <div className="flex justify-between items-center px-5 pt-5 relative z-10">
        <span className="font-fredoka text-[22px] text-[#5a2d8c]">Trilogia Dulce</span>
      </div>

      {/* Layout interno: texto + figura en fila en lg */}
      <div className="lg:flex lg:items-end lg:gap-4">

        {/* Texto y botones */}
        <div className="px-5 pt-6 relative z-10 lg:flex-1 lg:pb-4">
          <span className="inline-block bg-[#f8dae7] text-[#9a2050] text-xs font-bold rounded-full px-3 py-1 mb-3 border border-[#f0b0d0]">
            Mini Tortas únicas & divertidas
          </span>
          <h1 className="font-fredoka text-[28px] sm:text-[32px] lg:text-[36px] leading-tight text-[#1a1a2e] mb-4">
            Arma tu propio<br />pastel{' '}
            <span className="text-[#c0396b]">divertido!</span>
          </h1>
          <p className="text-sm text-[#2d5e7a] leading-relaxed mb-5 max-w-xs">
            Tortas personalizadas, arma tu torta ideal o elige entre nuestros diseños. ¡Sorprende a tus seres queridos con un regalo dulce y divertido!
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-[#c0396b] text-white font-extrabold text-sm rounded-full py-3 transition-transform active:scale-[0.98]">
              Armar mi torta
            </button>
            <button className="flex-1 border-2 border-[#1a1a2e] text-[#1a1a2e] font-bold text-sm rounded-full py-3 transition-transform active:scale-[0.98]">
              Catálogo
            </button>
          </div>
        </div>

        {/* Figura + lluvia */}
        <div className="flex justify-center mt-4 relative px-5 lg:mt-0 lg:flex-shrink-0 lg:pb-2">
          <MixturaLluvia isThrowing={isThrowing} />
          <motion.div
            animate={isThrowing ? {
              rotate: [0, -5, 5, -3, 0],
              scale: [1, 1.05, 1],
              transition: { duration: 0.6 },
            } : {}}
            className="relative z-10"
          >
            <FlorkFigure className="w-36 sm:w-48 lg:w-44 xl:w-52 max-w-full" />
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 px-5 mt-5">
        {[
          { num: '100+', label: 'Pasteles entregados' },
          { num: '100%', label: 'Clientes felices' },
          { num: '24h',  label: 'Entrega rápida' },
        ].map(({ num, label }) => (
          <div
            key={label}
            className="bg-white/65 rounded-2xl py-2 text-center border border-white/90"
          >
            <span className="font-fredoka text-lg text-[#1a1a2e] block">{num}</span>
            <span className="text-[10px] text-[#2d5e7a] font-bold block mt-0.5 leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Botón lluvia manual */}
      <button
        onClick={() => {
          setIsThrowing(true);
          setTimeout(() => setIsThrowing(false), 3000);
        }}
        className="absolute bottom-3 right-3 bg-[#5a2d8c] text-white text-xs px-3 py-1 rounded-full z-20 shadow-lg"
      >
        🎉 Lluvia
      </button>
    </div>
  );
}