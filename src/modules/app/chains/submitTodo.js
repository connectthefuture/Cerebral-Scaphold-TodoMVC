import {input, set, state} from 'cerebral/operators'

import createTodo from '../actions/createTodo'
import postTodo from '../actions/postTodo'
import getAllTodos from '../actions/getAllTodos'

export default [
  createTodo,
  set(state`app.todos.${input`ref`}`, input`todo.CreateTodoInput`),
  set(state`app.newTodoTitle`, ''),
  set(state`app.isSaving`, true),
  postTodo, {
    success: [
      getAllTodos,{
        success: [
          set(state`app.todos`,input`todos`)
        ],
        error: [
          set(state`error`,input`error`)
        ]
      }
    ],
    error: [
      set(state`error`,input`error`),
    ]
  },
  set(state`app.isSaving`, false)
]
