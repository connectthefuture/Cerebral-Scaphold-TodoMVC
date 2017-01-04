import {UpdateTodoMutation} from '../graphQL'

export default function updateTodoTitle({input, graphQL, path, state}){

  const todo = state.get(`app.todos.${input.ref}`)
  const vars =  {
    "UpdateTodoInput": {
      "id": todo.id,
      "title": todo.title
    }
  }
  state.set(`app.todos.${input.ref}.title`, todo.title)
  return graphQL.mutate(UpdateTodoMutation, vars)
  .then(result => {
    return path.success({result})
  })
  .catch(error => {
    return path.error({error:error.message})
  })
}
