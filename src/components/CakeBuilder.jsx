import { useState } from 'react';
import DrawingPicker from './DrawingPicker';
import PhraseInput from './PhraseInput';
import CakeThumbnail from './CakeThumbnail';
import CartImg from '../assets/cart.png';
import { PORTION_OPTIONS, PRODUCTS } from '../data/Products';

const PHRASE_PRESETS = [
  { id: 'preset-1', label: 'Jodiendo desde ____', hasNumber: true },
  { id: 'preset-2', label: 'Ay no! ya tienes __', hasNumber: true },
  { id: 'preset-3', label: '__ pero a que costo', hasNumber: true },
  { id: 'preset-4', label: 'Es hoy, es hoy Feliz Cumpleaños!', hasNumber: false },
  { id: 'preset-5', label: 'Feliz cumple!', hasNumber: true },
  { id: 'preset-6', label: 'Sos mi persona favorita', hasNumber: false },
  { id: 'preset-7', label: 'Te amo hasta el infinito y más allá', hasNumber: false },
  { id: 'preset-8', label: 'Eres el mejor del mundo mundial', hasNumber: false },
  { id: 'preset-9', label: 'Hoy es mi cumple, no me estresen', hasNumber: false },
  { id: 'preset-10', label: 'Cada Año mas mamado', hasNumber: false },
  { id: 'preset-11', label: 'Nivel __ desbloqueado', hasNumber: true },
];

/**
 * CakeBuilder
 * Flujo de 3 pasos: elegir dibujo → escribir frase → preview → agregar al carrito.
 *
 * Props:
 *  - onAddToCart:  (drawing, phrase, portions, filling) => void
 *  - cartCount:    number  — para el badge del botón carrito
 *  - onOpenCart:   () => void
 */
export default function CakeBuilder({ onAddToCart, cartCount, onOpenCart }) {
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [phrase, setPhrase] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [presetNumber, setPresetNumber] = useState('');
  const [portions, setPortions] = useState(2);
  const [filling, setFilling] = useState(PRODUCTS[0].fillings[0].id);
  const [added, setAdded] = useState(false);

  function formatPresetPhrase(template, number) {
    if (!template) return '';
    if (!template.hasNumber) return template.label;
    return template.label.replace(/_+/g, number);
  }

  function handlePresetSelect(template) {
    setSelectedPreset(template);
    setPresetNumber('');
    setPhrase(template.label.trim());
  }

  function handlePresetNumberChange(value) {
    const digits = value.replace(/\D/g, '');
    setPresetNumber(digits);
    if (selectedPreset) {
      setPhrase(formatPresetPhrase(selectedPreset, digits));
    }
  }

  function handlePhraseChange(value) {
    setPhrase(value);
    if (selectedPreset) {
      setSelectedPreset(null);
      setPresetNumber('');
    }
  }

  const isReady = selectedDrawing !== null && phrase.trim().length > 0;
  const fillings = PRODUCTS[0].fillings;

  function handleAdd() {
    if (!isReady) return;
    const selectedFilling = fillings.find(f => f.id === filling) || fillings[0];
    onAddToCart(selectedDrawing, phrase, portions, selectedFilling);
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
            <div className="space-y-3">
              <div className="overflow-x-auto no-scrollbar">
                <div className="inline-flex gap-2">
                  {PHRASE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      className={`
                        inline-flex items-center whitespace-nowrap rounded-2xl border px-3 py-2 text-sm font-bold transition-all duration-150
                        ${selectedPreset?.id === preset.id
                          ? 'border-[#c0396b] bg-[#fff0f5] text-[#c0396b]'
                          : 'border-[#f0f0f0] bg-white text-[#444] hover:border-[#f8dae7]'
                        }
                      `}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {selectedPreset?.hasNumber && (
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-[#777] uppercase tracking-widest">
                    Ingresa número para reemplazar __
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={presetNumber}
                    onChange={(e) => handlePresetNumberChange(e.target.value)}
                    placeholder="Ej. 25"
                    className="w-full rounded-2xl border border-[#eee] bg-white px-3 py-2 text-base outline-none focus:border-[#c0396b]"
                  />
                </div>
              )}

              <PhraseInput value={phrase} onChange={handlePhraseChange} />
            </div>
          </section>
        </div>

        {/* ── Columna derecha ── */}
        <div className="flex flex-col lg:sticky lg:top-6">

          {/* Paso 3 */}
          <section className="py-3">
            <h2 className="font-fredoka text-[15px] text-[#1a1a2e] mb-3">
              3. Así quedará tu pastel
            </h2>
            <div className="bg-[#aaeeff] rounded-2xl border-2 border-dashed border-[#ffb6d6] p-5 flex flex-col items-center gap-3">
              <p className="text-[10px] font-bold text-[#000] tracking-widest uppercase">
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
              <span className="text-[12px] text-[#808080] font-bold">
                Nota: La posición de la frase puede variar ligeramente en el producto final dependiendo del largo del texto.
              </span>
            </div>
          </section>

          {/* CTA */}
          <div className="pt-2 pb-4">
            {/* Selector de relleno */}
            <div className="pb-3">
              <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-widest mb-1.5">
                Relleno
              </p>
              <div className="flex gap-1.5">
                {fillings.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilling(f.id)}
                    title={f.label}
                    className={`
                      flex-1 flex flex-col items-center px-2 gap-0.5 py-1.5 rounded-xl text-[10px] font-bold
                      border-2 transition-all duration-150 active:scale-95
                      ${filling === f.id
                        ? 'border-[#c0396b] bg-[#fff0f5] text-[#c0396b]'
                        : 'border-[#f0f0f0] bg-[#fafafa] text-[#999] hover:border-[#f8dae7]'
                      }
                    `}
                  >
                    <span className="text-center" style={{ fontSize: '12px' }}>
                      {f.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de porciones */}
            <div className="pb-3">
              <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-widest mb-1.5">
                Porciones
              </p>
              <div className="flex gap-1.5">
                {PORTION_OPTIONS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPortions(p)}
                    className={`
                      flex-1 py-1.5 rounded-xl text-sm font-bold border-2
                      transition-all duration-150 active:scale-95
                      ${portions === p
                        ? 'bg-[#5a2d8c] border-[#5a2d8c] text-white'
                        : 'bg-[#fafafa] border-[#f0f0f0] text-[#888] hover:border-[#d4b8f0]'
                      }
                    `}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón de agregar */}
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
          className="fixed bottom-20 right-4 w-12 h-12 z-50 bg-[#c0396b] rounded-full shadow-xl flex items-center justify-center sm:bottom-6 sm:right-6 lg:w-16 lg:h-16 lg:bottom-16 lg:right-64"
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