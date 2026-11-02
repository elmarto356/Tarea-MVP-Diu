import { useState } from 'react'

import Icono from '../../components/icono'
import { MODALIDADES, ORDENES, SUELDOS } from './use_filtros'

import './filtros.scss'

const TECNOLOGIAS_VISIBLES = 10

const Chips = ({ items, seleccionados, onClick, texto = (item) => item }) => (
  <div className='filtros__chips'>
    {items.map((item) => {
      const activo = seleccionados.includes(item)
      return (
        <button
          key={item}
          type='button'
          className={'chip' + (activo ? ' chip--activo' : '')}
          aria-pressed={activo}
          onClick={() => onClick(item)}
        >
          {activo && <Icono nombre='check' tamano={14} />}
          {texto(item)}
        </button>
      )
    })}
  </div>
)

const Grupo = ({ titulo, children }) => (
  <fieldset className='filtros__grupo'>
    <legend className='filtros__titulo'>{titulo}</legend>
    {children}
  </fieldset>
)

export const PanelFiltros = ({ filtros }) => {
  const [abierto, setAbierto] = useState(false)
  const [todasTecnologias, setTodasTecnologias] = useState(false)

  if (!filtros) return null

  const { valores, opciones, actualizar, alternar, limpiar, misConocimientos, usarMisConocimientos, cantidadActivos, cantidadResultados } = filtros

  // Siempre se muestran las tecnologías seleccionadas, aunque estén fuera de las primeras.
  const tecnologias = todasTecnologias
    ? opciones.tecnologias
    : opciones.tecnologias.filter((t, i) => i < TECNOLOGIAS_VISIBLES || valores.tecnologias.includes(t))

  const usandoMisConocimientos =
    misConocimientos.length > 0 &&
    misConocimientos.every((t) => valores.tecnologias.includes(t)) &&
    valores.tecnologias.length === misConocimientos.length

  const textoDuracion = (meses) => `${meses} ${meses === 1 ? 'mes' : 'meses'}`

  // Resumen de filtros activos que se puede quitar de a uno.
  const activos = [
    ...valores.areas.map((v) => ({ texto: v, quitar: () => alternar('area', v) })),
    ...valores.modalidades.map((v) => ({ texto: v, quitar: () => alternar('modalidad', v) })),
    ...valores.tecnologias.map((v) => ({ texto: v, quitar: () => alternar('tec', v) })),
    ...valores.duraciones.map((v) => ({ texto: textoDuracion(v), quitar: () => alternar('duracion', v) })),
    ...(valores.region ? [{ texto: valores.region, quitar: () => actualizar('region', '') }] : []),
    ...(valores.sueldoMin ? [{ texto: SUELDOS.find((s) => s.valor === valores.sueldoMin)?.texto || 'Sueldo', quitar: () => actualizar('sueldo', 0) }] : [])
  ]

  return (
    <aside className='filtros'>
      <div className='filtros__barra'>
        <label className='filtros__busqueda'>
          <Icono nombre='buscar' tamano={18} />
          <input
            type='search'
            placeholder='Cargo, empresa o tecnología'
            aria-label='Buscar ofertas'
            value={valores.q}
            onChange={(e) => actualizar('q', e.target.value)}
          />
        </label>
        <button type='button' className='filtros__abrir boton boton--secundario' onClick={() => setAbierto(true)}>
          <Icono nombre='filtro' tamano={18} />
          Filtros{cantidadActivos > 0 && ` (${cantidadActivos})`}
        </button>
      </div>

      {activos.length > 0 && (
        <ul className='filtros__activos'>
          {activos.map((filtro) => (
            <li key={filtro.texto}>
              <button type='button' className='filtros__activo' onClick={filtro.quitar} aria-label={`Quitar filtro ${filtro.texto}`}>
                {filtro.texto}
                <Icono nombre='cerrar' tamano={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={'filtros__fondo' + (abierto ? ' filtros__fondo--visible' : '')} onClick={() => setAbierto(false)} />

      <div className={'filtros__panel' + (abierto ? ' filtros__panel--abierto' : '')}>
        <div className='filtros__cabecera'>
          <h2>Filtros</h2>
          {cantidadActivos > 0 && <button type='button' className='link' onClick={limpiar}>Limpiar todo</button>}
          <button type='button' className='filtros__cerrar' onClick={() => setAbierto(false)} aria-label='Cerrar filtros'>
            <Icono nombre='cerrar' />
          </button>
        </div>

        <div className='filtros__contenido'>
          <div className='filtros__conocimientos'>
            <p>
              <strong>¿Qué sabes hacer?</strong>
              Muestra primero las ofertas que piden tus conocimientos: {misConocimientos.join(', ')}.
            </p>
            <button
              type='button'
              className={'boton boton--chico' + (usandoMisConocimientos ? ' boton--exito' : '')}
              onClick={usandoMisConocimientos ? () => actualizar('tec', []) : usarMisConocimientos}
            >
              {usandoMisConocimientos ? <><Icono nombre='check' tamano={16} />Usando mis conocimientos</> : 'Usar mis conocimientos'}
            </button>
          </div>

          <Grupo titulo='Ordenar por'>
            <select className='filtros__select' value={valores.orden} onChange={(e) => actualizar('orden', e.target.value === 'recientes' ? '' : e.target.value)}>
              {ORDENES.map((orden) => <option key={orden.valor} value={orden.valor}>{orden.texto}</option>)}
            </select>
          </Grupo>

          <Grupo titulo='Área'>
            <Chips items={opciones.areas} seleccionados={valores.areas} onClick={(v) => alternar('area', v)} />
          </Grupo>

          <Grupo titulo='Tecnologías'>
            <Chips items={tecnologias} seleccionados={valores.tecnologias} onClick={(v) => alternar('tec', v)} />
            {opciones.tecnologias.length > TECNOLOGIAS_VISIBLES && (
              <button type='button' className='link filtros__mas' onClick={() => setTodasTecnologias(!todasTecnologias)}>
                {todasTecnologias ? 'Ver menos' : `Ver todas (${opciones.tecnologias.length})`}
              </button>
            )}
          </Grupo>

          <Grupo titulo='Modalidad'>
            <Chips items={MODALIDADES} seleccionados={valores.modalidades} onClick={(v) => alternar('modalidad', v)} />
          </Grupo>

          <Grupo titulo='Remuneración'>
            <select className='filtros__select' value={valores.sueldoMin} onChange={(e) => actualizar('sueldo', Number(e.target.value))}>
              {SUELDOS.map((sueldo) => <option key={sueldo.valor} value={sueldo.valor}>{sueldo.texto}</option>)}
            </select>
          </Grupo>

          <Grupo titulo='Región'>
            <select className='filtros__select' value={valores.region} onChange={(e) => actualizar('region', e.target.value)}>
              <option value=''>Todas las regiones</option>
              {opciones.regiones.map((region) => <option key={region} value={region}>{region}</option>)}
            </select>
          </Grupo>

          <Grupo titulo='Duración'>
            <Chips items={opciones.duraciones} seleccionados={valores.duraciones} onClick={(v) => alternar('duracion', v)} texto={textoDuracion} />
          </Grupo>
        </div>

        <div className='filtros__pie'>
          <button type='button' className='boton boton--bloque' onClick={() => setAbierto(false)}>
            Ver {cantidadResultados} {cantidadResultados === 1 ? 'oferta' : 'ofertas'}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default PanelFiltros
