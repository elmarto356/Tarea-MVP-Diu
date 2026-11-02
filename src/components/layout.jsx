import { useEffect } from 'react'
import { BrowserRouter, Link, Routes, Route, useLocation } from 'react-router-dom'

import { AppProvider } from '../context/app_context'
import { PreguntasProvider, MisPreguntasPage } from '../features/h5-preguntas'
import { PublicarOfertaPage } from '../features/h2-remuneracion'

import HomePage from '../pages/home_page'
import OfertasPage from '../pages/ofertas_page'
import OfertaDetallePage from '../pages/oferta_detalle_page'
import PostularPage from '../pages/postular_page'
import PostulacionesPage from '../pages/postulaciones_page'
import NotFoundPage from '../pages/not_found_page'

import NavBar from './nav_bar'
import Icono from './icono'

// Vuelve al inicio de la página cada vez que cambia la ruta.
const ScrollArriba = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const Layout = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <PreguntasProvider>
          <ScrollArriba />
          <div className='layout'>
            <header className='layout__header'>
              <div className='layout__header-contenido'>
                <Link className='layout__marca' to='/'>
                  <span className='layout__logo'>P</span>
                  Prácticas Inf USM
                </Link>
                <NavBar />
                <Link className='layout__empresas' to='/publicar'>
                  <Icono nombre='mas' tamano={18} />
                  <span>Publicar<span className='layout__empresas-extra'> oferta</span></span>
                </Link>
              </div>
            </header>
            <main className='layout__page'>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/ofertas' element={<OfertasPage />} />
                <Route path='/ofertas/:id' element={<OfertaDetallePage />} />
                <Route path='/ofertas/:id/postular' element={<PostularPage />} />
                <Route path='/postulaciones' element={<PostulacionesPage />} />
                <Route path='/mis-preguntas' element={<MisPreguntasPage />} />
                <Route path='/publicar' element={<PublicarOfertaPage />} />
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </PreguntasProvider>
      </AppProvider>
    </BrowserRouter>
  )
}

export default Layout
