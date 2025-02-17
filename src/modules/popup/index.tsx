import React from 'react'
import ReactDOM from 'react-dom/client'

import {Router, Route} from 'wouter'
import {useHashLocation} from 'wouter/use-hash-location'
import {ROUTES} from '@/lib/routes'

import {Details} from '_modules/popup/details/Details'
import {Colors} from '_modules/popup/details/Colors'

import '@/globals.css'

ReactDOM.createRoot(document.getElementById('module') as HTMLElement).render(
  <React.StrictMode>
    <Router hook={useHashLocation}>
      <Route path={ROUTES.home} component={Details} />
      <Route path={ROUTES.colors} component={Colors} />
    </Router>
  </React.StrictMode>,
)
