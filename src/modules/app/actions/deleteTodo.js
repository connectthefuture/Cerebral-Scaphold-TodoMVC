import {DeleteTodoMutation} from '../graphQL'

export default function toggleTodo({input, graphQL, path, state}){
  
  const id = input.ref

  const DeleteTodoInput =  {
    "DeleteTodoInput": {
      "id": id,
    }
  }

  state.unset(`app.todos.${input.ref}`)

  return graphQL.mutate(DeleteTodoMutation, DeleteTodoInput)
  .then( result => {
    return path.success({result})
  })
  .catch( error => {
    return path.error({error: error.message})
  })
}
