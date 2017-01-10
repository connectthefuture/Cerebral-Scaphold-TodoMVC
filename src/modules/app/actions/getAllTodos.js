import {GetAllTodosQuery} from '../graphQL'

function getAllTodos ({path, state, graphQL}) {
  return graphQL.query(GetAllTodosQuery)
  .then((result) => {
    const todos = {}
    const edges = result.data.viewer.allTodos.edges

    edges.forEach(edge => {
      todos[edge.node.ref] = edge.node
    })

    return path.success({todos: todos})
  })
  .catch( error => {
    return path.error({error: error.message})
  })
}

export default getAllTodos
