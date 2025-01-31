import React from 'react'
import ReactDOM from 'react-dom/client'
import {Popup} from './Popup'

import '@/globals.css'

ReactDOM.createRoot(document.getElementById('module') as HTMLElement).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
)
