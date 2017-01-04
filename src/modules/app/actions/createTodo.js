import uuid from 'uuid'
function createTodo ({input, state}) {
  const ref = uuid.v4()
  const todo = {
   "CreateTodoInput": {
     "ref": ref,
     "title": state.get('app.newTodoTitle'),
     "completed": false,
     "isSaving": false
   }
  }
  return {todo, ref}
}

export default createTodo
