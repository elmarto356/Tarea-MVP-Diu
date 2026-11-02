// Logo de empresa con sus iniciales sobre el color de la marca.
export const EmpresaLogo = ({ empresa, tamano = 'normal' }) => {
  // Ignora conectores en minúscula ("del", "de") para que "Banco del Pacífico" sea "BP".
  const palabras = empresa.nombre.split(' ').filter((palabra) => palabra && palabra[0] === palabra[0].toUpperCase())
  const iniciales = (palabras.length ? palabras : [empresa.nombre])
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase()

  return (
    <span
      className={`empresa-logo empresa-logo--${tamano}`}
      style={{ backgroundColor: empresa.color }}
      aria-hidden='true'
    >
      {iniciales}
    </span>
  )
}

export default EmpresaLogo
