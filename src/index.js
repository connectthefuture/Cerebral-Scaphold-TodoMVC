import React from 'react'
import {render} from 'react-dom'
import {Container} from 'cerebral/react'
import {Controller} from 'cerebral'
import Devtools from 'cerebral/devtools'
import Router from 'cerebral-router'
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
  devtools: Devtools({
    remoteDebugger: 'localhost:8787'
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
