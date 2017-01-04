import {CreateTodoMutation} from '../graphQL'

function postTodo ({path, input, graphQL}) {

  const {todo} = input
  return graphQL.mutate(CreateTodoMutation,todo)
  .then((result) => {
    return path.success({todo: result.createTodo.changedTodo})
  })
  .catch( error => {
    return path.error({error: error.message})
  })
  // Or error
}

export default postTodo
