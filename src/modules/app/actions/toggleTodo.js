import {UpdateTodoMutation} from '../graphQL'

export default function toggleTodo({input, graphQL, path, state}){

  const todo = state.get(`app.todos.${input.ref}`)
  const completed = todo.completed
  state.set(`app.todos.${input.ref}.completed`, !completed)
  const vars =  {
    "UpdateTodoInput": {
      "id": todo.id,
      "completed": !completed
    }
  }
  return graphQL.mutate(UpdateTodoMutation, vars)
  .then(result => {
    return path.success({result})
  })
  .catch(error => {
    return path.error({error:error.message})
  })
}
