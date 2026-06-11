import CartItem from './CartItem';

/**
 * Cart
 * Sheet que se desliza desde abajo mostrando los ítems del carrito.
 * Overlay oscuro cierra el panel al hacer click fuera.
 *
 * Props:
 *  - isOpen:     boolean
 *  - onClose:    () => void
 *  - items:      array de ítems del carrito
 *  - totalPrice: number
 *  - onRemove:   (cartId) => void
 *  - onCheckout: () => void
 */
export default function Cart({ isOpen, onClose, items, totalPrice, onRemove, onCheckout }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/40 z-40
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />

      <div
        className={`
          fixed bottom-0 left-1/2 -translate-x-1/2
          w-full sm:max-w-md lg:max-w-lg
          bg-white rounded-t-[28px] z-50
          transition-transform duration-300 ease-out
          max-h-[85vh] sm:max-h-[80vh] flex flex-col
          shadow-2xl
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-[#eee] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 flex-shrink-0">
          <h2 className="font-fredoka text-xl text-[#1a1a2e]">Tu carrito 🛒</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#f5f5f5] rounded-full flex items-center justify-center text-[#888] hover:text-[#1a1a2e] transition-colors"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Lista scrolleable */}
        <div className="flex-1 overflow-y-auto px-5 pb-2">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">🛒</p>
              <p className="text-[#bbb] font-bold text-sm">Tu carrito está vacío</p>
              <p className="text-[#ddd] text-xs mt-1">¡Armá tu primer pastel!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <CartItem key={item.cartId} item={item} onRemove={onRemove} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="flex-shrink-0 px-5 pt-3 pb-8 border-t border-[#f0f0f0]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#888] font-bold">Total</span>
              <span className="font-fredoka text-2xl text-[#1a1a2e]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-[#c0396b] text-white font-fredoka text-lg rounded-full py-3.5 active:scale-[0.98] transition-transform"
            >
              Hacer pedido ✨
            </button>
          </div>
        )}
      </div>
    </>
  );
}