import {GetAllTodosQuery} from '../graphQL'

function getAllTodos ({path, graphQL}) {

  return graphQL.mutate(GetAllTodosQuery)
  .then((result) => {
    const todos = {}
    const edges = result.viewer.allTodos.edges
    edges.forEach(edge => {
      todos[edge.node.id] = edge.node
    })
    return path.success({todos: todos})
  })
  .catch( error => {
    return path.error({error: error.message})
  })
  // Or error
}

export default getAllTodos
