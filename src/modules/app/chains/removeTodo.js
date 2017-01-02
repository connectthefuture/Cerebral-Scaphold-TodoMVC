import {input, state, set} from 'cerebral/operators'
import deleteTodo from '../actions/deleteTodo'
export default [
  set(state`isLoading`,true),
  deleteTodo,{
    success:[set(state`isLoading`,false)],
    error: [
      set(state`isLoading`,false),
      set(state`error`, input`error`)
    ]
  }
]
