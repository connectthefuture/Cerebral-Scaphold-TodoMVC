import {toggle, state} from 'cerebral/operators';

export default [
  toggle(state`app.graphQLMode`)
]
