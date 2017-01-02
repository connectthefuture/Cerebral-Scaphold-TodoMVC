import {DeleteTodoMutation} from '../graphQL'

function clearCompleted ({state, path, graphQL}) {
  const todos = state.get('app.todos')
  const deletions = Object.keys(todos).map((ref) => {
    if (todos[ref].completed && !todos[ref].isSaving) {
      state.unset(`app.todos.${ref}`)
      const DeleteTodoInput = {
       "DeleteTodoInput": {
         "id": ref,
       }
      }
      return new Promise((resolve, reject) => {
        return graphQL.mutate(DeleteTodoMutation, DeleteTodoInput)
        .then( result => {
          return resolve(result)
        })
        .catch( error => {
          return reject({error: error.message})
        })
      })
    }
    return null
  })

  return Promise.all(deletions)
  .then( deletions => {
    return path.success({deletions})
  })

}

export default clearCompleted
