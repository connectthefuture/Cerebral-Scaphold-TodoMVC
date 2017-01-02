function createTodo ({input, state}) {

  const todo = {
   "CreateTodoInput": {
     "title": state.get('app.newTodoTitle'),
     "completed": false,
     "isSaving": false
   }
  }

  return {todo}
}

export default createTodo
