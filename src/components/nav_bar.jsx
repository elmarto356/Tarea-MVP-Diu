import { NavLink } from 'react-router-dom'

import { ContadorRespuestas } from '../features/h5-preguntas'
import Icono from './icono'

const LINKS = [
  { to: '/', texto: 'Inicio', icono: 'inicio', end: true },
  { to: '/ofertas', texto: 'Ofertas', icono: 'maletin' },
  { to: '/postulaciones', texto: 'Postulaciones', icono: 'enviado' },
  { to: '/mis-preguntas', texto: 'Preguntas', icono: 'chat', contador: true }
]

export const NavBar = () => {
  const navLinkClass = ({ isActive }) => {
    const classes = ['nav-bar__link']
    if (isActive) classes.push('nav-bar__link--active')
    return classes.join(' ')
  }

  return (
    <nav className='nav-bar'>
      {LINKS.map((link) => (
        <NavLink key={link.to} className={navLinkClass} to={link.to} end={link.end}>
          <span className='nav-bar__icono'>
            <Icono nombre={link.icono} />
            {link.contador && <ContadorRespuestas />}
          </span>
          <span className='nav-bar__texto'>{link.texto}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default NavBar
