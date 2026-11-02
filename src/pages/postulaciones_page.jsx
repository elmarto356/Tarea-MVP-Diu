import { Link } from 'react-router-dom'

import { useApp } from '../context/app_context'
import EmpresaLogo from '../components/empresa_logo'
import { formatoFecha } from '../utils/formato'

const CLASE_ESTADO = {
  Enviada: 'estado--enviada',
  'En revisión': 'estado--revision',
  'Entrevista agendada': 'estado--entrevista'
}

export const PostulacionesPage = () => {
  const { postulaciones, buscarOferta, reiniciarDatos } = useApp()

  const items = postulaciones
    .map((postulacion) => ({ ...postulacion, oferta: buscarOferta(postulacion.ofertaId) }))
    .filter((item) => item.oferta)

  return (
    <div className='postulaciones-page'>
      <h1 className='titulo-pagina'>Mis postulaciones</h1>

      {items.length === 0 && (
        <div className='vacio'>
          <h2>Aún no postulas a ninguna oferta</h2>
          <Link className='boton' to='/ofertas'>Buscar ofertas</Link>
        </div>
      )}

      <ul className='postulaciones-page__lista'>
        {items.map(({ oferta, fecha, estado }) => (
          <li key={oferta.id}>
            <Link className='postulacion tarjeta' to={`/ofertas/${oferta.id}`}>
              <EmpresaLogo empresa={oferta.empresa} />
              <div className='postulacion__info'>
                <strong>{oferta.cargo}</strong>
                <span>{oferta.empresa.nombre}</span>
                <small>Postulaste el {formatoFecha(fecha)}</small>
              </div>
              <span className={'estado ' + (CLASE_ESTADO[estado] || '')}>{estado}</span>
            </Link>
          </li>
        ))}
      </ul>

      <button className='link postulaciones-page__reiniciar' onClick={reiniciarDatos}>
        Reiniciar datos de demostración
      </button>
    </div>
  )
}

export default PostulacionesPage
