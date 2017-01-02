const DeleteTodoMutation = `mutation DeleteTodoMutation($DeleteTodoInput: DeleteTodoInput!){
  deleteTodo(input: $DeleteTodoInput){
    changedTodo {
      id
    }
  }
}`

export default DeleteTodoMutation
