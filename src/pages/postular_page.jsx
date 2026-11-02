import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useApp } from '../context/app_context'
import EmpresaLogo from '../components/empresa_logo'
import Icono from '../components/icono'
import NotFoundPage from './not_found_page'

const MINIMO_MOTIVACION = 40

export const PostularPage = () => {
  const { id } = useParams()
  const { perfil, buscarOferta, buscarPostulacion, postular } = useApp()
  const oferta = buscarOferta(id)

  const [form, setForm] = useState({
    nombre: perfil.nombre,
    correo: perfil.correo,
    telefono: '',
    semestre: String(perfil.semestre),
    cv: perfil.cv,
    motivacion: ''
  })
  const [errores, setErrores] = useState({})
  const [enviada, setEnviada] = useState(false)

  if (!oferta) return <NotFoundPage />

  const cambiar = (campo) => (evento) => {
    setForm({ ...form, [campo]: evento.target.value })
    if (errores[campo]) setErrores({ ...errores, [campo]: null })
  }

  const cambiarCV = (evento) => {
    const archivo = evento.target.files[0]
    if (archivo) setForm({ ...form, cv: archivo.name })
  }

  const validar = () => {
    const nuevos = {}
    if (!form.nombre.trim()) nuevos.nombre = 'Ingresa tu nombre.'
    if (!/^\S+@\S+\.\S+$/.test(form.correo)) nuevos.correo = 'Ingresa un correo válido.'
    if (!/^(\+?56)?\s?9\s?\d{4}\s?\d{4}$/.test(form.telefono.trim())) nuevos.telefono = 'Ingresa un celular chileno, por ejemplo +56 9 8765 4321.'
    if (!form.cv) nuevos.cv = 'Adjunta tu CV.'
    if (form.motivacion.trim().length < MINIMO_MOTIVACION) nuevos.motivacion = `Cuéntale a la empresa por qué te interesa (mínimo ${MINIMO_MOTIVACION} caracteres).`
    return nuevos
  }

  const enviar = (evento) => {
    evento.preventDefault()
    const nuevos = validar()
    setErrores(nuevos)
    if (Object.keys(nuevos).length > 0) return
    postular(oferta.id, { cv: form.cv, motivacion: form.motivacion })
    setEnviada(true)
  }

  if (enviada) {
    return (
      <div className='postular-page postular-page--exito'>
        <span className='postular-page__check'><Icono nombre='check' tamano={36} /></span>
        <h1 className='titulo-pagina'>¡Postulación enviada!</h1>
        <p>{oferta.empresa.nombre} recibió tu postulación a <strong>{oferta.cargo}</strong>. Puedes revisar su estado en Mis postulaciones.</p>
        <div className='postular-page__acciones'>
          <Link className='boton' to='/postulaciones'>Ver mis postulaciones</Link>
          <Link className='boton boton--secundario' to='/ofertas'>Seguir buscando</Link>
        </div>
      </div>
    )
  }

  if (buscarPostulacion(oferta.id)) {
    return (
      <div className='postular-page postular-page--exito'>
        <h1 className='titulo-pagina'>Ya postulaste a esta oferta</h1>
        <div className='postular-page__acciones'>
          <Link className='boton' to='/postulaciones'>Ver mis postulaciones</Link>
        </div>
      </div>
    )
  }

  const MensajeError = ({ campo }) => errores[campo] ? <p className='campo__error'>{errores[campo]}</p> : null

  return (
    <div className='postular-page'>
      <Link className='volver' to={`/ofertas/${oferta.id}`}>
        <Icono nombre='volver' tamano={18} />
        Volver a la oferta
      </Link>

      <h1 className='titulo-pagina'>Postular</h1>
      <div className='postular-page__oferta'>
        <EmpresaLogo empresa={oferta.empresa} />
        <div>
          <strong>{oferta.cargo}</strong>
          <p>{oferta.empresa.nombre} · {oferta.comuna}</p>
        </div>
      </div>

      <form className='formulario tarjeta' onSubmit={enviar} noValidate>
        <div className='campo'>
          <label htmlFor='nombre'>Nombre completo</label>
          <input id='nombre' value={form.nombre} onChange={cambiar('nombre')} />
          <MensajeError campo='nombre' />
        </div>
        <div className='formulario__fila'>
          <div className='campo'>
            <label htmlFor='correo'>Correo</label>
            <input id='correo' type='email' value={form.correo} onChange={cambiar('correo')} />
            <MensajeError campo='correo' />
          </div>
          <div className='campo'>
            <label htmlFor='telefono'>Celular</label>
            <input id='telefono' type='tel' placeholder='+56 9 8765 4321' value={form.telefono} onChange={cambiar('telefono')} />
            <MensajeError campo='telefono' />
          </div>
        </div>
        <div className='formulario__fila'>
          <div className='campo'>
            <label htmlFor='carrera'>Carrera</label>
            <input id='carrera' value={perfil.carrera} disabled />
          </div>
          <div className='campo'>
            <label htmlFor='semestre'>Semestre actual</label>
            <select id='semestre' value={form.semestre} onChange={cambiar('semestre')}>
              {[5, 6, 7, 8, 9, 10, 11, 12].map((n) => <option key={n} value={n}>{n}° semestre</option>)}
            </select>
          </div>
        </div>
        <div className='campo'>
          <span className='campo__etiqueta'>Currículum</span>
          <div className='archivo'>
            <Icono nombre='archivo' />
            <span className='archivo__nombre'>{form.cv || 'Ningún archivo seleccionado'}</span>
            <label className='boton boton--secundario boton--chico' htmlFor='cv'>Cambiar</label>
            <input id='cv' type='file' accept='.pdf,.doc,.docx' onChange={cambiarCV} hidden />
          </div>
          <MensajeError campo='cv' />
        </div>
        <div className='campo'>
          <label htmlFor='motivacion'>¿Por qué te interesa esta práctica?</label>
          <textarea
            id='motivacion'
            rows={5}
            placeholder='Ej: Me interesa el área de pagos porque en el ramo de Ingeniería de Software desarrollé una API en Node.js...'
            value={form.motivacion}
            onChange={cambiar('motivacion')}
          />
          <p className='campo__ayuda'>{form.motivacion.trim().length} / {MINIMO_MOTIVACION} caracteres mínimos</p>
          <MensajeError campo='motivacion' />
        </div>
        <button className='boton boton--bloque' type='submit'>Enviar postulación</button>
      </form>
    </div>
  )
}

export default PostularPage
