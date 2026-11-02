import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useApp, usePersistente } from '../../context/app_context'
import Icono from '../../components/icono'
import { fechaHoyISO } from '../../utils/formato'
import { generarRespuesta } from './respuestas'

import './preguntas.scss'

// Segundos que tarda la empresa en "responder" en la simulación.
const DEMORA_RESPUESTA = 5000

const PREGUNTAS_INICIALES = [
  {
    id: 'mia-1',
    ofertaId: 'banco-pacifico-data',
    pregunta: '¿La práctica se puede extender hasta marzo?',
    fecha: '2026-10-28',
    hora: '18:12',
    respuesta: 'Sí, si tu universidad lo permite podemos extenderla hasta el 15 de marzo. Lo conversamos en la entrevista.',
    estado: 'respondida',
    leida: true,
    publica: true
  }
]

const PreguntasContext = createContext(null)

const horaActual = () => new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })

export const PreguntasProvider = ({ children }) => {
  const { buscarOferta } = useApp()
  const [preguntas, setPreguntas] = usePersistente('pc-preguntas', PREGUNTAS_INICIALES)
  const [aviso, setAviso] = useState(null)
  const programadas = useRef(new Set())

  // Cada pregunta pendiente recibe su respuesta después de unos segundos,
  // aunque el estudiante se haya ido a otra página.
  useEffect(() => {
    preguntas
      .filter((p) => p.estado === 'pendiente' && !programadas.current.has(p.id))
      .forEach((p) => {
        programadas.current.add(p.id)
        setTimeout(() => {
          setPreguntas((actuales) => actuales.map((x) => x.id === p.id ? { ...x, estado: 'respondida', horaRespuesta: horaActual() } : x))
          const oferta = buscarOferta(p.ofertaId)
          if (oferta) setAviso({ ofertaId: oferta.id, texto: `${oferta.empresa.nombre} respondió tu pregunta` })
        }, DEMORA_RESPUESTA)
      })
  }, [preguntas])

  useEffect(() => {
    if (!aviso) return
    const timer = setTimeout(() => setAviso(null), 6000)
    return () => clearTimeout(timer)
  }, [aviso])

  const enviarPregunta = (oferta, texto, publica) => {
    setPreguntas((actuales) => [
      {
        id: 'mia-' + Date.now(),
        ofertaId: oferta.id,
        pregunta: texto,
        fecha: fechaHoyISO(),
        hora: horaActual(),
        respuesta: generarRespuesta(oferta, texto),
        estado: 'pendiente',
        leida: false,
        publica
      },
      ...actuales
    ])
  }

  const marcarLeidas = (ofertaId) => {
    if (!preguntas.some((p) => p.estado === 'respondida' && !p.leida && (!ofertaId || p.ofertaId === ofertaId))) return
    setPreguntas((actuales) => actuales.map((p) =>
      p.estado === 'respondida' && (!ofertaId || p.ofertaId === ofertaId) ? { ...p, leida: true } : p
    ))
  }

  const noLeidas = preguntas.filter((p) => p.estado === 'respondida' && !p.leida).length

  const valor = { preguntas, enviarPregunta, marcarLeidas, noLeidas }

  return (
    <PreguntasContext.Provider value={valor}>
      {children}
      {aviso && (
        <div className='aviso-flotante' role='status'>
          <Icono nombre='chat' />
          <span>{aviso.texto}</span>
          <Link className='aviso-flotante__link' to={`/ofertas/${aviso.ofertaId}#preguntas`} onClick={() => setAviso(null)}>Ver</Link>
          <button className='aviso-flotante__cerrar' onClick={() => setAviso(null)} aria-label='Cerrar aviso'>
            <Icono nombre='cerrar' tamano={16} />
          </button>
        </div>
      )}
    </PreguntasContext.Provider>
  )
}

export const usePreguntas = () => useContext(PreguntasContext)

// Globo rojo con la cantidad de respuestas sin leer.
export const ContadorRespuestas = () => {
  const { noLeidas } = usePreguntas()
  if (!noLeidas) return null
  return <span className='contador-respuestas' aria-label={`${noLeidas} respuestas nuevas`}>{noLeidas}</span>
}

export default PreguntasProvider
