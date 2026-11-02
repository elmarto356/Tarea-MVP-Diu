import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useApp } from '../../context/app_context'
import Icono from '../../components/icono'
import { fechaHoyISO, formatoCLP } from '../../utils/formato'
import RemuneracionResumen from './remuneracion_resumen'

import './remuneracion.scss'

const AREAS = ['Backend', 'Frontend', 'Full Stack', 'Data', 'DevOps', 'Ciberseguridad', 'Móvil', 'QA', 'Infraestructura TI']
const REGIONES = ['Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'Metropolitana', "O'Higgins", 'Maule', 'Ñuble', 'Biobío', 'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes']
const INICIOS = ['Diciembre 2026', 'Enero 2027', 'Febrero 2027', 'Marzo 2027']
const COLORES = ['#1f4fd1', '#0b7a75', '#7b3fe4', '#c0263f', '#d97706', '#12a150']

const FORM_INICIAL = {
  empresa: '',
  rubro: '',
  cargo: '',
  area: '',
  modalidad: '',
  comuna: '',
  region: 'Metropolitana',
  tecnologias: '',
  duracionMeses: '2',
  inicio: 'Enero 2027',
  cierre: '',
  vacantes: '1',
  descripcion: '',
  requisitos: '',
  remunerada: '',
  monto: ''
}

const crearId = (texto) => texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36)

const lineas = (texto) => texto.split('\n').map((l) => l.trim()).filter(Boolean)

// Arma la oferta con la misma forma que los datos de src/data/ofertas.js.
const construirOferta = (form, id = 'vista-previa') => ({
  id,
  cargo: form.cargo || 'Cargo de la práctica',
  empresa: { nombre: form.empresa || 'Tu empresa', rubro: form.rubro || 'Rubro', tamano: '', color: COLORES[form.empresa.length % COLORES.length] },
  contacto: { nombre: 'Equipo de reclutamiento', cargo: form.empresa },
  comuna: form.comuna || 'Comuna',
  region: form.region,
  modalidad: form.modalidad || 'Modalidad',
  area: form.area,
  tipoPractica: 'Profesional',
  tecnologias: form.tecnologias.split(',').map((t) => t.trim()).filter(Boolean),
  duracionMeses: Number(form.duracionMeses),
  jornada: 'Completa · 44 h semanales',
  inicio: form.inicio,
  publicada: fechaHoyISO(),
  cierre: form.cierre || fechaHoyISO(),
  vacantes: Number(form.vacantes) || 1,
  descripcion: form.descripcion,
  responsabilidades: [],
  requisitos: lineas(form.requisitos),
  deseables: [],
  sueldoBruto: form.remunerada === 'si' ? Number(form.monto) || 0 : 0,
  preguntas: []
})

export const PublicarOfertaPage = () => {
  const { agregarOferta } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState(FORM_INICIAL)
  const [errores, setErrores] = useState({})

  const cambiar = (campo) => (evento) => {
    setForm({ ...form, [campo]: evento.target.value })
    if (errores[campo]) setErrores({ ...errores, [campo]: null })
  }

  const validar = () => {
    const nuevos = {}
    if (!form.empresa.trim()) nuevos.empresa = 'Ingresa el nombre de la empresa.'
    if (!form.cargo.trim()) nuevos.cargo = 'Ingresa el nombre del cargo.'
    if (!form.area) nuevos.area = 'Elige un área.'
    if (!form.modalidad) nuevos.modalidad = 'Elige una modalidad.'
    if (!form.comuna.trim()) nuevos.comuna = 'Ingresa la comuna.'
    if (!form.tecnologias.trim()) nuevos.tecnologias = 'Ingresa al menos una tecnología.'
    if (!form.cierre) nuevos.cierre = 'Indica hasta cuándo se puede postular.'
    else if (form.cierre <= fechaHoyISO()) nuevos.cierre = 'La fecha de cierre debe ser posterior a hoy.'
    if (form.descripcion.trim().length < 30) nuevos.descripcion = 'Describe la práctica en al menos 30 caracteres.'
    if (!form.remunerada) nuevos.remunerada = 'Indica si la práctica es remunerada. Este dato es obligatorio.'
    if (form.remunerada === 'si') {
      const monto = Number(form.monto)
      if (!form.monto || monto <= 0) nuevos.monto = 'Ingresa el sueldo bruto mensual en pesos.'
      else if (monto < 50000) nuevos.monto = 'El monto parece muy bajo. Revisa que sea el sueldo mensual en pesos.'
    }
    return nuevos
  }

  const publicar = (evento) => {
    evento.preventDefault()
    const nuevos = validar()
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) {
      const primero = document.getElementById(Object.keys(nuevos)[0])
      if (primero) primero.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const oferta = construirOferta(form, crearId(form.cargo))
    agregarOferta(oferta)
    navigate(`/ofertas/${oferta.id}`, { state: { mensaje: 'Tu oferta fue publicada. Así la verán los estudiantes.' } })
  }

  const MensajeError = ({ campo }) => errores[campo] ? <p className='campo__error'>{errores[campo]}</p> : null

  const vistaPrevia = construirOferta(form)

  return (
    <div className='publicar'>
      <h1 className='titulo-pagina'>Publicar oferta de práctica</h1>
      <p className='publicar__bajada'>Las ofertas con sueldo visible reciben más postulaciones: los estudiantes lo revisan antes de decidir.</p>

      <div className='publicar__columnas'>
        <form className='formulario tarjeta publicar__form' onSubmit={publicar} noValidate>
          <h2 className='formulario__seccion'>Empresa</h2>
          <div className='formulario__fila'>
            <div className='campo'>
              <label htmlFor='empresa'>Nombre de la empresa</label>
              <input id='empresa' value={form.empresa} onChange={cambiar('empresa')} placeholder='Ej: Andes Pay' />
              <MensajeError campo='empresa' />
            </div>
            <div className='campo'>
              <label htmlFor='rubro'>Rubro <small>(opcional)</small></label>
              <input id='rubro' value={form.rubro} onChange={cambiar('rubro')} placeholder='Ej: Fintech' />
            </div>
          </div>

          <h2 className='formulario__seccion'>Práctica</h2>
          <div className='campo'>
            <label htmlFor='cargo'>Cargo</label>
            <input id='cargo' value={form.cargo} onChange={cambiar('cargo')} placeholder='Ej: Práctica Desarrollo Backend' />
            <MensajeError campo='cargo' />
          </div>
          <div className='formulario__fila'>
            <div className='campo'>
              <label htmlFor='area'>Área</label>
              <select id='area' value={form.area} onChange={cambiar('area')}>
                <option value=''>Selecciona</option>
                {AREAS.map((a) => <option key={a}>{a}</option>)}
              </select>
              <MensajeError campo='area' />
            </div>
            <div className='campo'>
              <label htmlFor='modalidad'>Modalidad</label>
              <select id='modalidad' value={form.modalidad} onChange={cambiar('modalidad')}>
                <option value=''>Selecciona</option>
                <option>Presencial</option>
                <option>Híbrido</option>
                <option>Remoto</option>
              </select>
              <MensajeError campo='modalidad' />
            </div>
          </div>
          <div className='formulario__fila'>
            <div className='campo'>
              <label htmlFor='comuna'>Comuna</label>
              <input id='comuna' value={form.comuna} onChange={cambiar('comuna')} placeholder='Ej: Providencia' />
              <MensajeError campo='comuna' />
            </div>
            <div className='campo'>
              <label htmlFor='region'>Región</label>
              <select id='region' value={form.region} onChange={cambiar('region')}>
                {REGIONES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className='campo'>
            <label htmlFor='tecnologias'>Tecnologías</label>
            <input id='tecnologias' value={form.tecnologias} onChange={cambiar('tecnologias')} placeholder='Separadas por coma. Ej: Python, SQL, Git' />
            <MensajeError campo='tecnologias' />
          </div>
          <div className='formulario__fila'>
            <div className='campo'>
              <label htmlFor='duracionMeses'>Duración</label>
              <select id='duracionMeses' value={form.duracionMeses} onChange={cambiar('duracionMeses')}>
                {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'mes' : 'meses'}</option>)}
              </select>
            </div>
            <div className='campo'>
              <label htmlFor='inicio'>Inicio</label>
              <select id='inicio' value={form.inicio} onChange={cambiar('inicio')}>
                {INICIOS.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <div className='formulario__fila'>
            <div className='campo'>
              <label htmlFor='cierre'>Cierre de postulaciones</label>
              <input id='cierre' type='date' value={form.cierre} onChange={cambiar('cierre')} />
              <MensajeError campo='cierre' />
            </div>
            <div className='campo'>
              <label htmlFor='vacantes'>Vacantes</label>
              <input id='vacantes' type='number' min='1' value={form.vacantes} onChange={cambiar('vacantes')} />
            </div>
          </div>
          <div className='campo'>
            <label htmlFor='descripcion'>Descripción</label>
            <textarea id='descripcion' rows={4} value={form.descripcion} onChange={cambiar('descripcion')} placeholder='¿En qué equipo y proyecto trabajará el practicante?' />
            <MensajeError campo='descripcion' />
          </div>
          <div className='campo'>
            <label htmlFor='requisitos'>Requisitos <small>(uno por línea, opcional)</small></label>
            <textarea id='requisitos' rows={3} value={form.requisitos} onChange={cambiar('requisitos')} placeholder={'Estudiante desde 8° semestre\nConocimientos de SQL'} />
          </div>

          <fieldset className={'publicar__remuneracion' + (errores.remunerada || errores.monto ? ' publicar__remuneracion--error' : '')}>
            <legend className='formulario__seccion'>
              Remuneración <span className='publicar__obligatorio'>Obligatorio</span>
            </legend>
            <p className='campo__ayuda'>Este dato se muestra en cada publicación para que los estudiantes lo vean antes de postular.</p>

            <div className='publicar__opciones' id='remunerada'>
              <label className={'publicar__opcion' + (form.remunerada === 'si' ? ' publicar__opcion--activa' : '')}>
                <input type='radio' name='remunerada' value='si' checked={form.remunerada === 'si'} onChange={cambiar('remunerada')} />
                Remunerada
              </label>
              <label className={'publicar__opcion' + (form.remunerada === 'no' ? ' publicar__opcion--activa' : '')}>
                <input type='radio' name='remunerada' value='no' checked={form.remunerada === 'no'} onChange={cambiar('remunerada')} />
                No remunerada
              </label>
            </div>
            <MensajeError campo='remunerada' />

            {form.remunerada === 'si' && (
              <div className='campo'>
                <label htmlFor='monto'>Sueldo bruto mensual (CLP)</label>
                <input id='monto' type='number' inputMode='numeric' min='0' step='10000' value={form.monto} onChange={cambiar('monto')} placeholder='Ej: 500000' />
                {form.monto > 0 && <p className='campo__ayuda'>{formatoCLP(form.monto)} bruto al mes</p>}
                <MensajeError campo='monto' />
              </div>
            )}
          </fieldset>

          <button className='boton boton--bloque' type='submit'>
            <Icono nombre='check' tamano={18} />
            Publicar oferta
          </button>
        </form>

        <aside className='publicar__vista-previa'>
          <p className='publicar__vista-previa-titulo'>Así verán tu oferta los estudiantes</p>
          <div className='oferta-card publicar__tarjeta' aria-hidden='true'>
            <div className='oferta-card__encabezado'>
              <span className='empresa-logo' style={{ backgroundColor: vistaPrevia.empresa.color }}>
                {vistaPrevia.empresa.nombre.charAt(0).toUpperCase()}
              </span>
              <div>
                <h3 className='oferta-card__cargo'>{vistaPrevia.cargo}</h3>
                <p className='oferta-card__empresa'>{vistaPrevia.empresa.nombre}</p>
              </div>
            </div>
            {form.remunerada
              ? <RemuneracionResumen oferta={vistaPrevia} />
              : <div className='remuneracion-resumen remuneracion-resumen--pendiente'><Icono nombre='dinero' tamano={18} /><span><strong>Remuneración pendiente</strong><small>Completa este dato para publicar</small></span></div>}
            <ul className='oferta-card__datos'>
              <li><Icono nombre='ubicacion' tamano={16} />{vistaPrevia.comuna} · {vistaPrevia.modalidad}</li>
              <li><Icono nombre='calendario' tamano={16} />{vistaPrevia.duracionMeses} {vistaPrevia.duracionMeses === 1 ? 'mes' : 'meses'} · {vistaPrevia.inicio}</li>
            </ul>
            {vistaPrevia.tecnologias.length > 0 && (
              <ul className='oferta-card__tecnologias'>
                {vistaPrevia.tecnologias.slice(0, 4).map((t) => <li key={t} className='etiqueta'>{t}</li>)}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default PublicarOfertaPage
