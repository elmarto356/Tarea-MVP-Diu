import { Link } from 'react-router-dom'

import Icono from './icono'

// Página provisoria para funcionalidades que aún no se integran.
export const EnDesarrollo = ({ titulo }) => (
  <div className='en-desarrollo'>
    <Icono nombre='info' tamano={36} />
    <h1 className='en-desarrollo__titulo'>{titulo}</h1>
    <p>Esta funcionalidad está en desarrollo.</p>
    <Link className='boton boton--secundario' to='/ofertas'>Ver ofertas</Link>
  </div>
)

export default EnDesarrollo
