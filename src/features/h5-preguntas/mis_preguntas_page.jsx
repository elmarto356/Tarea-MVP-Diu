import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useApp } from '../../context/app_context'
import EmpresaLogo from '../../components/empresa_logo'
import { formatoFecha } from '../../utils/formato'
import { usePreguntas } from './preguntas_context'

import './preguntas.scss'

export const MisPreguntasPage = () => {
  const { buscarOferta } = useApp()
  const { preguntas, marcarLeidas } = usePreguntas()

  // Guarda cuáles no se habían leído antes de marcarlas, para destacarlas.
  const [nuevas] = useState(() => preguntas.filter((p) => p.estado === 'respondida' && !p.leida).map((p) => p.id))

  useEffect(() => { marcarLeidas() }, [preguntas])

  const items = preguntas
    .map((p) => ({ ...p, oferta: buscarOferta(p.ofertaId) }))
    .filter((p) => p.oferta)

  const pendientes = items.filter((p) => p.estado === 'pendiente').length

  return (
    <div className='mis-preguntas'>
      <h1 className='titulo-pagina'>Mis preguntas</h1>
      <p className='mis-preguntas__bajada'>
        {items.length === 0
          ? 'Pregunta directamente a las empresas desde el detalle de cada oferta.'
          : `${items.length} ${items.length === 1 ? 'pregunta' : 'preguntas'} · ${pendientes} ${pendientes === 1 ? 'esperando respuesta' : 'esperando respuesta'}`}
      </p>

      {items.length === 0 && (
        <div className='vacio'>
          <h2>Aún no has hecho preguntas</h2>
          <Link className='boton' to='/ofertas'>Ver ofertas</Link>
        </div>
      )}

      <ul className='mis-preguntas__lista'>
        {items.map((p) => (
          <li key={p.id} className={'tarjeta mis-preguntas__item' + (nuevas.includes(p.id) ? ' mis-preguntas__item--nueva' : '')}>
            <Link className='mis-preguntas__oferta' to={`/ofertas/${p.oferta.id}#preguntas`}>
              <EmpresaLogo empresa={p.oferta.empresa} />
              <span className='mis-preguntas__textos'>
                <strong>{p.oferta.empresa.nombre}</strong>
                <small>{p.oferta.cargo}</small>
              </span>
              <span className={'estado ' + (p.estado === 'respondida' ? 'estado--entrevista' : 'estado--revision')}>
                {p.estado === 'respondida' ? (nuevas.includes(p.id) ? 'Nueva respuesta' : 'Respondida') : 'Esperando respuesta'}
              </span>
            </Link>
            <p className='mis-preguntas__pregunta'>{p.pregunta}</p>
            <p className='mis-preguntas__fecha'>Enviada el {formatoFecha(p.fecha)}{p.hora && `, ${p.hora}`}</p>
            {p.estado === 'respondida' && (
              <div className='mis-preguntas__respuesta'>
                <p className='pregunta__autor'>{p.oferta.contacto.nombre} · {p.oferta.contacto.cargo}</p>
                <p>{p.respuesta}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MisPreguntasPage
