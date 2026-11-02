// Estudiante que usa la app (no hay login en el MVP).
export const perfil = {
  nombre: 'Camila Rojas',
  correo: 'camila.rojas@usm.cl',
  carrera: 'Ingeniería Civil Informática',
  semestre: 9,
  cv: 'CV_Camila_Rojas_2026.pdf',
  conocimientos: ['Python', 'React', 'JavaScript', 'SQL', 'Git', 'Java']
}

// Postulaciones que la estudiante ya tenía antes de usar el MVP.
export const postulacionesIniciales = [
  { ofertaId: 'banco-pacifico-data', fecha: '2026-10-27', estado: 'En revisión' },
  { ofertaId: 'ciberdefensa-sur-seguridad', fecha: '2026-10-24', estado: 'Entrevista agendada' }
]

export default perfil
