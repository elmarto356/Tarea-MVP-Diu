import { Link } from 'react-router-dom'

import { useApp } from '../context/app_context'
import { RemuneracionResumen } from '../features/h2-remuneracion'
import { haceCuanto, textoCierre, diasHasta } from '../utils/formato'
import EmpresaLogo from './empresa_logo'
import Icono from './icono'

export const OfertaCard = ({ oferta }) => {
  const { buscarPostulacion } = useApp()
  const postulada = buscarPostulacion(oferta.id)
  const cierraPronto = diasHasta(oferta.cierre) <= 7

  return (
    <Link className='oferta-card' to={`/ofertas/${oferta.id}`}>
      <div className='oferta-card__encabezado'>
        <EmpresaLogo empresa={oferta.empresa} />
        <div className='oferta-card__titulos'>
          <h3 className='oferta-card__cargo'>{oferta.cargo}</h3>
          <p className='oferta-card__empresa'>{oferta.empresa.nombre}</p>
        </div>
      </div>

      <RemuneracionResumen oferta={oferta} />

      <ul className='oferta-card__datos'>
        <li><Icono nombre='ubicacion' tamano={16} />{oferta.comuna} · {oferta.modalidad}</li>
        <li><Icono nombre='calendario' tamano={16} />{oferta.duracionMeses} {oferta.duracionMeses === 1 ? 'mes' : 'meses'} · {oferta.inicio}</li>
      </ul>

      <ul className='oferta-card__tecnologias'>
        {oferta.tecnologias.slice(0, 4).map((tecnologia) => (
          <li key={tecnologia} className='etiqueta'>{tecnologia}</li>
        ))}
        {oferta.tecnologias.length > 4 && <li className='etiqueta etiqueta--suave'>+{oferta.tecnologias.length - 4}</li>}
      </ul>

      <div className='oferta-card__pie'>
        <span>{haceCuanto(oferta.publicada)}</span>
        {postulada
          ? <span className='oferta-card__estado oferta-card__estado--postulada'><Icono nombre='check' tamano={14} />Postulaste</span>
          : <span className={'oferta-card__estado' + (cierraPronto ? ' oferta-card__estado--urgente' : '')}>{textoCierre(oferta.cierre)}</span>}
      </div>
    </Link>
  )
}

export default OfertaCard
