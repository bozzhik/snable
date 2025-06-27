import React from 'react'
import ReactDOM from 'react-dom/client'

import {Router, Route} from 'wouter'
import {useHashLocation} from 'wouter/use-hash-location'
import {ROUTES} from '@/lib/routes'

import {Details} from '@/modules/popup/Details'
import {Colors} from '@/modules/popup/Colors'
import {Images} from '@/modules/popup/Images'
import {Favorites} from '@/modules/popup/Favorites'
import {Figma} from '@/modules/popup/Figma'

import '@/globals.css'

ReactDOM.createRoot(document.getElementById('module') as HTMLElement).render(
  <React.StrictMode>
    <Router hook={useHashLocation}>
      <Route path={ROUTES.home} component={Details} />
      <Route path={ROUTES.colors} component={Colors} />
      <Route path={ROUTES.images} component={Images} />

      <Route path={ROUTES.favorites} component={Favorites} />
      <Route path={ROUTES.figma} component={Figma} />
    </Router>
  </React.StrictMode>,
)
