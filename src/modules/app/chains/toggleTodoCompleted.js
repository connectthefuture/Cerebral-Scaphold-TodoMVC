import {input, state, set} from 'cerebral/operators'
import toggleTodo from "../actions/toggleTodo"
export default [
  set(state`isSaving`, true),
  toggleTodo, {
    success: [
      set(state`isSaving`, false),
    ],
    error: [
      set(state`error`, input`error`),
    ]
  }
]
