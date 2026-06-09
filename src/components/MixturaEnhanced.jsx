// MixturaAvanzada.jsx
import { motion } from 'framer-motion';

const generateRainParticles = () => {
  const elements = [
    { type: 'emoji', value: '🥚', size: [20, 28] },
    { type: 'emoji', value: '🥛', size: [22, 30] },
    { type: 'emoji', value: '🍫', size: [18, 26] },
    { type: 'emoji', value: '🧁', size: [20, 28] },
    { type: 'emoji', value: '✨', size: [16, 24] },
    { type: 'emoji', value: '⭐', size: [18, 26] },
    { type: 'emoji', value: '🎂', size: [22, 32] },
    { type: 'emoji', value: '🍰', size: [22, 32] },
    { type: 'emoji', value: '🎉', size: [18, 26] },
    { type: 'emoji', value: '💫', size: [16, 24] },
    { type: 'circle', color: 'bg-yellow-400', size: [8, 14] },
    { type: 'circle', color: 'bg-pink-400', size: [8, 14] },
    { type: 'circle', color: 'bg-purple-400', size: [8, 14] },
    { type: 'circle', color: 'bg-blue-400', size: [8, 14] },
    { type: 'circle', color: 'bg-green-400', size: [8, 14] },
    { type: 'confetti', color: 'from-yellow-400 to-pink-400', size: [6, 12] },
  ];

  return Array.from({ length: 80 }, (_, i) => {
    const element = elements[i % elements.length];
    const sizeRange = Array.isArray(element.size) ? element.size : [element.size, element.size];
    const size = sizeRange[0] + (i % (sizeRange[1] - sizeRange[0] + 1));
    
    return {
      id: i,
      startX: (i * 73) % 100,
      startDelay: (i * 0.15) % 4,
      duration: 1.5 + (i % 15) * 0.1,
      element: element,
      size: size,
      rotation: (i * 60) % 360,
      sway: (i % 100) - 50, // Para movimiento lateral
    };
  });
};

const STATIC_RAIN = generateRainParticles();

// Componente de confeti individual
const Confetti = ({ color, size }) => (
  <div 
    className={`bg-gradient-to-r ${color} shadow-lg`}
    style={{
      width: `${size}px`,
      height: `${size * 0.6}px`,
      transform: 'rotate(45deg)'
    }}
  />
);

export const MixturaLluvia = ({ isThrowing }) => {
  if (!isThrowing) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 20 }}>
      {/* Capa de partículas cayendo */}
      {STATIC_RAIN.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.startX}%`,
            top: '-50px',
          }}
          initial={{ 
            y: -50,
            x: 0,
            opacity: 0,
            rotate: 0,
            scale: 0
          }}
          animate={{ 
            y: window.innerHeight + 100,
            x: particle.sway,
            opacity: [0, 1, 1, 0.8, 0],
            rotate: particle.rotation * (particle.id % 2 === 0 ? 1 : -1),
            scale: [0, 1, 1, 0.8, 0.5]
          }}
          transition={{ 
            duration: particle.duration,
            delay: particle.startDelay,
            repeat: Infinity,
            repeatDelay: 0,
            ease: [0.4, 0, 0.2, 1] // Curva de aceleración personalizada
          }}
        >
          {particle.element.type === 'emoji' && (
            <div 
              className="filter drop-shadow-lg"
              style={{ fontSize: `${particle.size}px` }}
            >
              {particle.element.value}
            </div>
          )}
          
          {particle.element.type === 'circle' && (
            <div 
              className={`${particle.element.color} rounded-full shadow-lg`}
              style={{ 
                width: `${particle.size}px`, 
                height: `${particle.size}px`,
                boxShadow: '0 0 10px rgba(255,215,0,0.6)'
              }}
            />
          )}
          
          {particle.element.type === 'confetti' && (
            <Confetti color={particle.element.color} size={particle.size} />
          )}
        </motion.div>
      ))}
      
      {/* Capa adicional de brillos (partículas más pequeñas y rápidas) */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${(i * 97) % 100}%`,
            top: '-10px',
          }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ 
            y: window.innerHeight + 50,
            opacity: [0, 1, 0],
          }}
          transition={{ 
            duration: 0.8 + (i % 10) * 0.1,
            delay: (i * 0.1) % 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};