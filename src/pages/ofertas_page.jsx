import { useApp } from '../context/app_context'
import { useFiltros, PanelFiltros } from '../features/h4-filtros'
import OfertaCard from '../components/oferta_card'

export const OfertasPage = () => {
  const { ofertas } = useApp()
  const { ofertasFiltradas, filtros } = useFiltros(ofertas)
  const cantidad = ofertasFiltradas.length

  return (
    <div className='ofertas-page'>
      <h1 className='titulo-pagina'>Ofertas de práctica</h1>

      <div className='ofertas-page__layout'>
        <PanelFiltros filtros={filtros} ofertas={ofertas} />

        <section className='ofertas-page__resultados'>
          <p className='ofertas-page__cantidad'>
            {cantidad} {cantidad === 1 ? 'oferta encontrada' : 'ofertas encontradas'}
          </p>

          {cantidad > 0
            ? (
              <div className='grilla-ofertas grilla-ofertas--listado'>
                {ofertasFiltradas.map((oferta) => <OfertaCard key={oferta.id} oferta={oferta} />)}
              </div>
              )
            : (
              <div className='vacio'>
                <h2>No encontramos ofertas</h2>
                <p>Prueba quitando algunos filtros o buscando otra palabra.</p>
              </div>
              )}
        </section>
      </div>
    </div>
  )
}

export default OfertasPage
