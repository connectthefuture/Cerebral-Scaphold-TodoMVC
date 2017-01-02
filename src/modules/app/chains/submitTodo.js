import {input, set, unset, state} from 'cerebral/operators'

import createTodo from '../actions/createTodo'
import postTodo from '../actions/postTodo'
import getAllTodos from '../actions/getAllTodos'

export default [
  createTodo,
  postTodo, {
    success: [
      getAllTodos,{
        success: [
          set(state`app.newTodoTitle`, ''),
          set(state`app.isSaving`, true),
          set(state`app.todos`,input`todos`)
        ],
        error: [
          set(state`error`,input`error`)
        ]
      }
    ],
    error: [
      set(state`error`,input`error`),
      unset(state`app.todos.${input`todo.id`}`)
    ]
  },
  set(state`app.isSaving`, false)
]
