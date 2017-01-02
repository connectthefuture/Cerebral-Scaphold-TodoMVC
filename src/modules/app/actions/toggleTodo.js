import {UpdateTodoMutation} from '../graphQL'

export default function toggleTodo({input, graphQL, path, state}){

  const todoCompleted = state.get(`app.todos.${input.ref}.completed`)
  const id = input.ref

  const vars =  {
    "UpdateTodoInput": {
      "id": id,
      "completed": !todoCompleted
    }
  }

  state.set(`app.todos.${input.ref}.completed`, !todoCompleted)

  return graphQL.mutate(UpdateTodoMutation, vars)
  .then(result => {
    return path.success({result})
  })
  .catch(error => {
    return path.error({error:error.message})
  })
}
