import clearCompletedTodos from '../actions/clearCompletedTodos'
import {set, state, unset, input} from 'cerebral/operators'
export default [
  set(state`isSaving`, true),
  clearCompletedTodos,{
    success: [
      unset(state`app.todos.${input.ref}`),
      set(state`isSaving`, false)
    ],
    error: [
      set(state`isSaving`, false),
      set(state`error`, input`error`)
    ]
  }
]
