import {UpdateTodoMutation} from '../graphQL'

export default function updateTodoTitle({input, graphQL, path, state}){

  const title = state.get(`app.todos.${input.ref}.title`)
  const id = input.ref
  const vars =  {
    "UpdateTodoInput": {
      "id": id,
      "title": title
    }
  }
  state.set(`app.todos.${input.ref}.title`, title)
  return graphQL.mutate(UpdateTodoMutation, vars)
  .then(result => {
    return path.success({result})
  })
  .catch(error => {
    return path.error({error:error.message})
  })
}
