const UpdateTodoMutation = `mutation UpdateTodo($UpdateTodoInput: UpdateTodoInput!){
  updateTodo(input: $UpdateTodoInput){
    changedTodo {
      id
      ref
      createdAt
      completed
      title
      isSaving
    }
  }
}`

export default UpdateTodoMutation
