import { Link } from 'react-router-dom'

import { useApp } from '../context/app_context'
import { BusquedaRapida } from '../features/h4-filtros'
import OfertaCard from '../components/oferta_card'
import Icono from '../components/icono'

const AREAS = ['Backend', 'Frontend', 'Data', 'Full Stack', 'DevOps', 'Ciberseguridad', 'Móvil', 'QA']

export const HomePage = () => {
  const { perfil, ofertas, postulaciones } = useApp()

  const recientes = [...ofertas]
    .sort((a, b) => b.publicada.localeCompare(a.publicada))
    .slice(0, 3)
  const empresas = new Set(ofertas.map((oferta) => oferta.empresa.nombre)).size

  return (
    <div className='home-page'>
      <section className='home-page__hero'>
        <p className='home-page__saludo'>Hola, {perfil.nombre.split(' ')[0]}</p>
        <h1 className='home-page__titulo'>Encuentra tu práctica en informática</h1>
        <p className='home-page__bajada'>
          {ofertas.length} ofertas activas de {empresas} empresas para la temporada de verano 2027.
        </p>
        <BusquedaRapida />
      </section>

      <section className='home-page__seccion'>
        <h2 className='home-page__subtitulo'>Explora por área</h2>
        <ul className='home-page__areas'>
          {AREAS.map((area) => (
            <li key={area}>
              <Link className='chip' to={`/ofertas?area=${encodeURIComponent(area)}`}>{area}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className='home-page__seccion'>
        <div className='home-page__encabezado'>
          <h2 className='home-page__subtitulo'>Publicadas recientemente</h2>
          <Link className='link' to='/ofertas'>Ver todas</Link>
        </div>
        <div className='grilla-ofertas'>
          {recientes.map((oferta) => <OfertaCard key={oferta.id} oferta={oferta} />)}
        </div>
      </section>

      <section className='home-page__accesos'>
        <Link className='acceso' to='/postulaciones'>
          <Icono nombre='enviado' tamano={24} />
          <span>
            <strong>Mis postulaciones</strong>
            <small>{postulaciones.length} {postulaciones.length === 1 ? 'postulación' : 'postulaciones'} en curso</small>
          </span>
          <Icono nombre='derecha' />
        </Link>
        <Link className='acceso' to='/publicar'>
          <Icono nombre='edificio' tamano={24} />
          <span>
            <strong>¿Eres empresa?</strong>
            <small>Publica una oferta de práctica</small>
          </span>
          <Icono nombre='derecha' />
        </Link>
      </section>
    </div>
  )
}

export default HomePage
