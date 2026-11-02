import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import EmpresaLogo from '../../components/empresa_logo'
import Icono from '../../components/icono'
import { fechaHoyISO, formatoFecha } from '../../utils/formato'
import { usePreguntas } from './preguntas_context'
import { SUGERENCIAS } from './respuestas'

import './preguntas.scss'

const MINIMO = 10

const fechaCorta = (iso, hora) => (iso === fechaHoyISO() ? 'Hoy' : formatoFecha(iso)) + (hora ? `, ${hora}` : '')

const Respuesta = ({ oferta, texto }) => (
  <div className='pregunta__respuesta'>
    <EmpresaLogo empresa={oferta.empresa} />
    <div>
      <p className='pregunta__autor'>{oferta.contacto.nombre} · {oferta.contacto.cargo}</p>
      <p>{texto}</p>
    </div>
  </div>
)

// Preguntas y respuestas dentro del detalle de una oferta.
export const PreguntasOferta = ({ oferta }) => {
  const { preguntas, enviarPregunta, marcarLeidas } = usePreguntas()
  const location = useLocation()
  const seccion = useRef(null)
  const [texto, setTexto] = useState('')
  const [publica, setPublica] = useState(true)
  const [error, setError] = useState('')

  const mias = preguntas.filter((p) => p.ofertaId === oferta.id)

  // Al ver la oferta, las respuestas que llegaron quedan como leídas.
  useEffect(() => { marcarLeidas(oferta.id) }, [preguntas, oferta.id])

  // Si se llega desde un aviso (#preguntas), baja hasta esta sección.
  useEffect(() => {
    if (location.hash === '#preguntas') {
      setTimeout(() => seccion.current && seccion.current.scrollIntoView({ behavior: 'smooth' }), 50)
    }
  }, [location.hash, oferta.id])

  const enviar = (evento) => {
    evento.preventDefault()
    if (texto.trim().length < MINIMO) {
      setError(`Escribe tu pregunta (mínimo ${MINIMO} caracteres).`)
      return
    }
    enviarPregunta(oferta, texto.trim(), publica)
    setTexto('')
    setError('')
  }

  const total = mias.length + oferta.preguntas.length

  return (
    <section className='preguntas' id='preguntas' ref={seccion}>
      <div className='preguntas__encabezado'>
        <h2 className='detalle__subtitulo'>Preguntas a {oferta.empresa.nombre}</h2>
        <p className='preguntas__bajada'>
          Responde {oferta.contacto.nombre}, {oferta.contacto.cargo}. Suele responder en menos de 1 día.
        </p>
      </div>

      <form className='preguntas__form' onSubmit={enviar}>
        <div className='preguntas__sugerencias'>
          {SUGERENCIAS.map((sugerencia) => (
            <button key={sugerencia} type='button' className='chip' onClick={() => { setTexto(sugerencia); setError('') }}>
              {sugerencia}
            </button>
          ))}
        </div>
        <label className='sr-only' htmlFor='nueva-pregunta'>Tu pregunta</label>
        <textarea
          id='nueva-pregunta'
          rows={3}
          placeholder='Escribe tu pregunta sobre el proyecto, el horario, el equipo...'
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        {error && <p className='campo__error'>{error}</p>}
        <div className='preguntas__acciones'>
          <label className='preguntas__publica'>
            <input type='checkbox' checked={publica} onChange={(e) => setPublica(e.target.checked)} />
            Mostrar a otros estudiantes (sin mi nombre)
          </label>
          <button className='boton' type='submit'>
            <Icono nombre='enviado' tamano={18} />
            Enviar pregunta
          </button>
        </div>
      </form>

      {total === 0 && <p className='preguntas__vacio'>Aún no hay preguntas sobre esta oferta. ¡Haz la primera!</p>}

      <ul className='preguntas__lista'>
        {mias.map((p) => (
          <li key={p.id} className='pregunta pregunta--mia'>
            <p className='pregunta__autor'>
              Tu pregunta · {fechaCorta(p.fecha, p.hora)}
              {!p.publica && <span className='pregunta__privada'>Privada</span>}
            </p>
            <p className='pregunta__texto'>{p.pregunta}</p>
            {p.estado === 'respondida'
              ? <Respuesta oferta={oferta} texto={p.respuesta} />
              : (
                <p className='pregunta__escribiendo'>
                  <span className='puntos'><i /><i /><i /></span>
                  {oferta.contacto.nombre} está escribiendo una respuesta
                </p>
                )}
          </li>
        ))}
        {oferta.preguntas.map((p) => (
          <li key={p.id} className='pregunta'>
            <p className='pregunta__autor'>{p.autor} · {formatoFecha(p.fecha)}</p>
            <p className='pregunta__texto'>{p.pregunta}</p>
            <Respuesta oferta={oferta} texto={p.respuesta} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default PreguntasOferta
