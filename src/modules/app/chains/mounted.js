import {set, input, state} from 'cerebral/operators';
import getAllTodos from "../actions/getAllTodos"
export default [
  getAllTodos,{
    success: [set(state`app.todos`,input`todos`)],
    error: [set(state`app.erro`,input`error`)]
  }
]
