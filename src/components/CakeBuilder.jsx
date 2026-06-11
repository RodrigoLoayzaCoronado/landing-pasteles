import { useState } from 'react';
import DrawingPicker from './DrawingPicker';
import PhraseInput from './PhraseInput';
import CakeThumbnail from './CakeThumbnail';
import CartImg from '../assets/cart.png';

/**
 * CakeBuilder
 * Flujo de 3 pasos: elegir dibujo → escribir frase → preview → agregar al carrito.
 *
 * Props:
 *  - onAddToCart:  (drawing, phrase) => void
 *  - cartCount:    number  — para el badge del botón carrito
 *  - onOpenCart:   () => void
 */
export default function CakeBuilder({ onAddToCart, cartCount, onOpenCart }) {
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [phrase, setPhrase] = useState('');
  const [added, setAdded] = useState(false);

  const isReady = selectedDrawing !== null && phrase.trim().length > 0;

  function handleAdd() {
    if (!isReady) return;
    onAddToCart(selectedDrawing, phrase);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="w-full bg-[#ffe9f9] min-h-screen pb-10 rounded-3xl">

      {/* Título */}
      <div className="px-5 pt-5 pb-1">
        <span className="font-fredoka text-xl text-[#5a2d8c]">ARMA TU PASTEL</span>
      </div>

      {/* 
        En mobile: columna única.
        En lg+: dos columnas — izquierda (dibujo + frase), derecha (preview + CTA).
        Ambas columnas están DENTRO de este div para que el grid las contenga bien.
      */}
      <div className="px-5 ">

        {/* ── Columna izquierda ── */}
        <div className="flex flex-col">

          {/* Paso 1 */}
          <section className="py-3">
            <h2 className="font-fredoka text-[15px] text-[#1a1a2e] mb-3">
              1. Elige tu dibujo
            </h2>
            <DrawingPicker
              selected={selectedDrawing?.id ?? null}
              onSelect={setSelectedDrawing}
            />
          </section>

          {/* Paso 2 */}
          <section className="py-3">
            <h2 className="font-fredoka text-[15px] text-[#1a1a2e] mb-3">
              2. Tu frase para el pastel
            </h2>
            <PhraseInput value={phrase} onChange={setPhrase} />
          </section>
        </div>

        {/* ── Columna derecha ── */}
        <div className="flex flex-col lg:sticky lg:top-6">

          {/* Paso 3 */}
          <section className="py-3">
            <h2 className="font-fredoka text-[15px] text-[#1a1a2e] mb-3">
              3. Así quedará tu pastel
            </h2>
            <div className="bg-white rounded-2xl border-2 border-dashed border-[#f8dae7] p-5 flex flex-col items-center gap-3">
              <p className="text-[10px] font-bold text-[#ccc] tracking-widest uppercase">
                Vista previa
              </p>
              <CakeThumbnail
                drawing={selectedDrawing}
                phrase={phrase}
                size="lg"
              />
              {!selectedDrawing && (
                <p className="text-xs text-[#ccc] font-bold">
                  Elige un dibujo para ver la preview
                </p>
              )}
              <span className="text-[12px] text-[#bbb] font-bold">
                Nota: La posición de la frase puede variar ligeramente en el producto final dependiendo del largo del texto.
              </span>
            </div>
          </section>

          {/* CTA */}
          <div className="pt-2 pb-4">
            <button
              onClick={handleAdd}
              disabled={!isReady}
              className={`
                w-full font-fredoka text-lg rounded-full py-3.5
                transition-all duration-200 active:scale-[0.98]
                ${isReady
                  ? added
                    ? 'bg-[#2d8c60] text-white'
                    : 'bg-[#c0396b] text-white'
                  : 'bg-[#e0e0e0] text-[#bbb] cursor-not-allowed'
                }
              `}
            >
              {added ? '✓ Agregado al carrito' : '🛒 Agregar al carrito'}
            </button>

            {!isReady && (
              <p className="text-center text-[11px] text-[#bbb] font-bold mt-2">
                {!selectedDrawing
                  ? 'Elige un dibujo y escribe tu frase'
                  : 'Escribe tu frase para continuar'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Botón carrito flotante */}
      {cartCount > 0 && (
        <button
          onClick={onOpenCart}
          className="fixed bottom-4 right-4 w-12 h-12 bg-[#c0396b] rounded-full shadow-xl flex items-center justify-center sm:bottom-6 sm:right-6 lg:w-16 lg:h-16 lg:bottom-16 lg:right-64"
        >
          <img src={CartImg} alt="Carrito" className="w-6 h-6" />
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-[#c0396b] text-[11px] font-bold rounded-full flex items-center justify-center border border-[#c0396b] lg:w-6 lg:h-6 lg:text-[10px]">
            {cartCount}
          </span>
        </button>
      )}
    </div>
  );
}