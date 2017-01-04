import {DeleteTodoMutation} from '../graphQL'

export default function deleteTodo({input, graphQL, path, state}){
  const todo = state.get(`app.todos.${input.ref}`)

  const DeleteTodoInput =  {
    "DeleteTodoInput": {
      "id": todo.id,
    }
  }

  return graphQL.mutate(DeleteTodoMutation, DeleteTodoInput)
  .then( result => {
    return path.success({result})
  })
  .catch( error => {
    return path.error({error: error.message})
  })
}
