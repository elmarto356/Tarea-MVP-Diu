import { createRoot } from 'react-dom/client'

import Layout from './components/layout'

import './stylesheets/index.scss'

const root = createRoot(document.getElementById('root'))
root.render(<Layout />)
