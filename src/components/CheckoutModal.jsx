// components/CheckoutModal.jsx
import { useState } from 'react';

const WHATSAPP_NUMBER = '59168645946'; // ← reemplaza con el número real

// ── Formateador del mensaje ──────────────────────────────────────────────────
function formatOrderMessage(items, totalPrice, name, phone) {
  let msg = `🎂 *NUEVO PEDIDO — Pastelería*\n\n`;
  msg += `👤 *Cliente:* ${name}\n`;
  msg += `📱 *Teléfono:* ${phone}\n`;
  msg += `───────────────\n`;
  msg += `🛒 *Productos:*\n\n`;

  items.forEach((item, i) => {
    // Nombre según tipo de ítem
    const title = item.drawing
      ? `Pastel personalizado — ${item.drawing.label}`
      : item.productTitle;

    msg += `${i + 1}. *${title}*\n`;

    if (item.phrase)       msg += `   ✏️ Frase: "${item.phrase}"\n`;
    if (item.fillingLabel) msg += `   🍓 Relleno: ${item.fillingLabel}\n`;
    if (item.portions)     msg += `   🍰 Porciones: ${item.portions}\n`;

    msg += `   🔢 Cantidad: ${item.quantity}\n`;
    msg += `   💵 Subtotal: Bs. ${(item.price * item.quantity).toFixed(2)}\n\n`;
  });

  msg += `───────────────\n`;
  msg += `💰 *Total: Bs. ${totalPrice.toFixed(2)}*\n`;
  msg += `📅 ${new Date().toLocaleString('es-BO', { timeZone: 'America/La_Paz' })}`;

  return msg;
}

// ── URL de WhatsApp ──────────────────────────────────────────────────────────
function buildWhatsAppURL(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// ── Componente ───────────────────────────────────────────────────────────────
/**
 * CheckoutModal
 *
 * Props:
 *  - isOpen:      boolean
 *  - onClose:     () => void
 *  - items:       array de ítems del carrito (de useCart)
 *  - totalPrice:  number (de useCart)
 *  - onClearCart: () => void (clearCart de useCart)
 */
export default function CheckoutModal({ isOpen, onClose, items, totalPrice, onClearCart }) {
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [errors, setErrors]   = useState({});
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // ── Validación ─────────────────────────────────────────────────────────────
  function validate() {
    const e = {};
    if (!name.trim() || name.trim().length < 2)
      e.name = 'Ingresa tu nombre completo';
    if (!/^\+?[\d\s-]{7,15}$/.test(phone.trim()))
      e.phone = 'Ingresa un número válido (ej: 68645946)';
    if (items.length === 0)
      e.cart = 'No hay productos en el carrito';
    return e;
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    // Abrir WhatsApp sincrónicamente (mismo tick que el gesto del usuario)
    const msg = formatOrderMessage(items, totalPrice, name.trim(), phone.trim());
    const url = buildWhatsAppURL(WHATSAPP_NUMBER, msg);
    window.open(url, '_blank') || (window.location.href = url);

    onClearCart();
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setName('');
      setPhone('');
      onClose();
    }, 3000);
  }

  function handleClose() {
    onClose();
    setErrors({});
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/40 z-50"
      />

      {/* Panel */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full sm:max-w-md lg:max-w-lg bg-white rounded-t-[28px] z-50 shadow-2xl pb-10 px-5 pt-5">

        {/* Handle */}
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 bg-[#eee] rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-fredoka text-xl text-[#1a1a2e]">Finalizar pedido 🎂</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 bg-[#f5f5f5] rounded-full flex items-center justify-center text-[#888] hover:text-[#1a1a2e] transition-colors"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {success ? (
          // ── Estado de éxito ──────────────────────────────────────────────
          <div className="text-center py-8">
            <p className="text-5xl mb-3">🎉</p>
            <p className="font-fredoka text-xl text-[#1a1a2e]">¡Pedido enviado!</p>
            <p className="text-sm text-[#888] mt-1">Te redirigimos a WhatsApp para confirmar.</p>
          </div>
        ) : (
          // ── Formulario ───────────────────────────────────────────────────
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Resumen rápido */}
            <div className="bg-[#fafafa] rounded-2xl p-4 border border-[#f0f0f0]">
              <p className="text-sm text-[#888] font-bold">
                {items.reduce((s, i) => s + i.quantity, 0)} producto(s)
              </p>
              <p className="font-fredoka text-2xl text-[#1a1a2e] mt-1">
                Total: Bs. {totalPrice.toFixed(2)}
              </p>
            </div>

            {/* Nombre */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-[#555]">Tu nombre</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej: María García"
                className={`
                  border rounded-xl px-4 py-3 text-sm outline-none
                  transition-colors font-bold
                  ${errors.name
                    ? 'border-[#c0396b] bg-[#fff5f8]'
                    : 'border-[#eee] focus:border-[#c0396b]'}
                `}
              />
              {errors.name && (
                <p className="text-xs text-[#c0396b] font-bold">{errors.name}</p>
              )}
            </div>

            {/* Teléfono */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-[#555]">Tu WhatsApp</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Ej: 68645946"
                className={`
                  border rounded-xl px-4 py-3 text-sm outline-none
                  transition-colors font-bold
                  ${errors.phone
                    ? 'border-[#c0396b] bg-[#fff5f8]'
                    : 'border-[#eee] focus:border-[#c0396b]'}
                `}
              />
              {errors.phone && (
                <p className="text-xs text-[#c0396b] font-bold">{errors.phone}</p>
              )}
            </div>

            {/* Error de carrito vacío */}
            {errors.cart && (
              <p className="text-xs text-[#c0396b] font-bold text-center">{errors.cart}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#25D366] text-white font-fredoka text-lg rounded-full py-3.5 active:scale-[0.98] transition-transform mt-2"
            >
              Enviar por WhatsApp 💬
            </button>
          </form>
        )}
      </div>
    </>
  );
}