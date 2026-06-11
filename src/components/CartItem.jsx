import CakeThumbnail from './CakeThumbnail';

/**
 * CartItem
 * Fila de ítem en el carrito: thumbnail circular + datos + eliminar.
 *
 * Props:
 *  - item:     objeto del carrito { cartId, drawing, phrase, quantity, price }
 *  - onRemove: (cartId) => void
 */
export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex items-center gap-3 bg-[#fafafa] rounded-2xl p-3 border border-[#f0f0f0]">
      <CakeThumbnail drawing={item.drawing} phrase={item.phrase} size="sm" />

      <div className="flex-1 min-w-0">
        <p className="font-fredoka text-[15px] text-[#1a1a2e] leading-tight">
          Pastel {item.drawing.label}
        </p>
        <p className="text-xs font-bold text-[#c0396b] truncate mt-0.5">
          "{item.phrase}"
        </p>
        <p className="text-xs text-[#aaa] font-bold mt-1">
          ${item.price.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => onRemove(item.cartId)}
        className="text-[#ddd] hover:text-[#c0396b] transition-colors text-lg leading-none p-1 flex-shrink-0 ml-auto"
        aria-label="Eliminar del carrito"
      >
        ✕
      </button>
    </div>
  );
}