import { useSearchParams } from 'react-router-dom'

import { useApp } from '../../context/app_context'

// Los filtros viven en la URL (?area=Backend&tec=React,SQL) para que se
// mantengan al entrar a una oferta y volver al listado.

export const MODALIDADES = ['Presencial', 'Híbrido', 'Remoto']

export const SUELDOS = [
  { valor: 0, texto: 'Cualquiera' },
  { valor: 1, texto: 'Solo remuneradas' },
  { valor: 400000, texto: 'Desde $400.000' },
  { valor: 500000, texto: 'Desde $500.000' },
  { valor: 600000, texto: 'Desde $600.000' }
]

export const ORDENES = [
  { valor: 'recientes', texto: 'Más recientes' },
  { valor: 'coincidencias', texto: 'Más afines a mis conocimientos' },
  { valor: 'sueldo', texto: 'Mayor remuneración' },
  { valor: 'cierre', texto: 'Cierran antes' }
]

// Minúsculas y sin tildes, para que "practica" encuentre "Práctica".
const normalizar = (texto) => texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

const unicos = (lista) => [...new Set(lista)]

export const useFiltros = (ofertas) => {
  const [params, setParams] = useSearchParams()
  const { perfil } = useApp()

  const leerLista = (clave) => (params.get(clave) ? params.get(clave).split(',') : [])

  const valores = {
    q: params.get('q') || '',
    areas: leerLista('area'),
    modalidades: leerLista('modalidad'),
    tecnologias: leerLista('tec'),
    duraciones: leerLista('duracion').map(Number),
    region: params.get('region') || '',
    sueldoMin: Number(params.get('sueldo') || 0),
    orden: params.get('orden') || 'recientes'
  }

  // Tecnologías ordenadas por cuántas ofertas las piden.
  const frecuencia = {}
  ofertas.forEach((oferta) => oferta.tecnologias.forEach((t) => { frecuencia[t] = (frecuencia[t] || 0) + 1 }))

  const opciones = {
    areas: unicos(ofertas.map((o) => o.area)).sort(),
    tecnologias: Object.keys(frecuencia).sort((a, b) => frecuencia[b] - frecuencia[a] || a.localeCompare(b)),
    regiones: unicos(ofertas.map((o) => o.region)).sort(),
    duraciones: unicos(ofertas.map((o) => o.duracionMeses)).sort((a, b) => a - b)
  }

  const actualizar = (clave, valor) => {
    const nuevos = new URLSearchParams(params)
    const vacio = valor === '' || valor === 0 || (Array.isArray(valor) && valor.length === 0)
    if (vacio) nuevos.delete(clave)
    else nuevos.set(clave, Array.isArray(valor) ? valor.join(',') : valor)
    setParams(nuevos, { replace: true })
  }

  const alternar = (clave, item) => {
    const lista = leerLista(clave)
    const texto = String(item)
    actualizar(clave, lista.includes(texto) ? lista.filter((x) => x !== texto) : [...lista, texto])
  }

  const limpiar = () => setParams({}, { replace: true })

  const misConocimientos = perfil.conocimientos.filter((t) => opciones.tecnologias.includes(t))

  const usarMisConocimientos = () => {
    const nuevos = new URLSearchParams(params)
    nuevos.set('tec', misConocimientos.join(','))
    nuevos.set('orden', 'coincidencias')
    setParams(nuevos, { replace: true })
  }

  const coincidencias = (oferta) => oferta.tecnologias.filter((t) => valores.tecnologias.includes(t)).length

  const busqueda = normalizar(valores.q.trim())

  const ofertasFiltradas = ofertas
    .filter((oferta) => {
      if (busqueda) {
        const texto = normalizar([oferta.cargo, oferta.empresa.nombre, oferta.area, oferta.comuna, oferta.descripcion, ...oferta.tecnologias].join(' '))
        if (!busqueda.split(/\s+/).every((palabra) => texto.includes(palabra))) return false
      }
      if (valores.areas.length && !valores.areas.includes(oferta.area)) return false
      if (valores.modalidades.length && !valores.modalidades.includes(oferta.modalidad)) return false
      if (valores.tecnologias.length && coincidencias(oferta) === 0) return false
      if (valores.duraciones.length && !valores.duraciones.includes(oferta.duracionMeses)) return false
      if (valores.region && oferta.region !== valores.region) return false
      if (valores.sueldoMin && oferta.sueldoBruto < valores.sueldoMin) return false
      return true
    })
    .sort((a, b) => {
      if (valores.orden === 'sueldo') return b.sueldoBruto - a.sueldoBruto
      if (valores.orden === 'cierre') return a.cierre.localeCompare(b.cierre)
      if (valores.orden === 'coincidencias') return coincidencias(b) - coincidencias(a) || b.publicada.localeCompare(a.publicada)
      return b.publicada.localeCompare(a.publicada)
    })

  const cantidadActivos =
    (valores.q ? 1 : 0) +
    valores.areas.length +
    valores.modalidades.length +
    valores.tecnologias.length +
    valores.duraciones.length +
    (valores.region ? 1 : 0) +
    (valores.sueldoMin ? 1 : 0)

  return {
    ofertasFiltradas,
    filtros: {
      valores,
      opciones,
      actualizar,
      alternar,
      limpiar,
      misConocimientos,
      usarMisConocimientos,
      cantidadActivos,
      cantidadResultados: ofertasFiltradas.length
    }
  }
}

export default useFiltros
