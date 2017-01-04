import {input, state, set, unset} from 'cerebral/operators'
import deleteTodo from '../actions/deleteTodo'
export default [
  set(state`isLoading`,true),
  deleteTodo,{
    success:[
      unset(state`app.todos.${input`ref`}`),
      set(state`isLoading`,false)],
    error: [
      set(state`isLoading`,false),
      set(state`error`, input`error`)
    ]
  }
]
