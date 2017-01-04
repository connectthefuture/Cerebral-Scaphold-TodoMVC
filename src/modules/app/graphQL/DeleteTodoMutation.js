const DeleteTodoMutation = `mutation DeleteTodoMutation($DeleteTodoInput: DeleteTodoInput!){
  deleteTodo(input: $DeleteTodoInput){
    changedTodo {
      id
      ref
    }
  }
}`

export default DeleteTodoMutation
