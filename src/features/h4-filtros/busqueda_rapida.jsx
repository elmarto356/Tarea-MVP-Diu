import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Icono from '../../components/icono'

import './filtros.scss'

const SUGERENCIAS = ['React', 'Python', 'Data', 'Remoto']

export const BusquedaRapida = () => {
  const [texto, setTexto] = useState('')
  const navigate = useNavigate()

  const buscar = (evento) => {
    evento.preventDefault()
    const q = texto.trim()
    navigate(q ? `/ofertas?q=${encodeURIComponent(q)}` : '/ofertas')
  }

  return (
    <div className='busqueda-rapida'>
      <form className='busqueda-rapida__form' onSubmit={buscar} role='search'>
        <Icono nombre='buscar' />
        <input
          type='search'
          placeholder='Busca por cargo, empresa o tecnología'
          aria-label='Buscar ofertas'
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button className='boton' type='submit'>Buscar</button>
      </form>
      <p className='busqueda-rapida__sugerencias'>
        Populares:
        {SUGERENCIAS.map((sugerencia) => (
          <button key={sugerencia} type='button' onClick={() => navigate(`/ofertas?q=${encodeURIComponent(sugerencia)}`)}>
            {sugerencia}
          </button>
        ))}
      </p>
    </div>
  )
}

export default BusquedaRapida
