import {input, set, state} from 'cerebral/operators'
import stopEditingTodo from './stopEditingTodo'
import updateTodoTitle from "../actions/updateTodoTitle"

export default [
  set(state`isSaving`,true),
  set(state`app.todos.${input`ref`}.title`,
    state`app.todos.${input`ref`}.$newTitle`
  ),
  updateTodoTitle,{
    success: [
      set(state`isSaving`,false),
      ...stopEditingTodo
    ],
    error: [
      set(state`isSaving`,false),
      set(state`error`,input`error`),
      ...stopEditingTodo
    ]
  }

]
