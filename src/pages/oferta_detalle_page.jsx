import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { useApp } from '../context/app_context'
import { RemuneracionDetalle, RemuneracionResumen } from '../features/h2-remuneracion'
import { PreguntasOferta } from '../features/h5-preguntas'
import EmpresaLogo from '../components/empresa_logo'
import Icono from '../components/icono'
import NotFoundPage from './not_found_page'
import { formatoFecha, haceCuanto, textoCierre } from '../utils/formato'

const Lista = ({ titulo, items }) => items.length > 0 && (
  <div className='detalle__bloque'>
    <h2 className='detalle__subtitulo'>{titulo}</h2>
    <ul className='detalle__lista'>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  </div>
)

export const OfertaDetallePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { buscarOferta, buscarPostulacion } = useApp()

  const oferta = buscarOferta(id)
  if (!oferta) return <NotFoundPage />

  const postulacion = buscarPostulacion(oferta.id)
  const mensaje = location.state && location.state.mensaje

  return (
    <div className='detalle'>
      <button className='volver' onClick={() => location.key === 'default' ? navigate('/ofertas') : navigate(-1)}>
        <Icono nombre='volver' tamano={18} />
        Volver
      </button>

      {mensaje && (
        <div className='aviso aviso--exito'>
          <Icono nombre='check' />
          {mensaje}
        </div>
      )}

      <header className='detalle__encabezado'>
        <EmpresaLogo empresa={oferta.empresa} tamano='grande' />
        <div>
          <h1 className='detalle__cargo'>{oferta.cargo}</h1>
          <p className='detalle__empresa'>{oferta.empresa.nombre} · {oferta.empresa.rubro}</p>
          <ul className='detalle__datos'>
            <li><Icono nombre='ubicacion' tamano={16} />{oferta.comuna}, {oferta.region}</li>
            <li><Icono nombre='edificio' tamano={16} />{oferta.modalidad}</li>
            <li><Icono nombre='reloj' tamano={16} />{oferta.jornada}</li>
          </ul>
        </div>
      </header>

      <div className='detalle__columnas'>
        <aside className='detalle__lateral'>
          <div className='tarjeta detalle__postular'>
            <RemuneracionResumen oferta={oferta} />
            <dl className='detalle__ficha'>
              <div><dt>Tipo</dt><dd>Práctica {oferta.tipoPractica.toLowerCase()}</dd></div>
              <div><dt>Duración</dt><dd>{oferta.duracionMeses} {oferta.duracionMeses === 1 ? 'mes' : 'meses'}</dd></div>
              <div><dt>Inicio</dt><dd>{oferta.inicio}</dd></div>
              <div><dt>Vacantes</dt><dd>{oferta.vacantes}</dd></div>
              <div><dt>Cierre</dt><dd>{formatoFecha(oferta.cierre)}</dd></div>
            </dl>
            {postulacion
              ? (
                <Link className='boton boton--exito boton--bloque' to='/postulaciones'>
                  <Icono nombre='check' tamano={18} />
                  Ya postulaste · {postulacion.estado}
                </Link>
                )
              : (
                <Link className='boton boton--bloque' to={`/ofertas/${oferta.id}/postular`}>
                  Postular
                </Link>
                )}
            <p className='detalle__plazo'>{textoCierre(oferta.cierre)} · Publicada {haceCuanto(oferta.publicada).toLowerCase()}</p>
          </div>
        </aside>

        <div className='detalle__principal'>
          <div className='detalle__bloque'>
            <h2 className='detalle__subtitulo'>Sobre la práctica</h2>
            <p>{oferta.descripcion}</p>
          </div>

          <Lista titulo='Qué harás' items={oferta.responsabilidades} />
          <Lista titulo='Requisitos' items={oferta.requisitos} />
          <Lista titulo='Deseable' items={oferta.deseables} />

          <div className='detalle__bloque'>
            <h2 className='detalle__subtitulo'>Tecnologías</h2>
            <ul className='oferta-card__tecnologias'>
              {oferta.tecnologias.map((tecnologia) => <li key={tecnologia} className='etiqueta'>{tecnologia}</li>)}
            </ul>
          </div>

          <RemuneracionDetalle oferta={oferta} />

          <div className='detalle__bloque'>
            <h2 className='detalle__subtitulo'>Sobre {oferta.empresa.nombre}</h2>
            <p>{oferta.empresa.rubro} · {oferta.empresa.tamano}</p>
          </div>

          <PreguntasOferta oferta={oferta} />
        </div>
      </div>
    </div>
  )
}

export default OfertaDetallePage
