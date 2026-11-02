const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

// Fecha de "hoy" fija para que el MVP muestre siempre los mismos plazos.
export const HOY = new Date('2026-11-02T12:00:00')

export const formatoCLP = (monto) => '$' + Math.round(monto).toLocaleString('es-CL')

const aFecha = (iso) => new Date(iso + 'T12:00:00')

export const formatoFecha = (iso) => {
  const fecha = aFecha(iso)
  return `${fecha.getDate()} ${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`
}

export const diasDesde = (iso) => Math.round((HOY - aFecha(iso)) / 86400000)

export const diasHasta = (iso) => Math.round((aFecha(iso) - HOY) / 86400000)

export const haceCuanto = (iso) => {
  const dias = diasDesde(iso)
  if (dias <= 0) return 'Hoy'
  if (dias === 1) return 'Ayer'
  return `Hace ${dias} días`
}

export const textoCierre = (iso) => {
  const dias = diasHasta(iso)
  if (dias < 0) return 'Cerrada'
  if (dias === 0) return 'Cierra hoy'
  if (dias === 1) return 'Cierra mañana'
  return `Cierra en ${dias} días`
}

export const fechaHoyISO = () => HOY.toISOString().slice(0, 10)
