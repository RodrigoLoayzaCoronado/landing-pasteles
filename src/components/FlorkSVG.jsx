/**
 * FlorkSVG
 * Renderiza el SVG de un dibujo Flork con tamaño y color configurables.
 *
 * Props:
 *  - drawing: objeto de DRAWINGS  (requerido)
 *  - size:    número en px         (default: 80)
 *  - color:   string CSS           (default: '#050f00')
 *  - className: clases adicionales
 */
export default function FlorkImage({ drawing, size = 80, className = '' }) {
  if (!drawing || !drawing.img) return null;

  return (
    <img
      src={drawing.img}
      alt={drawing.label}
      className={`h-auto w-auto object-contain ${className}`}
      style={{ width: `${size}px`, maxWidth: '100%' }}
    />
  );
}