import FlorkSVG from './FlorkSVG';

/**
 * CakeThumbnail
 * Vista circular del pastel personalizado: fondo de color, figura Flork y frase.
 * Se usa tanto en la preview del builder como en cada ítem del carrito.
 *
 * Props:
 *  - drawing:  objeto de DRAWINGS   (puede ser null → muestra placeholder)
 *  - phrase:   string               (puede ser vacío)
 *  - size:     'sm' | 'md' | 'lg'  (default: 'md')
 */

const SIZE_MAP = {
  sm: { circle: 86,  svg: 38, textSize: 'text-[6px]'  },
  md: { circle: 148, svg: 88, textSize: 'text-[11px]' },
  lg: { circle: 200, svg: 118, textSize: 'text-[13px]' },
  xl: { circle: 240, svg: 144, textSize: 'text-[15px]' },
};

export default function CakeThumbnail({ drawing, phrase, size = 'md' }) {
  const { circle, svg, textSize } = SIZE_MAP[size] ?? SIZE_MAP.md;

  return (
    <div
      className="relative rounded-full bg-[#ffffff] flex items-center justify-center overflow-hidden flex-shrink-0"
      style={{ width: circle, height: circle }}
    >
      {drawing ? (
        <>
          <FlorkSVG drawing={drawing} size={svg} />
          {phrase && (
            <div
              className={`
                absolute bottom-1 left-0 right-0
                bg-[#f8dae7]/80 backdrop-blur-sm
                text-center font-fredoka text-[#c0396b] leading-tight
                px-1 py-0.5 truncate
                ${textSize}
              `}
            >
              {phrase}
            </div>
          )}
        </>
      ) : (
        <span className="text-2xl opacity-30">🎂</span>
      )}
    </div>
  );
}