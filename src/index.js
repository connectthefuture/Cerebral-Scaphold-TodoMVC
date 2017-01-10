import React from 'react'
import {render} from 'react-dom'
import {Container} from 'cerebral/react'
import {Controller} from 'cerebral'
import Devtools from 'cerebral/devtools'
import Router from 'cerebral-router'
import Useragent from 'cerebral-module-useragent'
import {RecorderProvider} from 'cerebral/providers'
import GraphQLProvider from './providers/cerebral-provider-graphql'
import AppModule from './modules/app'
import App from './components/App'
import Recorder from './modules/recorder'
import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'
import './styles.css'
const controller = Controller({

  options: {strictRender: true},
  devtools: process.env.NODE_ENV === 'production' ? null : Devtools({
    // storeMutations: false,
    bigComponentsWarning: {state: 50000000, signals: 50000000},
    // remoteDebugger: 'localhost:8787'
  }),
  router: Router({
    onlyHash: true,
    routes: {
      '/': 'app.rootRouted',
      '/:filter': 'app.filterClicked'
    }
  }),
  providers: [
    RecorderProvider(),
    GraphQLProvider({
      graphURL:"https://us-west-2.api.scaphold.io/graphql/obese-passenger"
    })
  ],
  modules: {
    useragent: Useragent({
      // Use CSS media queries to determine
      // custom sizes available in your model.
      // They will be toggle between true/false in your
      // model
      media: {
        small: '(min-width: 600px)',
        medium: '(min-width: 1024px)',
        large: '(min-width: 1440px)',
        portrait: '(orientation: portrait)'
      },

      // store all feature tests in model
      feature: true,

      parse: {
        // parse useragent.browser from ua string
        browser: true,
        // parse useragent.device from ua string
        device: true
      },

      // check the docs at: https://github.com/HubSpot/offline#advanced
      offline: {
        checkOnLoad: false,
        interceptRequests: true,
        reconnect: {
          initialDelay: 3,
          delay: 1.5
        },
        requests: false
      },

      // update window size on resize
      window: true
    }),
    app: AppModule,
    recorder: Recorder
  }
})

render(
  <Container controller={controller}>
    <App />
  </Container>,
  document.getElementById('root')
);
