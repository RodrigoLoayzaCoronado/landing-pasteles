import Hero from './components/Hero';
import './App.css';
import { useState } from 'react';
import CakeBuilder from './components/CakeBuilder';
import ProductCatalog from './components/ProductCatalog';
import Cart from './components/Cart';
import { useCart } from './hooks/useCart';
import Footer from './components/Footer';

function App() {
  const { items, addItem, addProduct, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  function handleAddToCart(drawing, phrase, portions, filling) {
    addItem(drawing, phrase, portions, filling);
    setTimeout(() => setCartOpen(true), 600);
  }

  function handleCheckout() {
    alert('¡Gracias por tu pedido! Nos pondremos en contacto pronto 🎂');
    clearCart();
    setCartOpen(false);
  }

  return (
    <main className="w-full bg-[#f0e6f6]">
      {/* Contenedor centrado con padding lateral */}
      <div className="mx-auto w-full max-w-6xl sm:px-6 lg:px-8">

        {/* En mobile: apilados. En lg+: dos columnas lado a lado */}
        <div className="flex flex-col">

          {/* Hero: ocupa todo en mobile, columna fija en desktop */}
          <div className="w-full lg:w-full xl:w-full">
            <Hero />
          </div>

          {/* Builder: crece para llenar el espacio restante */}
          <div className="w-full">
            <CakeBuilder
              onAddToCart={handleAddToCart}
              cartCount={totalItems}
              onOpenCart={() => setCartOpen(true)}
            />
          </div>
          {/* Catálogo de productos: sección después del builder */}
          <div className="w-full">
            <ProductCatalog onAddProduct={addProduct} />
          </div>
        </div>
        <Footer />
      </div>

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        totalPrice={totalPrice}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />
    </main>
  );
}

export default App;