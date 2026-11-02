import { formatoCLP, formatoFecha } from '../../utils/formato'

// Simula la respuesta de la empresa usando los datos reales de la oferta.
// Se revisan las reglas en orden y se usa la primera que calce con la pregunta.
const REGLAS = [
  {
    patron: /contrat|quedar|despu[eé]s de la pr[aá]ctica|futuro|extender/,
    responder: (o) => `Sí, buscamos que los practicantes puedan quedarse. Al terminar la práctica evaluamos el desempeño y, si hay una vacante en el equipo de ${o.area}, te ofrecemos continuar part-time mientras terminas la carrera.`
  },
  {
    patron: /sueldo|pago|remunera|plata|dinero|bono|honorario/,
    responder: (o) => o.sueldoBruto > 0
      ? `El sueldo es de ${formatoCLP(o.sueldoBruto)} bruto mensual, pagado a fin de mes.`
      : 'Esta práctica no es remunerada.'
  },
  {
    patron: /remoto|presencial|h[ií]brid|oficina|casa|ir a|d[ií]as|desde|regi[oó]n|ciudad|vivo/,
    responder: (o) => ({
      Híbrido: `La modalidad es híbrida: vas 2 días a la semana a nuestra oficina en ${o.comuna} y el resto trabajas desde tu casa. Los días presenciales se coordinan con tu equipo.`,
      Remoto: 'Es 100% remoto. Te enviamos un notebook antes de empezar y tenemos una reunión diaria por videollamada a las 9:30.',
      Presencial: `Es presencial en nuestras instalaciones de ${o.comuna}. El primer día te acompaña tu tutor para presentarte al equipo.`
    })[o.modalidad] || `La modalidad es ${o.modalidad.toLowerCase()} en ${o.comuna}.`
  },
  {
    patron: /horario|jornada|hora|turno/,
    responder: (o) => o.jornada.includes('7x7')
      ? 'Trabajamos en turno 7x7: siete días en faena con jornada de 8:00 a 20:00 y siete días de descanso. Los traslados desde Antofagasta los coordina la empresa.'
      : `Es jornada ${o.jornada.split(' · ')[0].toLowerCase()} de ${o.jornada.split(' · ')[1]}, normalmente de 9:00 a 18:00 con una hora de almuerzo. Hay flexibilidad para entrar entre 8:30 y 9:30.`
  },
  {
    patron: /tecnolog|stack|lenguaje|framework|saber|conocimiento|requisito|necesito|experiencia/,
    responder: (o) => `En el día a día usamos ${o.tecnologias.join(', ')}. No necesitas dominarlas todas: lo más importante es que cumplas con esto: "${(o.requisitos[1] || o.requisitos[0] || 'ganas de aprender').replace(/\.$/, '')}". Las primeras dos semanas son de inducción.`
  },
  {
    patron: /proyecto|equipo|hacer|tarea|funci|trabaj|rol/,
    responder: (o) => `${o.descripcion.split('. ')[0]}. Tu primera tarea sería ${o.responsabilidades[0] ? o.responsabilidades[0].charAt(0).toLowerCase() + o.responsabilidades[0].slice(1) : 'conocer el sistema junto a tu tutor.'}`
  },
  {
    patron: /semestre|pr[aá]ctica (1|i|inicial|profesional)|convenio|universidad|carta|seguro/,
    responder: (o) => `Esta vacante es para práctica ${o.tipoPractica.toLowerCase()}. Firmamos el convenio de práctica con tu universidad y completamos la evaluación final que te pidan.`
  }
]

export const generarRespuesta = (oferta, pregunta) => {
  const texto = pregunta.toLowerCase()
  const regla = REGLAS.find((r) => r.patron.test(texto))
  if (regla) return regla.responder(oferta)
  return `¡Gracias por tu pregunta! La revisaré con el equipo de ${oferta.area} y te escribiremos por este mismo canal antes del cierre de postulaciones (${formatoFecha(oferta.cierre)}).`
}

export const SUGERENCIAS = [
  '¿En qué proyecto trabajaría?',
  '¿Cuál es el horario?',
  '¿Cuántos días hay que ir a la oficina?',
  '¿Qué tecnologías debo saber?',
  '¿Hay posibilidad de quedar contratado?'
]
