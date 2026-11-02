// Íconos de línea simples dibujados en SVG (24x24).
const TRAZOS = {
  inicio: <><path d='M3 10.5 12 3l9 7.5' /><path d='M5 9.5V21h14V9.5' /><path d='M10 21v-6h4v6' /></>,
  maletin: <><rect x='3' y='7' width='18' height='13' rx='2' /><path d='M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' /><path d='M3 13h18' /></>,
  enviado: <><path d='M22 2 11 13' /><path d='M22 2 15 22l-4-9-9-4 20-7z' /></>,
  chat: <><path d='M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z' /></>,
  mas: <><circle cx='12' cy='12' r='9' /><path d='M12 8v8M8 12h8' /></>,
  ubicacion: <><path d='M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z' /><circle cx='12' cy='9.5' r='2.5' /></>,
  reloj: <><circle cx='12' cy='12' r='9' /><path d='M12 7v5l3 2' /></>,
  calendario: <><rect x='3' y='5' width='18' height='16' rx='2' /><path d='M3 10h18M8 3v4M16 3v4' /></>,
  edificio: <><rect x='4' y='3' width='16' height='18' rx='1' /><path d='M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1' /></>,
  volver: <><path d='M15 18l-6-6 6-6' /></>,
  derecha: <><path d='M9 18l6-6-6-6' /></>,
  check: <><path d='M20 6 9 17l-5-5' /></>,
  buscar: <><circle cx='11' cy='11' r='7' /><path d='m20 20-3.5-3.5' /></>,
  filtro: <><path d='M3 5h18l-7 8v6l-4 2v-8L3 5z' /></>,
  cerrar: <><path d='M18 6 6 18M6 6l12 12' /></>,
  usuarios: <><circle cx='9' cy='8' r='3.5' /><path d='M2.5 20a6.5 6.5 0 0 1 13 0' /><path d='M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6' /></>,
  dinero: <><rect x='2' y='6' width='20' height='12' rx='2' /><circle cx='12' cy='12' r='2.5' /><path d='M6 10v4M18 10v4' /></>,
  info: <><circle cx='12' cy='12' r='9' /><path d='M12 11v5M12 8h.01' /></>,
  archivo: <><path d='M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z' /><path d='M14 3v5h5' /></>
}

export const Icono = ({ nombre, tamano = 20, className = '' }) => (
  <svg
    className={'icono ' + className}
    width={tamano}
    height={tamano}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    {TRAZOS[nombre]}
  </svg>
)

export default Icono
