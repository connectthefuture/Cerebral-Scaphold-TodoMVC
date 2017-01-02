import {redirect} from 'cerebral-router'
import getAllTodos from '../actions/getAllTodos'
import {set,state,input} from 'cerebral/operators';
export default [
  getAllTodos,{
    success: [
      set(state`app.todos`,input`todos`),
      redirect('/all')
    ],
    error: [
      set(state`error`,input`error`)
    ]
  }
]
