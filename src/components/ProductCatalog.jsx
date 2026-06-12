import { useState } from 'react';
import { PRODUCTS, PORTION_OPTIONS, MULTIPLIERS } from '../data/Products';

function ProductCard({ product, portions, filling, onChangePortions, onChangeFilling, onAddProduct }) {
  const price = (product.basePrice * MULTIPLIERS[portions]).toFixed(2);
  const selectedFilling = product.fillings.find((f) => f.id === filling) ?? product.fillings[0];

  function handleBuy() {
    onAddProduct?.(product, portions, Number(price), {
      id: selectedFilling.id,
      label: selectedFilling.label,
    });
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden border-2 border-[#f3e8f8] flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">

      {/* Imagen con fondo de color pastel por producto */}
      <div
        className="relative flex items-center justify-center"
        style={{ backgroundColor: product.accent }}
      >
        {/* Punto decorativo */}
        <div
          className="absolute top-3 right-3 w-3 h-3 rounded-full opacity-70"
          style={{ backgroundColor: product.dot }}
        />
        <div
          className="absolute top-3 left-3 w-2 h-2 rounded-full opacity-40"
          style={{ backgroundColor: product.dot }}
        />
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain drop-shadow-sm"
        />
      </div>

      {/* Cuerpo */}
      <div className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-3">

        {/* Título */}
        <h3 className="font-fredoka text-[18px] text-[#1a1a2e] leading-tight">
          {product.title}
        </h3>

        {/* Selector de relleno */}
        <div>
          <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-widest mb-1.5">
            Relleno
          </p>
          <div className="flex gap-1.5">
            {product.fillings.map((f) => (
              <button
                key={f.id}
                onClick={() => onChangeFilling(f.id)}
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
        <div>
          <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-widest mb-1.5">
            Porciones
          </p>
          <div className="flex gap-1.5">
            {PORTION_OPTIONS.map((p) => (
              <button
                key={p}
                onClick={() => onChangePortions(p)}
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

        {/* Precio + CTA */}
        <div className="flex flex-col items-center pt-1">
          <span className="font-fredoka text-2xl text-[#1a1a2e] leading-none">
            {price} Bs.
          </span>
          <button
            onClick={handleBuy}
            className="flex w-full items-center justify-center mt-2 bg-[#c0396b] hover:bg-[#a8305c] text-white font-fredoka text-base rounded-full py-2.5 transition-colors active:scale-[0.98]"
          >
            ¡Lo quiero!
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductCatalog({ onAddProduct }) {
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [selectedOptions, setSelectedOptions] = useState(() => {
    return PRODUCTS.reduce((acc, product) => {
      acc[product.id] = {
        portions: 2,
        filling: product.fillings[0]?.id,
      };
      return acc;
    }, {});
  });

  function updateProductOptions(productId, updates) {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        ...updates,
      },
    }));
  }
  function handleAddProductWithNotification(product, portions, price, filling) {
    // 1. Ejecuta la lógica original del carrito
    onAddProduct?.(product, portions, price, filling);

    // 2. Muestra la notificación flotante personalizada
    setNotification({
      show: true,
      message: `✓ Agregado al carrito! `
    });

    // 3. La oculta automáticamente después de 2.5 segundos
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 2500);
  }

  return (
    <section className="w-full py-6">
      <div 
        className={`fixed bottom-5 right-5 z-50 bg-[#5a2d8c] text-white  px-6 py-3.5 rounded-2xl shadow-xl transition-all duration-500 transform flex items-center gap-2 ${
          notification.show 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <span>{notification.message}</span>
      </div>
      <div className="px-5">
        {/* Header de sección */}
        <div className="flex items-baseline gap-3 mb-5">
          <h2 className="font-fredoka text-xl text-[#5a2d8c]">Catálogo</h2>
          <span className="text-[11px] font-bold text-[#ccc] uppercase tracking-widest">
            {PRODUCTS.length} pasteles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {PRODUCTS.map((p) => {
            const options = selectedOptions[p.id] ?? {
              portions: 2,
              filling: p.fillings[0]?.id,
            };

            return (
              <ProductCard
                key={p.id}
                product={p}
                portions={options.portions}
                filling={options.filling}
                onChangePortions={(value) => updateProductOptions(p.id, { portions: value })}
                onChangeFilling={(value) => updateProductOptions(p.id, { filling: value })}
                onAddProduct={onAddProduct}
                onAddProduct={handleAddProductWithNotification}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}