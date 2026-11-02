import { Link } from 'react-router-dom'

export const NotFoundPage = () => (
  <div className='vacio'>
    <h1>No encontramos esta página</h1>
    <p>Puede que la oferta ya no esté disponible.</p>
    <Link className='boton' to='/ofertas'>Ver ofertas</Link>
  </div>
)

export default NotFoundPage
