import Icono from '../../components/icono'
import { formatoCLP } from '../../utils/formato'

import './remuneracion.scss'

// Sueldo visible en la tarjeta del listado y en la ficha del detalle.
export const RemuneracionResumen = ({ oferta }) => {
  if (oferta.sueldoBruto <= 0) {
    return (
      <div className='remuneracion-resumen remuneracion-resumen--sin-sueldo'>
        <Icono nombre='dinero' tamano={18} />
        <strong>No remunerada</strong>
      </div>
    )
  }

  return (
    <div className='remuneracion-resumen'>
      <Icono nombre='dinero' tamano={18} />
      <strong>{formatoCLP(oferta.sueldoBruto)}</strong>
      <small>bruto mensual</small>
    </div>
  )
}

export default RemuneracionResumen
