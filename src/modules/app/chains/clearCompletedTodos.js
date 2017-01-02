import clearCompletedTodos from '../actions/clearCompletedTodos'
import {set, state, input} from 'cerebral/operators'
export default [
  set(state`isSaving`, true),
  clearCompletedTodos,{
    success: [
      set(state`isSaving`, false)
    ],
    error: [
      set(state`isSaving`, false),
      set(state`error`, input`error`)
    ]
  }
]
