import { createContext, useContext, useEffect, useState } from 'react'

import ofertasIniciales from '../data/ofertas'
import perfil, { postulacionesIniciales } from '../data/perfil'
import { fechaHoyISO } from '../utils/formato'

const AppContext = createContext(null)

// Guarda en localStorage para que los datos sobrevivan a un refresco de página.
export const usePersistente = (clave, valorInicial) => {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = window.localStorage.getItem(clave)
      return guardado ? JSON.parse(guardado) : valorInicial
    } catch (e) {
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor))
    } catch (e) {}
  }, [clave, valor])

  return [valor, setValor]
}

export const AppProvider = ({ children }) => {
  const [ofertasPublicadas, setOfertasPublicadas] = usePersistente('pc-ofertas-publicadas', [])
  const [postulaciones, setPostulaciones] = usePersistente('pc-postulaciones', postulacionesIniciales)

  const ofertas = [...ofertasPublicadas, ...ofertasIniciales]

  const buscarOferta = (id) => ofertas.find((oferta) => oferta.id === id)

  const agregarOferta = (oferta) => {
    setOfertasPublicadas((actuales) => [oferta, ...actuales])
  }

  const buscarPostulacion = (ofertaId) => postulaciones.find((p) => p.ofertaId === ofertaId)

  const postular = (ofertaId, datos) => {
    setPostulaciones((actuales) => [
      { ofertaId, fecha: fechaHoyISO(), estado: 'Enviada', ...datos },
      ...actuales
    ])
  }

  const reiniciarDatos = () => {
    setOfertasPublicadas([])
    setPostulaciones(postulacionesIniciales)
  }

  const valor = {
    perfil,
    ofertas,
    buscarOferta,
    agregarOferta,
    postulaciones,
    buscarPostulacion,
    postular,
    reiniciarDatos
  }

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)

export default AppContext
