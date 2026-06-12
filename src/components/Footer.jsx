
export default function Footer() {
  return (
    <footer style={styles.footer} className="font-fredoka text-center lg:text-xs">
      <p style={styles.text}>© 2026 Development and Design by NOVAMARK. Todos los derechos reservados.</p>
    </footer>
  );
} 
const styles = {
    footer: {
        backgroundColor: '#f0e6f6',
        color: '#5a2d8c',
        textAlign: 'center',
        padding: '20px 4px',
        marginTop: '5px',
        fontSize: '0.90rem',
    },
    text: {
        margin: 0,
    }
};