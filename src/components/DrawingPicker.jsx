import FlorkImage from './FlorkSVG';
import { DRAWINGS } from '../data/Drawing';

/**
 * DrawingPicker
 * Grilla scrolleable de tarjetas con los 22 dibujos Flork.
 *
 * Props:
 *  - selected:   id del dibujo seleccionado (string | null)
 *  - onSelect:   (drawing) => void
 */
export default function DrawingPicker({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-3">
      {DRAWINGS.map((drawing) => {
        const isSelected = selected === drawing.id;
        return (
          <button
            key={drawing.id}
            onClick={() => onSelect(drawing)}
            className={`
              flex flex-col items-center justify-between gap-1 p-2 rounded-2xl border-2
              h-24 sm:h-28
              transition-all duration-150 active:scale-95
              ${isSelected
                ? 'border-[#c0396b] bg-[#fff0f5] shadow-sm'
                : 'border-transparent bg-white hover:border-[#f8dae7]'
              }
            `}
          >
            <div className="w-full h-16 lg:h-20 flex items-center justify-center">
              <FlorkImage
                drawing={drawing}
                size= {120}
                className="max-h-full max-w-full"
              />
            </div>
            <span className="text-[9px] font-bold text-[#888] leading-tight text-center line-clamp-1 w-full">
              {drawing.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}