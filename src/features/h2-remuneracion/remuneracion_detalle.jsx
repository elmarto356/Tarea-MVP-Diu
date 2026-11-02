import { formatoCLP } from '../../utils/formato'

import './remuneracion.scss'

// Sueldo bruto mensual en el detalle de la oferta.
export const RemuneracionDetalle = ({ oferta }) => (
  <section className='remuneracion' id='remuneracion'>
    <h2 className='detalle__subtitulo'>Remuneración</h2>
    {oferta.sueldoBruto > 0
      ? <p className='remuneracion__monto'>{formatoCLP(oferta.sueldoBruto)}<span> bruto mensual</span></p>
      : <p className='remuneracion__monto remuneracion__monto--sin-sueldo'>No remunerada</p>}
  </section>
)

export default RemuneracionDetalle
